<script type="module">
  import React, { useState } from 'react';
  import { createRoot } from 'react-dom/client';
  import { AisoolClient } from 'aisool-sdk'; 
  
  function App() {
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
  
    const runTest = async () => {
      setLoading(true);
      try {
        const client = new AisoolClient('your_key_here'); // Add your API here, use .env to secure your API Key
        
        const res = await client.chat('Hello!');
        setResponse(res.content);
      } catch (err) {
        setResponse('Error: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
  
    return React.createElement('div', { className: 'p-5' }, [
      React.createElement('button', { 
        onClick: runTest, 
        className: 'bg-blue-500 p-2 rounded' 
      }, loading ? 'Loading...' : 'Test SDK'),
      React.createElement('pre', { className: 'mt-4 text-xs' }, response)
    ]);
  }
  
  const root = createRoot(document.getElementById('root'));
  root.render(React.createElement(App));
</script>
