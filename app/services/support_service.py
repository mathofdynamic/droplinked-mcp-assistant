# app/services/support_service.py
import requests
import json
import os
from datetime import datetime
from typing import Dict, Any, Optional
from dotenv import load_dotenv
import httpx
import base64

load_dotenv()

class SupportReportData:
    """Data structure for support escalation reports"""
    def __init__(self, 
                 user_email: str,
                 subject: str,
                 category: str,
                 problem_brief: str,
                 solutions_attempted: str,
                 suggested_solutions: str,
                 conversation_context: Optional[str] = None):
        self.user_email = user_email
        self.subject = subject
        self.category = category
        self.problem_brief = problem_brief
        self.solutions_attempted = solutions_attempted
        self.suggested_solutions = suggested_solutions
        self.conversation_context = conversation_context
        self.timestamp = datetime.now()

def escape_telegram_markdownv2(text: str) -> str:
    """
    Properly escape ALL characters for Telegram MarkdownV2 format.
    MarkdownV2 requires escaping: _ * [ ] ( ) ~ ` > # + - = | { } . ! \
    """
    if not text:
        return ""
    
    # List of characters that MUST be escaped in MarkdownV2
    special_chars = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!', '\\']
    
    # Escape backslashes first to avoid double-escaping
    text = text.replace('\\', '\\\\')
    
    # Then escape all other special characters
    for char in special_chars:
        if char != '\\':  # We already handled backslashes
            text = text.replace(char, f'\\{char}')
    
    return text

async def send_support_escalation(
    user_email: str,
    subject: str,
    category: str,
    problem_brief: str,
    solutions_attempted: str,
    suggested_solutions: str,
    conversation_context: Optional[str] = None
) -> Dict[str, Any]:
    """
    Send a support escalation report directly to Telegram channel.
    
    Args:
        user_email: Email of the user requesting support
        subject: Brief subject of the issue
        category: Category for routing (dev, content, marketing, support, etc.)
        problem_brief: Description of the user's problem
        solutions_attempted: What solutions the bot already tried
        suggested_solutions: Suggested next steps for support team
        conversation_context: Optional conversation history for context
    
    Returns:
        Dict with success status and message
    """
    try:
        # Get Telegram bot token from environment
        telegram_bot_token = os.getenv("TELEGRAM_API_TOKEN")
        if not telegram_bot_token:
            return {
                "success": False,
                "error": "TELEGRAM_API_TOKEN not found in environment variables"
            }
        
        # Telegram channel ID (from your Cloudflare worker)
        channel_id = "-1002529823027"
        
        # Format the timestamp
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S UTC")
        
        # Escape all text for MarkdownV2
        escaped_subject = escape_telegram_markdownv2(subject)
        escaped_email = escape_telegram_markdownv2(user_email)
        escaped_category = escape_telegram_markdownv2(category.upper())
        escaped_timestamp = escape_telegram_markdownv2(timestamp)
        escaped_problem = escape_telegram_markdownv2(problem_brief)
        escaped_solutions = escape_telegram_markdownv2(solutions_attempted)
        escaped_suggested = escape_telegram_markdownv2(suggested_solutions)
        
        # Create message with proper MarkdownV2 escaping
        support_message = f"""*SUPPORT ESCALATION REQUEST*

*Subject:* Issue with {escaped_subject}
*User:* {escaped_email}
*Time:* {escaped_timestamp}
*Category:* {escaped_category}

*Brief of User Problem:*
{escaped_problem}

*Solutions Already Attempted:*
{escaped_solutions}

*Suggested Next Steps:*
{escaped_suggested}
"""
        
        # Add conversation context if provided
        if conversation_context:
            context_preview = conversation_context[:500]
            if len(conversation_context) > 500:
                context_preview += "..."
            
            escaped_context = escape_telegram_markdownv2(context_preview)
            support_message += f"""
*Recent Conversation Context:*
{escaped_context}
"""
        
        escaped_separator = escape_telegram_markdownv2("-" * 50)
        escaped_footer = escape_telegram_markdownv2(f"Please reach out to the user at {user_email} to provide further assistance.")
        
        support_message += f"""
{escaped_separator}
{escaped_footer}
"""
        
        # Prepare Telegram API request
        telegram_api_url = f"https://api.telegram.org/bot{telegram_bot_token}/sendMessage"
        
        telegram_payload = {
            "chat_id": channel_id,
            "text": support_message,
            "parse_mode": "MarkdownV2"
        }
        
        # Send directly to Telegram API
        response = requests.post(
            telegram_api_url, 
            headers={'Content-Type': 'application/json'},
            data=json.dumps(telegram_payload), 
            timeout=30
        )
        
        response_data = response.json()
        
        if response.status_code == 200 and response_data.get("ok"):
            return {
                "success": True,
                "message": "Support escalation sent successfully. Our team will reach out to you soon!",
                "telegram_response": response_data
            }
        else:
            error_description = response_data.get("description", "Unknown error")
            return {
                "success": False,
                "error": f"Failed to send to Telegram. Status: {response.status_code}, Error: {error_description}"
            }
            
    except requests.exceptions.Timeout:
        return {
            "success": False,
            "error": "Request timeout while sending escalation to Telegram"
        }
    except requests.exceptions.RequestException as e:
        return {
            "success": False,
            "error": f"Network error while sending escalation to Telegram: {str(e)}"
        }
    except Exception as e:
        return {
            "success": False,
            "error": f"Unexpected error while sending support escalation: {str(e)}"
        }

