// Bot Implementation - OpenAI-compatible
class AiBot {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.conversationHistory = [];
  }

  async sendMessage(message) {
    try {
      this.conversationHistory.push({ role: "user", content: message });

      const response = await fetch('https://api.aisool.com/v1/chat/completions', {
        method: 'POST',
        headers: { 
          'Authorization': \`Bearer \${this.apiKey}\`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          model: "sool-max",
          messages: this.conversationHistory
        })
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      const assistantMessage = data.choices[0].message;
      
      this.conversationHistory.push({
        role: assistantMessage.role,
        content: assistantMessage.content
      });

      return assistantMessage.content;
    } catch (error) {
      console.error('Bot error:', error);
      return 'Sorry, I encountered an error.';
    }
  }

  getContext() {
    return this.conversationHistory
      .map(msg => \`\${msg.role}: \${msg.content}\`)
      .join('\\n');
  }
}

// Usage
const bot = new AiBot('${key}');
const reply = await bot.sendMessage('Hello!');
console.log(reply);
