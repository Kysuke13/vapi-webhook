export default async function handler(req, res) {
  const { callId } = req.body;

  if (!callId) {
    return res.status(400).json({ error: "Missing callId" });
  }

  try {
    const result = await fetch(`https://api.vapi.ai/call/${callId}/event`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "play",
        payload: {
          url: "https://vibe-coder.vercel.app/audio/intro.mp3"
        }
      })
    });

    const data = await result.json();
    res.status(200).json({ success: true, response: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "API error" });
  }
}
