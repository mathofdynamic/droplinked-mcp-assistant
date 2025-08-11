# Project Explanation: Droplinked MCP (Model Context Protocol) Server

This document provides a detailed explanation of the Droplinked MCP server, its architecture, and how the chat functionality works.

## 1. Project Overview

The Droplinked MCP server is a FastAPI-based backend for an intelligent assistant that integrates with the Droplinked e-commerce platform. It allows users to manage their Droplinked products through a conversational chat interface. The assistant is powered by the OpenAI Assistant API, which enables it to understand natural language and perform tasks like creating, listing, and managing products.

### Key Features:

*   **AI-Powered Product Management:** Create, list, and manage Droplinked products using natural language.
*   **AI Mockup Generation:** Generate professional AI-enhanced product mockups.
*   **Secure Authentication:** Uses JWT-based authentication with the Droplinked API.
*   **Interactive Web Interface:** A modern chat-based UI for interacting with the assistant.
*   **OpenAI Assistant Integration:** Leverages the power of OpenAI's Assistant API for intelligent and contextual conversations.

## 2. How it Works: Architecture

The application consists of three main parts:

1.  **Frontend:** A simple HTML, CSS, and JavaScript frontend that provides the chat interface. The user interacts with the assistant through this interface.
2.  **Backend (FastAPI Server):** This is the core of the application. It's a Python server built with FastAPI that handles:
    *   Serving the frontend.
    *   User authentication.
    *   Communication with the Droplinked API for product management.
    *   Communication with the OpenAI Assistant API to power the chat.
3.  **External APIs:**
    *   **Droplinked API:** Used for all product-related operations, such as creating, listing, updating, and deleting products.
    *   **OpenAI Assistant API:** Used to create and manage the AI assistant, handle conversations (threads), and process user messages.

## 3. Chat API and Thread Management

The chat functionality is the most complex part of the application. Here's a detailed breakdown of how it works:

### Chat API Endpoint

The primary endpoint for the chat is `POST /chatbot/message`.

*   **Request:** It accepts a JSON payload with two fields:
    *   `session_id`: A unique identifier for the user's session. This is used to maintain the conversation history.
    *   `message`: The user's message as a string.
*   **Response:** It returns a JSON payload with two fields:
    *   `session_id`: The same session ID from the request.
    *   `response_message`: The assistant's response as a string.

### OpenAI Assistant API

The project uses the OpenAI Assistant API to create a powerful and stateful AI assistant. Here's how it's integrated:

1.  **Assistant Creation:** An assistant is created in the OpenAI platform with a set of instructions and a list of tools it can use. The `ASSISTANT_ID` is stored as an environment variable.
2.  **Tools (Functions):** The assistant is given access to a set of "tools," which are Python functions defined in the backend. These tools allow the assistant to perform actions, such as:
    *   `list_my_droplinked_products`: Lists the user's products.
    *   `create_new_droplinked_product`: Creates a new product.
    *   `get_droplinked_shop_collections`: Gets the user's product collections.
    *   And many more for managing products.
    The mapping of these tools is defined in the `AVAILABLE_TOOLS` dictionary in `app/routers/chatbot_router.py`.

### Thread Creation and Management

A "thread" in the OpenAI Assistant API represents a conversation. To maintain a continuous conversation with each user, the application manages threads as follows:

1.  **`SESSION_THREADS` Dictionary:** A dictionary named `SESSION_THREADS` is used to store the mapping between a user's `session_id` and their OpenAI `thread_id`. This dictionary is stored in memory.

2.  **`get_or_create_thread_for_session` Function:** This function is called every time a user sends a message.
    *   It checks if the `session_id` already exists in the `SESSION_THREADS` dictionary.
    *   **Existing User:** If the `session_id` exists, it retrieves the corresponding `thread_id`.
    *   **New User:** If the `session_id` does not exist, it creates a new thread using the OpenAI API, and then stores the new `thread_id` in the `SESSION_THREADS` dictionary with the `session_id` as the key.

This mechanism ensures that each user has a persistent conversation thread, allowing the assistant to remember the context of the conversation.

### Message Flow

Here is a step-by-step flow of what happens when a user sends a message:

1.  The user types a message in the frontend and clicks "send."
2.  The frontend sends a `POST` request to the `/chatbot/message` endpoint with the `session_id` and the `message`.
3.  The `handle_chatbot_message` function in `chatbot_router.py` is called.
4.  It calls `get_or_create_thread_for_session` to get or create a thread for the user.
5.  The user's message is added to the thread using the OpenAI API.
6.  A "run" is created on the thread. A run is an instance of the assistant processing the thread.
7.  The backend polls the status of the run.
8.  If the run's status becomes `requires_action`, it means the assistant wants to call one of the tools.
9.  The backend parses the tool call information, finds the corresponding function in the `AVAILABLE_TOOLS` dictionary, and executes it.
10. The result of the tool function is submitted back to the run.
11. The run continues and eventually completes.
12. The backend retrieves the latest message from the thread, which is the assistant's response.
13. The response is sent back to the frontend, which displays it to the user.

## 4. Key Files and Their Roles

*   `app/main.py`: The main entry point of the FastAPI application. It initializes the app, mounts the static files and templates, and defines the authentication and root endpoints.
*   `app/routers/chatbot_router.py`: This is where the core chat logic resides. It defines the `/chatbot/message` endpoint, manages the conversation threads, and handles the interaction with the OpenAI Assistant API, including tool calls.
*   `app/services/droplinked_api_service.py`: This service contains all the functions that interact with the Droplinked API. These are the functions that are exposed to the OpenAI assistant as tools.
*   `app/services/auth_service.py`: Handles user authentication against the Droplinked API.
*   `app/services/nlu_service.py`: A simple Natural Language Understanding service for basic intent parsing.
*   `app/services/ai_mockup_service.py`: This service is responsible for generating AI product mockups using OpenAI's DALL-E 3 model.
*   `openai_config/`: This directory contains configuration files for the OpenAI Assistant, including the system instructions and the JSON definitions of the tools.
*   `templates/index.html`: The main HTML file for the chat interface.
*   `static/script.js`: The JavaScript file that handles the frontend logic for the chat, including sending messages to the backend and displaying the responses.

## 5. How to Run the Project

To run this project, you will need Python 3.8+, an OpenAI API key, and a Droplinked account.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd droplinked_mcp
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    # On Windows
    venv\Scripts\activate
    # On macOS/Linux
    source venv/bin/activate
    ```

3.  **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure the environment variables:**
    Create a `.env` file in the project root and add the following variables:
    ```env
    OPENAI_API_KEY=your_openai_api_key
    ASSISTANT_ID=your_openai_assistant_id
    STATIC_DROPLINKED_JWT=your_static_jwt_for_testing
    ```
    You need to create an assistant in your OpenAI account and get the `ASSISTANT_ID`.

5.  **Run the application:**
    ```bash
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    ```

6.  **Access the application:**
    Open your browser and navigate to `http://localhost:8000`. You will see the chat interface. To authenticate, go to `http://localhost:8000/login`.
