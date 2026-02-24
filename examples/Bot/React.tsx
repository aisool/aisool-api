// React Bot Component - OpenAI format with history
import React, { useState } from 'react';

const BotComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendToBot = async (userMessage) => {
    const userMsg = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch('https://api.aisool.com/v1/chat/completions', {
        method: 'POST',
        headers: { 
          'Authorization': 'Bearer ${key}',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          model: "sool-max",
          messages: messages.concat(userMsg)
        })
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      const botMsg = data.choices[0].message;
      
      setMessages(prev => [...prev, botMsg]);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = () => {
    if (input.trim()) {
      sendToBot(input);
      setInput('');
    }
  };

  return (
    <div>
      <div className="chat-history">
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
      />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};
