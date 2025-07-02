export default async function handler(req, res) {
  try {
    const { input } = req.body || {};
    const text = input?.text?.toLowerCase() || "";

    let audioUrl;

    if (text.includes("non")) {
      audioUrl = "https://vpxeoycjmrsxbcmocwly.supabase.co/storage/v1/object/public/son/besoin.mp3";
    } else if (text.includes("oui")) {
      audioUrl = "https://vpxeoycjmrsxbcmocwly.supabase.co/storage/v1/object/public/son/rdv.mp3";
    } else {
      audioUrl = "https://vpxeoycjmrsxbcmocwly.supabase.co/storage/v1/object/public/son/nom.mp3";
    }

    // Header pour éviter certains blocages
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).json({
      type: "play",
      payload: {
        url: audioUrl
      }
    });
  } catch (error) {
    console.error("Erreur dans custom-audio :", error);
    return res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
}
