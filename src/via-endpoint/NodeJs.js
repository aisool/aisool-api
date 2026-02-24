const axios = require('axios');

const callAi = async () => {
  try {
    const res = await axios.post(
      'https://api.aisool.com/v1/chat/completions',
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


// image generation

const axios = require('axios');

const generateArt = async () => {
  try {
    const res = await axios.post(
      'https://api.aisool.com/v1/images/generations',
      {
        prompt: 'Oil painting of a space station',
        n: 1,
        size: '1024x1024'
      },
      {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY', 
          'Content-Type': 'application/json'
        } 
      }
    );

    const data = res.data;
    console.log('Image Source:', data.data[0].url);
    console.log('Timestamp:', data.created);

  } catch (err) {
    console.error(err);
  }
};
