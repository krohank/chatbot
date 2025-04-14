from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Simple chatbot logic
def get_bot_response(user_message):
    user_message = user_message.lower()
    
    if "hello" in user_message or "hi" in user_message:
        return "Hello there! How can I help you today?"
    elif "how are you" in user_message:
        return "I'm just a bot, but I'm functioning well! How about you?"
    elif "bye" in user_message or "goodbye" in user_message:
        return "Goodbye! Have a great day!"
    elif "help" in user_message:
        return "I can respond to greetings, questions about how I am, and farewells."
    else:
        return "I'm not sure how to respond to that. Try asking me something else."

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    bot_response = get_bot_response(user_message)
    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)
