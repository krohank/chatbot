document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    // Replace with your Render backend URL when deployed
    const backendUrl = 'http://localhost:5000/chat';
    // For GitHub Pages deployment (static only), we'll use a different approach
    
    // Initial bot message
    addBotMessage("Hello! I'm your AI assistant. How can I help you today?");
    
    // Send message when button is clicked
    sendButton.addEventListener('click', sendMessage);
    
    // Send message when Enter key is pressed
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addUserMessage(message);
        userInput.value = '';
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot-message typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // For GitHub Pages (static version)
        if (window.location.host.includes('github.io')) {
            // Simulate bot response after delay
            setTimeout(() => {
                // Remove typing indicator
                chatMessages.removeChild(typingIndicator);
                
                // Get static response
                const botResponse = getStaticBotResponse(message);
                addBotMessage(botResponse);
            }, 1000);
        } else {
            // For Render deployment (with backend)
            fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            })
            .then(response => response.json())
            .then(data => {
                // Remove typing indicator
                chatMessages.removeChild(typingIndicator);
                
                // Add bot response
                addBotMessage(data.response);
            })
            .catch(error => {
                console.error('Error:', error);
                chatMessages.removeChild(typingIndicator);
                addBotMessage("Sorry, I'm having trouble connecting to the server.");
            });
        }
    }
    
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message user-message';
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot-message';
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Simple static responses for GitHub Pages version
    function getStaticBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase();
        
        if (userMessage.includes('hello') || userMessage.includes('hi')) {
            return "Hello there! How can I help you today?";
        } else if (userMessage.includes('how are you')) {
            return "I'm just a bot, but I'm functioning well! How about you?";
        } else if (userMessage.includes('bye') || userMessage.includes('goodbye')) {
            return "Goodbye! Have a great day!";
        } else if (userMessage.includes('help')) {
            return "I can respond to greetings, questions about how I am, and farewells.";
        } else {
            return "I'm not sure how to respond to that. Try asking me something else.";
        }
    }
});
