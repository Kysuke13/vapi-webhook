// pages/api/get-audio.js
export default async function handler(req, res) {
  const audioUrl = https://vpxeoycjmrsxbcmocwly.supabase.co/storage/v1/object/public/son//nom.mp3"; // Ton fichier audio public

  res.status(200).json({
    type: "play",
    payload: {
      url: audioUrl
    }
  });
}

