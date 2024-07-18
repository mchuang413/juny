from flask import Flask
from openai import OpenAI
from flask_cors import CORS
from dotenv import load_dotenv
import os
app = Flask(__name__)
CORS(app)
load_dotenv()
client = OpenAI(api_key=os.env("OPENAI_API_KEY"))

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

@app.route('/weaknesses/<input>')
def weaknesses(input):
  response = ask_gpt("Here are the questions asked by us, then the answers the user suggested. You're an expert teacher. Provide insightful feedback on the weaknesses of the student's learning style.", input)
  return response

@app.route('/checkanswer/<question>/<answer>')
def checkanswer(question ,answer):
  qindex = problems.index(question)
  if answers[qindex] == answer:
    return("Correct!")
  else:
    return("Incorrect")

app.run(host='0.0.0.0', port=8134)