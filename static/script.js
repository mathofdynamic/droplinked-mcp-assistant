document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const newChatButton = document.getElementById('new-chat-button');
    const imageUploadButton = document.getElementById('image-upload-button');
    const imageInput = document.getElementById('image-input');
    const sessionIdDisplay = document.getElementById('session-id-display');

    let currentSessionId = '';
    let uploadedImageUrls = [];

    // Configure marked.js for better rendering
    function configureMarked() {
        if (typeof marked !== 'undefined') {
            console.log('Marked.js loaded successfully');
            marked.setOptions({
                breaks: true,        // Convert line breaks to <br>
                gfm: true,          // GitHub Flavored Markdown
                sanitize: false,    // Allow HTML
                smartypants: false  // Disable smart quotes
            });
            return true;
        } else {
            console.error('Marked.js failed to load');
            return false;
        }
    }

    function generateSessionId() {
        return "session_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
    }

    function initializeSession() {
        // Add initial welcome message with animation
        setTimeout(() => {
            addMessage("Hello! How can I assist you with your Droplinked store today?", "assistant");
        }, 300);
        
        // If there's a token, the user is "logged in" from the client's perspective
        const token = sessionStorage.getItem('mcp_access_token');
        if (token) {
            setTimeout(() => {
                addMessage("Welcome back! Your previous session is active.", "assistant");
            }, 600);
        } else {
            setTimeout(() => {
                addMessage("Welcome! Please go to the <a href='/login'>login page</a> if you need to perform account actions.", "assistant");
            }, 600);
        }
        
        currentSessionId = sessionStorage.getItem('mcp_chat_session_id') || generateSessionId();
        sessionStorage.setItem('mcp_chat_session_id', currentSessionId);
        sessionIdDisplay.textContent = currentSessionId;
        console.log("Chat UI initialized with Session ID:", currentSessionId);
    }

    function addMessage(message, sender, isMarkdown = true) {
        console.log('=== ADD MESSAGE DEBUG ===');
        console.log('Message:', message);
        console.log('Sender:', sender);
        
        // Create simple wrapper for alignment
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('message-wrapper', sender);
        
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender + '-message');
        
        // Process the message content
        let processedMessage = message;
        
        // FORCE markdown processing for assistant messages
        if (sender === 'assistant') {
            if (typeof marked !== 'undefined') {
                try {
                    processedMessage = marked.parse(message);
                } catch (error) {
                    console.error('Markdown parsing failed:', error);
                    processedMessage = message
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/\n/g, '<br>');
                }
            } else {
                processedMessage = message
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/- (.*)/g, '• $1')
                    .replace(/\n/g, '<br>');
            }
        } else {
            processedMessage = message.replace(/\n/g, '<br>');
        }
        
        messageElement.innerHTML = processedMessage;
        
        // Force animation with inline styles - start invisible
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(30px)';
        messageElement.style.transition = 'opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        
        // Add message to wrapper, then wrapper to chat window
        messageWrapper.appendChild(messageElement);
        chatWindow.appendChild(messageWrapper);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        
        // Force animation with longer delay to be visible
        setTimeout(() => {
            console.log('TRIGGERING ANIMATION NOW!');
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 200);
    }

    function showImagePreview(files) {
        const previewContainer = document.createElement('div');
        previewContainer.classList.add('image-preview');
        
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.onload = () => URL.revokeObjectURL(img.src);
                previewContainer.appendChild(img);
            }
        });
        
        chatWindow.appendChild(previewContainer);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        
        // Trigger animation
        requestAnimationFrame(() => {
            setTimeout(() => {
                previewContainer.classList.add('animate-in');
            }, 10);
        });
        
        return previewContainer;
    }

    function showUploadProgress(message) {
        const progressElement = document.createElement('div');
        progressElement.classList.add('upload-progress');
        progressElement.textContent = message;
        
        chatWindow.appendChild(progressElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        
        // Trigger animation
        requestAnimationFrame(() => {
            setTimeout(() => {
                progressElement.classList.add('animate-in');
            }, 10);
        });
        
        return progressElement;
    }

    async function uploadImages(files) {
        const token = sessionStorage.getItem('mcp_access_token');
        if (!token) {
            addMessage("Please login first to upload images.", "assistant");
            return;
        }

        const previewContainer = showImagePreview(files);
        const progressElement = showUploadProgress("Uploading images...");

        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/upload/image', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ error: `HTTP error ${response.status}` }));
                    throw new Error(errorData.detail || errorData.error || response.statusText);
                }

                const result = await response.json();
                return result.data;
            });

            const uploadResults = await Promise.all(uploadPromises);
            
            // Extract image URLs from upload results
            const newImageUrls = [];
            uploadResults.forEach(result => {
                // Based on the screenshot, the response contains 'original', 'small', etc.
                if (result.original) {
                    newImageUrls.push(result.original);
                } else if (result.url) {
                    newImageUrls.push(result.url);
                } else if (typeof result === 'string') {
                    newImageUrls.push(result);
                }
            });

            uploadedImageUrls.push(...newImageUrls);
            
            progressElement.textContent = `Successfully uploaded ${files.length} image(s)!`;
            progressElement.style.backgroundColor = '#e8f5e8';
            progressElement.style.borderColor = '#4caf50';
            progressElement.style.color = '#2e7d32';

            // Send image information to the assistant silently (no user message displayed)
            const uploadMessage = `I have uploaded ${files.length} image(s) for the product. The image URLs are: ${newImageUrls.join(', ')}`;
            
            // Send this information to the chatbot without showing the user message
            await sendMessageToBot(uploadMessage);

        } catch (error) {
            console.error('Image upload failed:', error);
            progressElement.textContent = `Upload failed: ${error.message}`;
            progressElement.style.backgroundColor = '#ffebee';
            progressElement.style.borderColor = '#f44336';
            progressElement.style.color = '#c62828';
        }
    }

    async function sendMessageToBot(messageText) {
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
                headers: headers,
                body: JSON.stringify({
                    session_id: currentSessionId,
                    message: messageText
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: `HTTP error ${response.status}` }));
                let detail = errorData.detail || errorData.error || response.statusText;
                if (response.status === 401 || response.status === 403) {
                    detail += " Please <a href='/login'>login</a>.";
                    sessionStorage.removeItem('mcp_access_token');
                    sessionStorage.removeItem('mcp_user_email');
                }
                addMessage(`Error: ${detail}`, 'assistant');
                console.error("Server error response:", errorData);
                return;
            }

            const data = await response.json();
            if (data.response_message) {
                addMessage(data.response_message, 'assistant', true); // Enable markdown parsing
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

    async function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === '') return;

        addMessage(messageText, 'user', false); // No markdown for user messages
        messageInput.value = '';
        
        await sendMessageToBot(messageText);
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
    
    // Image upload functionality
    imageUploadButton.addEventListener('click', () => {
        imageInput.click();
    });
    
    imageInput.addEventListener('change', (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            uploadImages(files);
        }
        // Reset the input so the same file can be selected again
        event.target.value = '';
    });

    // Initialize everything
    configureMarked();
    initializeSession();
});