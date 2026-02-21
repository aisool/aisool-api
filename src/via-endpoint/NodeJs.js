const axios = require('axios');

const callAi = async () => {
  try {
    const res = await axios.post(
      'https://aisool-max-v2.hf.space/v1/chat/completions',
      {
        model: 'sool-max',
        messages: [{ role: 'user', content: 'Hello AI!' }]
      },
      {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY', 
          'Content-Type': 'application/json'
        } 
      }
    );

    const data = res.data;
    const message = data.choices?.[0]?.message;

    console.log('Role:', message?.role);
    console.log('Content:', message?.content);
    console.log('Finish Reason:', data.choices?.[0]?.finish_reason);
    console.log('Usage:', data.usage);

  } catch (err) {
    console.error(err);
  }
};
