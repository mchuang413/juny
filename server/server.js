// get accounts from db
// get updates from quiver
// loop accs
// make orders for accs

// user, pwd, apikey, secret, target
// save in db


// POST selectPerson
// POST signUp
// GET selectPerson

const Alpaca = require("@alpacahq/alpaca-trade-api");
const express = require('express');
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const schedule = require('node-schedule');
const fs = require('fs');
const childProcess = require('child_process');

const mongoURL = "";

mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    }).catch((err) => {
        console.log("Error: ", err);
    });

const UserDetailSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    alpaca_api_key: String,
    alpaca_secret_key: String,
    password: String,
}, {
    collection: "UserInfo"
});

const User = mongoose.model("UserInfo", UserDetailSchema);

app.post('/register', async (req, res) => {
    const { username, email, alpaca_api_key, alpaca_secret_key, password } = req.body;

    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
        return res.send({ data: "Email is already in use" });
    }

    try {
        await User.create({
            username,
            email,
            alpaca_api_key,
            alpaca_secret_key,
            password
        });
        res.send({ status: "ok", data: "User created successfully" });
    } catch (error) {
        res.send({ status: "error", data: error });
    }
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const normalizeTransaction = (trade) => ({
    Representative: trade.Representative,
    Ticker: trade.Ticker.trim().toUpperCase(),
    TransactionDate: new Date(trade.TransactionDate).toISOString().split('T')[0],
    Transaction: trade.Transaction.trim().toLowerCase(),
    Amount: parseFloat(String(trade.Amount).replace(/[\$,]/g, ''))
});

const thresholds = [
    { min: 0, max: 10000, scale: 0.1 },
    { min: 10001, max: 50000, scale: 0.2 },
    { min: 50001, max: 100000, scale: 0.5 },
    { min: 100001, max: Infinity, scale: 1.0 }
];

const job = schedule.scheduleJob('*/20 * * * * *', async () => {
    const url = '';
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer '
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error('API response is not an array');
        }

        const first10Transactions = data.slice(0, 10).map(normalizeTransaction);

        let old10Transactions = [];
        if (fs.existsSync('data.json')) {
            const fileData = fs.readFileSync('data.json', 'utf8');
            if (fileData) {
                old10Transactions = JSON.parse(fileData).map(normalizeTransaction);
            }
        }

        const newTrades = first10Transactions.filter(trade =>
            !old10Transactions.some(oldTrade =>
                oldTrade.Ticker === trade.Ticker &&
                oldTrade.TransactionDate === trade.TransactionDate &&
                oldTrade.Transaction === trade.Transaction &&
                oldTrade.Amount === trade.Amount
            )
        );

        if (newTrades.length !== 0) {
            const users = await User.find({});
            for (const user of users) {

                const username = user.username;

                const tradingMode = (user.username === 'test') ? true : false;

                const alpaca = new Alpaca({
                    keyId: user.alpaca_api_key,
                    secretKey: user.alpaca_secret_key,
                    paper: tradingMode,
                });

                console.log(`[${tradingMode}] [${user.username}]`);

                for (const trade of newTrades) {
                    const ticker = trade.Ticker;
                    const amount = trade.Amount;
                    const transactionType = mapTransactionType(trade.Transaction);

                    const price = await getStockPrice(ticker, user);

                    let scale = 1.0;
                    for (const threshold of thresholds) {
                        if (amount >= threshold.min && amount <= threshold.max) {
                            scale = threshold.scale;
                            break;
                        }
                    }

                    const investmentAmount = amount * scale;
                    let sharesToBuy = Math.floor(investmentAmount / price);

                    if (transactionType === 'buy' && sharesToBuy < 1) {
                        sharesToBuy = 1;
                    }

                    if (transactionType === 'buy') {
                        const t = new Date();
                        console.log(`[${t}] || Processing new trade from ${trade.Representative} for user ${username}...`);

                        const acc = await alpaca.getAccount();
                        const buyingPower = acc.buying_power;

                        if (buyingPower >= (sharesToBuy * price)) {
                            alpaca.createOrder({
                                symbol: ticker,
                                qty: sharesToBuy,
                                side: transactionType,
                                type: "market",
                                time_in_force: "day",
                            });

                            const date = new Date();
                            console.log(`[${date}] || Type: ${transactionType} -- Order: ${sharesToBuy} shares of ${ticker} at $${price} per share has been placed for user ${username}.`);
                        } else {
                            console.log(`Insufficient buying power for user ${username}.`);
                        }
                    } else {
                        if (sharesToBuy < 1) {
                            console.log(`Insufficient shares to sell for user ${username}.`);
                        } else {
                            const positions = await alpaca.getPositions();
                            const position = positions.find(p => p.symbol === ticker);

                            if (position && position.qty >= sharesToBuy) {
                                await alpaca.createOrder({
                                    symbol: ticker,
                                    qty: sharesToBuy,
                                    side: transactionType,
                                    type: "market",
                                    time_in_force: "day",
                                });

                                console.log(`[${new Date()}] || Type: ${transactionType} -- Order: ${sharesToBuy} shares of ${ticker} at $${price} per share has been placed for user ${username}.`);
                            } else {
                                console.log(`Insufficient shares to sell for user ${username}.`);
                            }
                        }
                    }
                }
            }
        } else {
            // console.log('No new trades found.');
        }

        fs.writeFileSync('data.json', JSON.stringify(first10Transactions, null, 2), 'utf8');

    } catch (error) {
        console.error(error);
    }
});

app.post('/selectPerson', (req, res) => {
  console.log('selectPerson');
  res.send('selectPerson');
});

async function getStockPrice(ticker, user) {
    const url = `https://data.alpaca.markets/v2/stocks/${ticker}/trades/latest`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'APCA-API-KEY-ID': user.alpaca_api_key,
            'APCA-API-SECRET-KEY': user.alpaca_secret_key
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching stock price: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.trade) {
        return data.trade.p;
    } else {
        throw new Error('Invalid response format');
    }
}

function mapTransactionType(transaction) {
    switch (transaction) {
        case 'purchase':
        case 'buy':
            return 'buy';
        case 'sale (partial)':
        case 'sale (full)':
        case 'sale':
        case 'sell':
            return 'sell';
        default:
            throw new Error(`Unknown transaction type: ${transaction}`);
    }
}

// function runScript(scriptPath, callback) {
//     var invoked = false;

//     var process = childProcess.fork(scriptPath);

//     process.on('error', function (err) {
//         if (invoked) return;    
//         invoked = true;
//         callback(err);
//     });

//     process.on('exit', function (code) {
//         if (invoked) return;
//         invoked = true;
//         var err = code === 0 ? null : new Error('exit code ' + code);
//         callback(err);
//     });
// }

// runScript('./db.js', function (err)
//     {
//         if(err) throw err;
//         console.log("finished calling db.js");
//     });