// Using Fetch in JavaScript
const fetchData = async () => {
  try {
    const res = await fetch('https://aisool-max-v2.hf.space/v1/chat/completions', {
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
