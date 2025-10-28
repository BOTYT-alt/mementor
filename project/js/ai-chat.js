// AI Chat Implementation
// IMPORTANT: Do NOT commit your real API keys to public repos.
// Replace the placeholder below with your key locally or, better, proxy requests through a server.
const OPENROUTER_API_KEY = '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';
const SITE_URL = window.location.origin;
const SITE_NAME = 'MyMentor';

class ChatUI {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatForm = document.getElementById('chatForm');
        this.userInput = document.getElementById('userInput');
        
        this.chatForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.initializeChat();
    }

    initializeChat() {
        this.addMessage('Welcome to MyMentor AI Chat! How can I help you today?', 'ai');
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${type}-message`);
        messageDiv.textContent = content;
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const userMessage = this.userInput.value.trim();
        if (!userMessage) return;

        // Add user message to chat
        this.addMessage(userMessage, 'user');
        this.userInput.value = '';

        try {
            const response = await this.sendToAI(userMessage);
            this.addMessage(response, 'ai');
        } catch (error) {
            console.error('AI Chat Error:', error);
            this.addMessage('Sorry, I encountered an error. Please try again.', 'ai');
        }
    }

    async sendToAI(message) {
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'deepseek/deepseek-chat-v3.1:free',
                    messages: [
                        {
                            role: 'user',
                            content: message
                        }
                    ]
                })
            });

            if (!response.ok) {
                const txt = await response.text();
                throw new Error(`API request failed: ${response.status} ${txt}`);
            }

            const data = await response.json();
            // OpenRouter-style responses may vary; attempt to safely extract text
            if (data && data.choices && data.choices[0]) {
                const msg = data.choices[0].message || data.choices[0].text || null;
                return msg ? (msg.content || msg) : JSON.stringify(data);
            }
            return JSON.stringify(data);
        } catch (error) {
            console.error('API Error:', error);
            try { this.addMessage('Error from AI service: ' + (error.message || error), 'ai'); } catch (e) {}
            throw error;
        }
    }
}

// Initialize chat when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChatUI();
});

// helper used by ai.html quick prompts
window.prefill = function (text) {
    const input = document.getElementById('userInput');
    if (!input) return;
    input.value = text;
    input.focus();
};