document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const newChatButton = document.getElementById('new-chat-button');
    const sessionIdDisplay = document.getElementById('session-id-display');

    let currentSessionId = '';

    function generateSessionId() {
        return "session_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
    }

    function initializeSession() {
        // If there's a token, the user is "logged in" from the client's perspective
        const token = sessionStorage.getItem('mcp_access_token');
        if (token) {
            addMessage("Welcome back! Your previous session is active.", "assistant");
        } else {
            addMessage("Welcome! Please go to the <a href='/login'>login page</a> if you need to perform account actions.", "assistant");
        }
        currentSessionId = sessionStorage.getItem('mcp_chat_session_id') || generateSessionId();
        sessionStorage.setItem('mcp_chat_session_id', currentSessionId);
        sessionIdDisplay.textContent = currentSessionId;
        console.log("Chat UI initialized with Session ID:", currentSessionId);
    }

    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender + '-message');
        messageElement.innerHTML = message.replace(/\n/g, '<br>');
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    async function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === '') return;

        addMessage(messageText, 'user');
        messageInput.value = '';

        const token = sessionStorage.getItem('mcp_access_token');
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
            console.log("Sending message with Authorization header.");
        } else {
            console.log("Sending message without Authorization header (user not logged in via UI).");
        }

        try {
            const response = await fetch('/chatbot/message', {
                method: 'POST',
                headers: headers, // Use updated headers
                body: JSON.stringify({
                    session_id: currentSessionId, // Still useful for client-side context
                    message: messageText
                }),
            });

            // ... (rest of response handling as before) ...
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: `HTTP error ${response.status}` }));
                let detail = errorData.detail || errorData.error || response.statusText;
                // If it's a 401 or 403, prompt to login
                if (response.status === 401 || response.status === 403) {
                    detail += " Please <a href='/login'>login</a>.";
                     // Optionally clear stored token if it's invalid
                    sessionStorage.removeItem('mcp_access_token');
                    sessionStorage.removeItem('mcp_user_email');
                }
                addMessage(`Error: ${detail}`, 'assistant');
                console.error("Server error response:", errorData);
                return;
            }

            const data = await response.json();
            if (data.response_message) {
                addMessage(data.response_message, 'assistant');
            } else if (data.error) { 
                addMessage(`Error: ${data.error}`, 'assistant');
            } else {
                addMessage("(Assistant provided no text response)", 'assistant');
            }

        } catch (error) {
            console.error('Failed to send message or process response:', error);
            addMessage('Network error or issue sending message. Check console.', 'assistant');
        }
    }

    function startNewChat() {
        console.log("New Chat button clicked.");
        // Clear client-side session tokens and state for a "full" new chat experience
        sessionStorage.removeItem('mcp_access_token');
        sessionStorage.removeItem('mcp_user_email');
        sessionStorage.removeItem('mcp_chat_session_id'); // Let it regenerate
        
        chatWindow.innerHTML = ''; // Clear visual chat window
        initializeSession(); // This will now generate a new session_id and check for token (which should be gone)
        messageInput.focus();
    }

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
    newChatButton.addEventListener('click', startNewChat);

    initializeSession();
});