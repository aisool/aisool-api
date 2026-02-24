// Using Fetch in JavaScript
const fetchData = async () => {
  try {
    const res = await fetch('https://api.aisool.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer YOUR_API_KEY' 
      },
      body: JSON.stringify({
        model: "sool-max",
        messages: [{ role: "user", content: "Hello AI!" }]
      })
    });

    if (!res.ok) throw new Error("API request failed");

    const data = await res.json();

    // JSON response
    console.log("Role:", data.choices[0].message.role);
    console.log("Content:", data.choices[0].message.content);
    console.log("Finish Reason:", data.choices[0].finish_reason);
    console.log("Usage:", data.usage);

    return data;
  } catch (err) {
    console.error(err);
  }
};
// Image Generation in JavaScript
const generateImage = async () => {
  try {
    const res = await fetch('https://api.aisool.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer YOUR_API_KEY' 
      },
      body: JSON.stringify({
        prompt: "A futuristic city in the style of Cyberpunk",
        n: 1,
        size: "1024x1024"
      })
    });

    if (!res.ok) throw new Error("Image request failed");

    const data = await res.json();

    // The image data is usually a Base64 string or URL
    console.log("Image URL:", data.data[0].url);
    console.log("Created At:", data.created);

    return data;
  } catch (err) {
    console.error(err);
  }
};
