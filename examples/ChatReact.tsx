// React Chat Component - Full Implementation (OpenAI format)
import React, { useState } from 'react';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('https://api.aisool.com/v1/chat/completions', {
        method: 'POST',
        headers: { 
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          model: "sool-max",
          messages: [{ role: "user", content: message }]
        })
      });

      if (!res.ok) throw new Error('API request failed');

      const data = await res.json();
      
      setResponse(data);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        value={message} 
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask anything..."
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
      
      {error && <div>Error: {error}</div>}
      
      {response && (
        <div>
          <p><strong>AI Response:</strong></p>
          <p>{response.choices?.[0]?.message?.content || 'No response'}</p>
          <small>Status: {response.choices?.[0]?.finish_reason || 'unknown'} | Tokens: {response.usage?.total_tokens || 'N/A'}</small>
        </div>
      )}
    </div>
  );
};