def decode_jwt_payload(jwt_token: str) -> Dict[str, Any]:
    """
    Decode JWT payload to extract user information like email.
    Note: This only decodes the payload, doesn't verify signature.
    """
    try:
        # Split the JWT token (header.payload.signature)
        parts = jwt_token.split('.')
        if len(parts) != 3:
            return {}
        
        # Decode the payload (second part)
        payload = parts[1]
        # Add padding if needed for base64 decoding
        payload += '=' * (4 - len(payload) % 4)
        
        # Decode from base64
        decoded_bytes = base64.urlsafe_b64decode(payload)
        decoded_payload = json.loads(decoded_bytes.decode('utf-8'))
        
        return decoded_payload
    except Exception as e:
        print(f"ERROR: Failed to decode JWT: {e}")
        return {}

def should_offer_human_support(conversation_history: str) -> bool:
    """
    Detect if the bot should proactively offer human support based on conversation patterns.
    Returns True if human support should be offered.
    """
    if not conversation_history:
        return False
    
    # Convert to lowercase for pattern matching
    conv_lower = conversation_history.lower()
    
    # Signs that suggest the bot should offer human support
    frustration_indicators = [
        "not working", "still not working", "doesn't work", "still doesn't work",
        "not understanding", "confused", "frustrated", "help me",
        "same problem", "still having", "tried everything", "nothing works",
        "error", "failed", "broken", "stuck", "can't do", "unable to",
        "this is not helping", "not helpful", "tried that already",
        "same issue", "keeps happening", "won't work", "impossible"
    ]
    
    # Count how many frustration indicators appear
    frustration_count = sum(1 for indicator in frustration_indicators if indicator in conv_lower)
    
    # Check for repeated requests or circular conversations
    repeated_patterns = [
        "how do i", "how to", "can you help", "need help",
        "try again", "still", "but", "however", "unfortunately"
    ]
    
    repeat_count = sum(1 for pattern in repeated_patterns if conv_lower.count(pattern) > 1)
    
    # If there are multiple frustration indicators or repeated patterns, offer human support
    return frustration_count >= 2 or repeat_count >= 2

def generate_proactive_support_message() -> str:
    """
    Generate a friendly message offering human support proactively.
    """
    return """It seems like you're running into some challenges that might benefit from direct human assistance. 

Would you like me to connect you with our support team? They can provide personalized help and work through this issue with you step-by-step.

Just let me know if you'd like to reach out to human support! 🤝"""

