"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import CountUp from 'react-countup';

const Page = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [timeFrame, setTimeFrame] = useState('1D'); // Default time frame
  const [apiKeys, setApiKeys] = useState({ alpaca_key: '', alpaca_secret: '' });
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState('');
  const [timeInForce, setTimeInForce] = useState('GTC');
  const [accountInfo, setAccountInfo] = useState({ buyingPower: 0, cash: 0, tradeCount: 0 });

  // Fetch API keys using username from cookies
  const fetchApiKeys = async () => {
    try {
      const username = Cookies.get('username'); // Get the username cookie
      const response = await axios.get(`http://localhost:8134/get_api_keys/${username}`);
      if (response.data.status === 'success') {
        setApiKeys({
          alpaca_key: response.data.alpaca_key,
          alpaca_secret: response.data.alpaca_secret,
        });
      } else {
        console.error('Failed to fetch API keys:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching API keys:', error);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchPortfolioHistory = async () => {
    const options = {
      method: 'GET',
      url: `https://paper-api.alpaca.markets/v2/account/portfolio/history`,
      params: { intraday_reporting: 'market_hours', pnl_reset: 'per_day' },
      headers: {
        accept: 'application/json',
        'APCA-API-KEY-ID': apiKeys.alpaca_key,
        'APCA-API-SECRET-KEY': apiKeys.alpaca_secret
      }
    };

    try {
      const response = await axios.request(options);
      const data = response.data;
      setPortfolioData(data);
      filterData(data, timeFrame);
      console.log('Alpaca Portfolio Data:', data);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      alert('Failed to fetch portfolio data. Please check your API keys and parameters.');
    }
  };

  const fetchAccountInfo = async () => {
    const options = {
      method: 'GET',
      url: `https://paper-api.alpaca.markets/v2/account`,
      headers: {
        accept: 'application/json',
        'APCA-API-KEY-ID': apiKeys.alpaca_key,
        'APCA-API-SECRET-KEY': apiKeys.alpaca_secret
      }
    };

    try {
      const response = await axios.request(options);
      const data = response.data;
      setAccountInfo({
        buyingPower: data.buying_power,
        cash: data.cash,
        tradeCount: data.daytrade_count
      });
      console.log('Alpaca Account Info:', data);
    } catch (error) {
      console.error('Error fetching account info:', error);
    }
  };

  useEffect(() => {
    if (apiKeys.alpaca_key && apiKeys.alpaca_secret) {
      fetchPortfolioHistory();
      fetchAccountInfo();
    }
  }, [apiKeys]);

  useEffect(() => {
    if (portfolioData) {
      filterData(portfolioData, timeFrame);
    }
  }, [timeFrame]);

  const filterData = (data, timeFrame) => {
    let filteredData;
    const timestamps = data.timestamp;
    const equity = data.equity;
    const currentTime = timestamps[timestamps.length - 1];

    switch (timeFrame) {
      case '1D':
        filteredData = {
          timestamp: timestamps.filter(ts => ts >= currentTime - 86400), // Last 1 day
          equity: equity.slice(timestamps.findIndex(ts => ts >= currentTime - 86400))
        };
        break;
      case '5D':
        filteredData = {
          timestamp: timestamps.filter(ts => ts >= currentTime - 86400 * 5), // Last 5 days
          equity: equity.slice(timestamps.findIndex(ts => ts >= currentTime - 86400 * 5))
        };
        break;
      case '1M':
        filteredData = {
          timestamp: timestamps.filter(ts => ts >= currentTime - 86400 * 30), // Last 1 month
          equity: equity.slice(timestamps.findIndex(ts => ts >= currentTime - 86400 * 30))
        };
        break;
      case '3M':
        filteredData = {
          timestamp: timestamps.filter(ts => ts >= currentTime - 86400 * 90), // Last 3 months
          equity: equity.slice(timestamps.findIndex(ts => ts >= currentTime - 86400 * 90))
        };
        break;
      case '1Y':
        filteredData = {
          timestamp: timestamps.filter(ts => ts >= currentTime - 86400 * 365), // Last 1 year
          equity: equity.slice(timestamps.findIndex(ts => ts >= currentTime - 86400 * 365))
        };
        break;
      default:
        filteredData = data;
    }

    setFilteredData(filteredData);
  };

  const calculatePercentageChange = () => {
    if (filteredData && filteredData.equity.length > 1) {
      const initialEquity = filteredData.equity[0];
      const finalEquity = filteredData.equity[filteredData.equity.length - 1];
      return (((finalEquity - initialEquity) / initialEquity) * 100).toFixed(2);
    }
    return 'Loading...';
  };

  const handleTrade = async (action) => {
    try {
      const response = await axios.get(`https://paper-api.alpaca.markets/v2/account`, {
        headers: {
          accept: 'application/json',
          'APCA-API-KEY-ID': apiKeys.alpaca_key,
          'APCA-API-SECRET-KEY': apiKeys.alpaca_secret
        }
      });
      const account = response.data;

      if (action === 'buy' && account.buying_power < quantity) {
        alert('Insufficient funds to complete the purchase.');
        return;
      }

      if (action === 'sell') {
        const positions = await axios.get(`https://paper-api.alpaca.markets/v2/positions`, {
          headers: {
            accept: 'application/json',
            'APCA-API-KEY-ID': apiKeys.alpaca_key,
            'APCA-API-SECRET-KEY': apiKeys.alpaca_secret
          }
        });

        const position = positions.data.find(pos => pos.symbol === ticker);
        if (!position || position.qty < quantity) {
          alert('You do not own enough of this stock to sell.');
          return;
        }
      }

      const order = {
        symbol: ticker,
        qty: quantity,
        side: action,
        type: 'market',
        time_in_force: timeInForce
      };

      await axios.post(`https://paper-api.alpaca.markets/v2/orders`, order, {
        headers: {
          accept: 'application/json',
          'APCA-API-KEY-ID': apiKeys.alpaca_key,
          'APCA-API-SECRET-KEY': apiKeys.alpaca_secret
        }
      });

      alert('Order placed successfully.');
      fetchPortfolioHistory();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const chartData = {
    labels: filteredData ? filteredData.timestamp.map(ts => new Date(ts * 1000).toLocaleString()) : [],
    datasets: [
      {
        label: 'Portfolio Value',
        data: filteredData ? filteredData.equity : [],
        borderColor: 'rgba(96, 165, 250, 1)', // blue-400
        backgroundColor: 'rgba(96, 165, 250, 0.2)',
        fill: true,
        tension: 0.1,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
      }
    },
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <div className="flex justify-between">
          <div className="w-2/3">
            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
              {portfolioData ? portfolioData.equity[portfolioData.equity.length - 1].toFixed(2) : 'Loading...'}
            </h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Portfolio Value</p>
            <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
              {calculatePercentageChange()}%
              <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
              </svg>
            </div>
            <div className="flex justify-end mt-4">
              <select
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2.5"
              >
                <option value="1D">1 Day</option>
                <option value="5D">5 Days</option>
                <option value="1M">1 Month</option>
                <option value="3M">3 Months</option>
                <option value="1Y">1 Year</option>
              </select>
            </div>
            <div id="area-chart" className="mt-6">
              {filteredData ? <Line data={chartData} options={chartOptions} /> : <p>Loading chart...</p>}
            </div>
          </div>
          <div className="w-1/3 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Trade Stocks</h3>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200">Ticker</label>
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                className="w-full p-2 mt-2 border rounded-lg"
                placeholder="Enter ticker symbol"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full p-2 mt-2 border rounded-lg"
                placeholder="Enter quantity"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200">Time in Force</label>
              <select
                value={timeInForce}
                onChange={(e) => setTimeInForce(e.target.value)}
                className="w-full p-2 mt-2 border rounded-lg"
              >
                <option value="DAY">DAY</option>
                <option value="GTC">GTC - Good till Canceled</option>
                <option value="FOK">FOK - Fill or Kill</option>
                <option value="IOC">IOC - Immediate or Cancel</option>
                <option value="OPG">OPG - At the Open</option>
                <option value="CLS">CLS - At the Close</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleTrade('buy')}
                className="w-full bg-green-500 text-white p-2 rounded-lg"
              >
                Buy
              </button>
              <button
                onClick={() => handleTrade('sell')}
                className="w-full bg-red-500 text-white p-2 rounded-lg"
              >
                Sell
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-6xl bg-white rounded-lg shadow dark:bg-gray-800 p-4 mt-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Account Information</h3>
        <div className="flex justify-around">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Buying Power</h4>
            <CountUp end={accountInfo.buyingPower} duration={1} separator="," prefix="$" className="text-2xl font-bold text-green-500 dark:text-green-400" />
          </div>
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Cash</h4>
            <CountUp end={accountInfo.cash} duration={1} separator="," prefix="$" className="text-2xl font-bold text-green-500 dark:text-green-400" />
          </div>
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Daily Trade Count</h4>
            <CountUp end={accountInfo.tradeCount} duration={1} className="text-2xl font-bold text-green-500 dark:text-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
