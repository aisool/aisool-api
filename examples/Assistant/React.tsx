// React Assistant - OpenAI format context-aware
import React, { useState, useRef } from 'react';

const AssistantComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const askAssistant = async (question) => {
    setLoading(true);
    
    const userMsg = { role: 'user', content: question };
    const currentMessages = [...messages, userMsg];

    try {
      const res = await fetch('https://api.aisool.com/v1/chat/completions', {
        method: 'POST',
        headers: { 
          'Authorization': 'Bearer ${key}',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          model: "sool-max",
          messages: currentMessages
        })
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      const assistantMsg = data.choices[0].message;
      
      setMessages([...currentMessages, assistantMsg]);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (input.trim()) {
      askAssistant(input);
      setInput('');
    }
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        disabled={loading}
        placeholder="Ask for help..."
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask'}
      </button>
    </div>
  );
};
