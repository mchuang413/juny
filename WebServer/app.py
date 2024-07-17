from flask import Flask
from openai import OpenAI

app = Flask(__name__)
client = OpenAI()
#we can replace this with an llm of your choice

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
  response = ask_gpt("Here are the questions asked by us, then the answers the user suggested. You're an expert teacher. Provide insightful feedback on the weaknesses of the student's learning style.", input")
  return response
