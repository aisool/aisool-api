// Assistant - OpenAI-compatible context-aware
class AiAssistant {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.messages = [];
  }

  async ask(question, includeContext = true) {
    try {
      let currentMessages = [...this.messages];
      
      if (includeContext) {
        currentMessages.push({ role: "user", content: question });
      } else {
        currentMessages = [{ role: "user", content: question }];
      }

      const response = await fetch('https://api.aisool.com/v1/chat/completions', {
        method: 'POST',
        headers: { 
          'Authorization': \`Bearer \${this.apiKey}\`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          model: "sool-max",
          messages: currentMessages
        })
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      const assistantMsg = data.choices[0].message;
      
      if (includeContext) {
        this.messages.push({ role: "user", content: question });
        this.messages.push(assistantMsg);
      }
      
      return {
        answer: assistantMsg.content,
        status: data.choices[0].finish_reason,
        tokens: data.usage
      };
    } catch (error) {
      console.error('Assistant error:', error);
      return null;
    }
  }

  resetContext() {
    this.messages = [];
  }
}

// Usage
const assistant = new AiAssistant('${key}');
const step1 = await assistant.ask('How do I setup a React project?');
console.log(step1.answer);

const step2 = await assistant.ask('What dependencies do I need?');
console.log(step2.answer);
