export default function handler(req, res) {
  const method = req.method;
  let text = "";

  if (method === "GET") {
    text = req.query.text?.toLowerCase() || "";
  } else if (method === "POST") {
    text = req.body?.input?.text?.toLowerCase() || "";
  }

  let audioUrl;

  if (text.includes("non")) {
    audioUrl = "https://vpxeoycjmrsxbcmocwly.supabase.co/storage/v1/object/public/son/besoin.mp3";
  } else {
    audioUrl = "https://vpxeoycjmrsxbcmocwly.supabase.co/storage/v1/object/public/son/rdv.mp3";
  }

  return res.status(200).json({
    type: "play",
    payload: {
      url: audioUrl,
    },
  });
}
