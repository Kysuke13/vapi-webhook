export default function handler(req, res) {
  const audioUrl = "https://vpxeoycjmrsxbcmocwly.supabase.co/storage/v1/object/public/son/nom.mp3";

  res.status(200).json({
    actions: [
      {
        type: "play",
        payload: {
          url: audioUrl
        }
      }
    ]
  });
}
