# Python Bot - OpenAI-compatible with history
import requests
from datetime import datetime
from typing import List, Dict

class AiBot:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.url = "https://api.aisool.com/v1/chat/completions"
        self.conversation_history: List[Dict] = []
    
    def send_message(self, message: str) -> str:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        self.conversation_history.append({"role": "user", "content": message})
        
        try:
            response = requests.post(
                self.url,
                json={
                    "model": "sool-max",
                    "messages": self.conversation_history
                },
                headers=headers
            )
            response.raise_for_status()
            
            data = response.json()
            assistant_msg = data["choices"][0]["message"]
            
            self.conversation_history.append(assistant_msg)
            
            return assistant_msg["content"]
            
        except Exception as e:
            print(f"Bot error: {e}")
            return "Sorry, I encountered an error."
    
    def get_conversation(self) -> List[Dict]:
        return self.conversation_history
    
    def clear_history(self):
        self.conversation_history = []

# Usage example
if __name__ == "__main__":
    bot = AiBot("${key}")
    print(bot.send_message("Hello!"))
    print(bot.send_message("What can you help me with?"))
    for msg in bot.get_conversation():
        print(f"{msg['role']}: {msg['content']}")