async def escalate_to_human_support(
    user_email: str = None,
    issue_description: str = "",
    category: str = "support", 
    conversation_history: str = "",
    jwt_token: str = None
) -> Dict[str, Any]:
    """
    Escalate user issue to human support via Telegram with BRIEF context.
    Now automatically extracts email from JWT if available.
    """
    try:
        # Try to extract email from JWT first
        if not user_email and jwt_token:
            jwt_payload = decode_jwt_payload(jwt_token)
            user_email = jwt_payload.get('email') or jwt_payload.get('sub') or jwt_payload.get('user_email')
            print(f"DEBUG: Extracted email from JWT: {user_email}")
        
        # If still no email, ask for it
        if not user_email:
            return {
                "success": False,
                "message": "I'll connect you with human support! Please provide your email address so they can reach you.",
                "requires_email": True
            }

        # Smart category detection based on issue keywords
        issue_lower = issue_description.lower()
        
        if any(word in issue_lower for word in ['bug', 'error', 'crash', 'broken', 'not working', 'technical']):
            detected_category = "development"
            subject = "Technical Issue"
        elif any(word in issue_lower for word in ['product', 'listing', 'upload', 'image', 'content', 'description']):
            detected_category = "content"
            subject = "Product/Content Issue"
        elif any(word in issue_lower for word in ['sell', 'sales', 'money', 'payment', 'commission', 'affiliate']):
            detected_category = "sales"
            subject = "Sales/Revenue Issue"
        elif any(word in issue_lower for word in ['marketing', 'promotion', 'social media', 'advertising', 'traffic']):
            detected_category = "marketing"
            subject = "Marketing/Promotion Support"
        elif any(word in issue_lower for word in ['collaborate', 'partnership', 'business', 'integration', 'api']):
            detected_category = "business-development"
            subject = "Collaboration/Partnership Inquiry"
        else:
            detected_category = category if category != "support" else "general-support"
            subject = "General Support Request"
        
        # Generate truthful problem brief based on the actual issue and conversation
        if conversation_history:
            # Analyze what actually happened in the conversation
            conv_lower = conversation_history.lower()
            
            # Check if the assistant actually provided help or just escalated
            provided_help = False
            help_attempts = []
            
            if 'assistant:' in conv_lower:
                # Extract what the assistant actually said/did
                if any(word in conv_lower for word in ['here are some steps', 'try this', 'you can', 'i recommend', 'solution', 'fix']):
                    provided_help = True
                    help_attempts.append("Provided troubleshooting suggestions")
                
                if any(word in conv_lower for word in ['documentation', 'guide', 'help article', 'resource']):
                    provided_help = True
                    help_attempts.append("Shared relevant documentation")
                
                if any(word in conv_lower for word in ['check your', 'verify', 'make sure']):
                    provided_help = True
                    help_attempts.append("Suggested verification steps")
            
            # Create truthful problem summary - BRIEF, not entire chat
            if len(conversation_history) > 200:
                # Extract just the key points, not entire conversation
                brief_context = conversation_history[-200:]  # Last 200 chars only
                problem_brief = f"User issue: {issue_description}\n\nBrief context: {brief_context}"
            else:
                problem_brief = f"User issue: {issue_description}\n\nContext: {conversation_history}"
            
            # Generate truthful solutions attempted
            if provided_help and help_attempts:
                solutions_attempted = f"AI assistant attempted the following:\n• " + "\n• ".join(help_attempts) + "\n• User still requested human assistance for further support"
            else:
                # User directly asked for human help without trying bot solutions
                if any(word in issue_lower for word in ['human', 'support', 'real person', 'talk to someone', 'escalate']):
                    solutions_attempted = "User directly requested human assistance. The conversation focused on escalating to human support rather than automated troubleshooting."
                else:
                    solutions_attempted = f"User described the issue: {issue_description}. Limited automated assistance was provided before user requested human support."
        else:
            problem_brief = f"User issue: {issue_description}\n\nNo conversation history available."
            solutions_attempted = "User requested support escalation. No previous conversation context available."
        
        # Generate appropriate suggested solutions based on the detected category and context
        if any(word in issue_lower for word in ['collaborate', 'partnership', 'business']):
            suggested_solutions = "• Schedule a business discussion call\n• Review partnership opportunities\n• Connect with appropriate business development team\n• Provide information about collaboration options"
        elif any(word in issue_lower for word in ['human', 'support', 'real person', 'talk to someone', 'escalate']) and 'technical' not in issue_lower:
            suggested_solutions = "• Contact user directly to understand their specific needs\n• Provide personalized assistance beyond AI capabilities\n• Address any concerns about the AI assistant\n• Ensure user satisfaction with human support"
        else:
            # Generate suggestions based on the detected category
            if detected_category == "development":
                suggested_solutions = "• Investigate technical details of the reported issue\n• Provide hands-on technical support\n• Check system logs and configurations\n• Offer personalized troubleshooting assistance"
            elif detected_category == "content":
                suggested_solutions = "• Review user's content creation needs\n• Provide personalized guidance on product listings\n• Assist with content optimization strategies\n• Help with platform-specific content requirements"
            elif detected_category == "sales":
                suggested_solutions = "• Analyze user's sales performance and goals\n• Provide personalized sales strategy advice\n• Discuss revenue optimization opportunities\n• Review account setup and sales tools"
            elif detected_category == "marketing":
                suggested_solutions = "• Discuss marketing strategy and promotional options\n• Review advertising opportunities\n• Provide guidance on audience targeting\n• Explore platform marketing features"
            elif detected_category == "business-development":
                suggested_solutions = "• Schedule business development consultation\n• Review partnership and collaboration options\n• Discuss integration opportunities\n• Connect with appropriate business team"
            else:
                suggested_solutions = "• Provide personalized assistance based on user's specific needs\n• Address the user's concerns directly\n• Offer detailed guidance beyond AI capabilities\n• Follow up to ensure complete resolution"
        
        # Send the escalation with truthful information
        result = await send_support_escalation(
            user_email=user_email,
            subject=subject,
            category=detected_category,
            problem_brief=problem_brief,
            solutions_attempted=solutions_attempted,
            suggested_solutions=suggested_solutions,
            conversation_context=conversation_history
        )
        
        return result 
    except Exception as e:
        return {
            "success": False,
            "error": f"Unexpected error while escalating to human support: {str(e)}"
        } 

