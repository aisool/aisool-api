// Chat API - Complete Example (OpenAI-compatible format)
const sendMessage = async (userMessage) => {
  try {
    const response = await fetch('https://api.aisool.com/v1/chat/completions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY_HERE"
      },
      body: JSON.stringify({
        model: "sool-max",
        messages: [
          { role: "user", content: userMessage }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(\`API error: \${response.status}\`);
    }

    const data = await response.json();
    
    console.log('AI Role:', data.choices[0].message.role);           // "assistant"
    console.log('AI Answer:', data.choices[0].message.content);      // The actual response text
    console.log('Status:', data.choices[0].finish_reason);           // "stop" = completed
    console.log('Tokens Used:', data.usage);                         // { prompt_tokens, completion_tokens, total_tokens }
    
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error('Error calling AI:', error);
    return null;
  }
};

// Usage: sendMessage("What is the weather like?");
