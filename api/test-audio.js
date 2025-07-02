export default async function handler(req, res) {
  const { input } = req.body;

  const text = input?.text?.toLowerCase() || "";

  let audioUrl;

  if (text.includes("non")) {
    audioUrl = "https://ton-projet.vercel.app/audio/refus.mp3";
  } else if (text.includes("oui")) {
    audioUrl = "https://ton-projet.vercel.app/audio/ok.mp3";
  } else {
    audioUrl = "https://ton-projet.vercel.app/audio/standard.mp3";
  }

  return res.status(200).json({
    type: "play",
    payload: {
      url: audioUrl
    }
  });
}