async def handle_user_support(
    action: str,
    conversation_history: str = "",
    issue_description: str = "",
    user_email: str = None,
    category: str = "support",
    jwt_token: str = None
) -> Dict[str, Any]:
    """
    Unified function to handle all support scenarios.
    
    Actions:
    - check_if_support_needed: Analyze conversation for frustration patterns
    - offer_human_support: Generate friendly support offer message
    - escalate_to_support: Actually escalate to human support via Telegram
    """
    try:
        if action == "check_if_support_needed":
            # Check if we should proactively offer human support
            should_offer = should_offer_human_support(conversation_history)
            return {
                "success": True,
                "action": "check_if_support_needed",
                "should_offer_support": should_offer,
                "message": "Support analysis complete" if should_offer else "No support needed detected"
            }
        
        elif action == "offer_human_support":
            # Generate proactive support message
            support_message = generate_proactive_support_message()
            return {
                "success": True,
                "action": "offer_human_support",
                "message": support_message
            }
        
        elif action == "escalate_to_support":
            # Actually escalate to human support
            if not issue_description:
                return {
                    "success": False,
                    "error": "issue_description is required for escalate_to_support action"
                }
            
            # Call the existing escalation function
            result = await escalate_to_human_support(
                user_email=user_email,
                issue_description=issue_description,
                category=category,
                conversation_history=conversation_history,
                jwt_token=jwt_token
            )
            
            # Add action info to result
            result["action"] = "escalate_to_support"
            return result
        
        else:
            return {
                "success": False,
                "error": f"Invalid action: {action}. Use: check_if_support_needed, offer_human_support, or escalate_to_support"
            }
    
    except Exception as e:
        return {
            "success": False,
            "error": f"Error in handle_user_support: {str(e)}"
        } 