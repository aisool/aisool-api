# Python Assistant - OpenAI-compatible context-aware
import requests
from typing import List, Dict, Optional

class AiAssistant:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.url = "https://api.aisool.com/v1/chat/completions"
        self.messages: List[Dict] = []
    
    def ask(self, question: str, use_context: bool = True) -> Optional[Dict]:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        current_messages = self.messages.copy()
        current_messages.append({"role": "user", "content": question})
        
        if not use_context:
            current_messages = [{"role": "user", "content": question}]
        
        try:
            response = requests.post(
                self.url,
                json={
                    "model": "sool-max",
                    "messages": current_messages
                },
                headers=headers
            )
            response.raise_for_status()
            
            data = response.json()
            assistant_msg = data["choices"][0]["message"]
            
            if use_context:
                self.messages.append({"role": "user", "content": question})
                self.messages.append(assistant_msg)
            
            return {
                "answer": assistant_msg["content"],
                "status": data["choices"][0]["finish_reason"],
                "tokens": data.get("usage", {})
            }
            
        except Exception as e:
            print(f"Assistant error: {e}")
            return None
    
    def reset_context(self):
        self.messages = []

# Usage
if __name__ == "__main__":
    assistant = AiAssistant("${key}")
    step1 = assistant.ask("How do I start learning Python?")
    print(f"Step 1: {step1['answer']}\\n")
    
    step2 = assistant.ask("What's the first thing I should learn?")
    print(f"Step 2: {step2['answer']}\\n")
    
    step3 = assistant.ask("Can you give me a simple example?")
    print(f"Step 3: {step3['answer']}")
    print(f"Tokens used: {step3['tokens'].get('total_tokens', 'N/A')}")
