# app/services/nlu_service.py
from typing import Tuple, Any, Dict

def parse_message(message: str) -> Tuple[str, Dict[str, Any]]:
    """
    Simple NLU: returns (intent_name, entities_dict)
    For MVP, entities can be minimal or just the raw parts of the message.
    """
    message_lower = message.lower().strip()

    if message_lower.startswith("login"):
        parts = message.split()
        if len(parts) == 3: # "login email password"
            return "intent_login", {"email": parts[1], "password": parts[2]}
        return "intent_login_prompt", {} # Prompt for credentials

    if message_lower == "list my products" or message_lower == "show products":
        return "intent_list_products", {}

    if message_lower.startswith("create product"):
        # More complex: this might just initiate a conversation
        # For now, let's assume it triggers a flow
        return "intent_create_product_start", {}
    
    if message_lower == "logout":
        return "intent_logout", {}

    # ... more intents
    return "intent_unknown", {"original_message": message}


POSITIVE_ANSWERS = ['yes', 'yeah', 'yup', 'sure', 'ok', 'okay', 'confirm', 'proceed', 'do it', 'sounds good', 'correct', 'right', 'please do', 'affirmative', 'y', 'go ahead']
NEGATIVE_ANSWERS = ['no', 'nope', 'nah', 'cancel', 'stop', 'don\'t', 'do not', 'nevermind', 'forget it', 'negative', 'n', 'don\'t do it']

def is_positive(text: str) -> bool:
    return text.strip().lower() in POSITIVE_ANSWERS

def is_negative(text: str) -> bool:
    return text.strip().lower() in NEGATIVE_ANSWERS