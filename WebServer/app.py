from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)
CORS(app)

uri = "mongodb+srv://michael:michaelchuang@cluster0.r9ljm0v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"  # Add your MongoDB URI here

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# Use the appropriate database and collection
db = client["Juny"]
collection = db["users"]  # Assuming a collection named "users" for user data

# Initial problems and answers
problems  = [
    "What is bullish meaning?",
    "What is bearish meaning?",
    "What is the main purpose of investing? a. To buy and sell assets quickly b. To build wealth and reach financial goals c. To keep money in a savings account d. To avoid financial markets",
    "Which of the following is an example of an asset you can invest in? a. Groceries b. Clothes c. Stocks d. Vacations",
    "Where was the first modern stock market established? a. New York b. London c. Amsterdam d. Tokyo",
    "Scenario: Juny wants to build wealth and reach her financial goals. Based on the text, which of the following should she consider investing in? a. Clothes b. Stocks c. Groceries d. Vacations",
    "Investing guarantees growth in value over time. True False",
    "In ancient times, people invested in tangible assets like land, livestock, and trade goods. True False"
]
answers   = [
    "Bullish is a buying trend that indicates that the price is rising.",
    "Bearish is a selling trend that indicates that the price is falling.",
    "b",
    "c",
    "c",
    "b",
    "f",
    "t"
]

def ask_gpt(pretext, prompt):
    response = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": pretext + prompt,
                }
            ],
            model="gpt-3.5-turbo",
        )
    return response.choices[0].message.content

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # Check if any field is missing
    if not username or not password:
        return jsonify({"status": "error", "message": "Username and password are required"}), 400

    user = collection.find_one({"username": username})
    if not user:
        return jsonify({"status": "nouser"})
    if user["password"] == password:
        return jsonify({"status": "works"})
    else:
        return jsonify({"status": "wrong"})

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    alpaca_key = data.get("alpaca_key")
    alpaca_secret = data.get("alpaca_secret")  # Get Alpaca secret from request

    # Check if any field is missing
    if not username or not password or not alpaca_key or not alpaca_secret:
        return jsonify({"status": "error", "message": "Username, password, Alpaca API key, and Alpaca API secret are required"}), 400

    # Check if the username already exists
    if collection.find_one({"username": username}):
        return jsonify({"status": "error", "message": "Username already exists"}), 400

    # Insert the new user into the collection
    collection.insert_one({
        "username": username,
        "password": password,
        "alpaca_key": alpaca_key,
        "alpaca_secret": alpaca_secret,  # Include Alpaca secret in the user document
        "premium_user": False  # Set default value for premium_user
    })

    return jsonify({"status": "success", "message": "User registered successfully"}), 201

@app.route('/weaknesses/<input>')
def weaknesses(input):
    response = ask_gpt("Here are the questions asked by us, then the answers the user suggested. You're an expert teacher. Provide insightful feedback on the weaknesses of the student's learning style.", input)
    return response

@app.route('/checkanswer/<question>/<answer>/<id>')
def checkanswer(question ,answer, id):
    qindex = problems.index(question)
    if answers[qindex] == answer:
        mydict = { "id": id, "question" : question, "correct": "T" }
        collection.insert_one(mydict)
        return("Correct!")
    else:
        mydict = { "id": id, "question" : question, "correct": "F" }
        collection.insert_one(mydict)
        return("Incorrect")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8134)
