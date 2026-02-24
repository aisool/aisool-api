# Python Chat API - Complete Example (OpenAI format)
import requests
import json

def send_message(user_message):
    """
    Send a message using OpenAI-compatible format
    """
    url = "https://api.aisool.com/v1/chat/completions"
    headers = {
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "sool-max",
        "messages": [{"role": "user", "content": user_message}]
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        
        print(f"Role: {data['choices'][0]['message']['role']}")
        print(f"Content: {data['choices'][0]['message']['content']}")
        print(f"Finish Reason: {data['choices'][0]['finish_reason']}")
        print(f"Usage: {data.get('usage')}")
        
        return data
        
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Example usage
if __name__ == "__main__":
    result = send_message("Explain quantum computing")
    if result:
        print(f"\\nAI says: {result['choices'][0]['message']['content']}")
