// Using Fetch in React / React Native / Expo
const fetchData = async () => {
  try {
    const res = await fetch('https://api.aisool.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY' 
      },
      body: JSON.stringify({
        model: 'sool-max',
        messages: [{ role: 'user', content: 'Hello AI!' }]
      })
    });

    if (!res.ok) throw new Error('API request failed');
 
    const data = await res.json();
    const message = data.choices?.[0]?.message;

    console.log('Role:', message?.role);
    console.log('Content:', message?.content);
    console.log('Finish Reason:', data.choices?.[0]?.finish_reason);
    console.log('Usage:', data.usage);

    return data;
  } catch (err) {
    console.error(err);
  }
};


// Image Generation in React
const generateImage = async () => {
  try {
    const res = await fetch('https://api.aisool.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY' 
      },
      body: JSON.stringify({
        prompt: 'A majestic mountain range at sunset',
        n: 1,
        size: '1024x1024'
      })
    });

    if (!res.ok) throw new Error('Image request failed');

    const data = await res.json();
    const imageUrl = data.data?.[0]?.url;

    console.log('Generated Image Source:', imageUrl);
    return imageUrl;
  } catch (err) {
    console.error(err);
  }
};
