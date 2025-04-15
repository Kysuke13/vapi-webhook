module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const message = req.body?.message;
  const type = message?.type;

  if (type !== 'model-output') {
    console.log("Ignoré : type =", type);
    return res.status(200).json({ text: '' });
  }

  const rawFragment = message?.output;
  const fragment = rawFragment?.trim().toLowerCase();
  console.log("🎯 Fragment reçu :", fragment);
  
  // Mots-clés déclencheurs -> audio
  const triggerMap = {
    "confirmer": {
      fullText: "Bonjour, pouvez-vous confirmer votre nom ?",
      audio_url: "https://hcxlesleujrfutixrqeu.supabase.co/storage/v1/object/public/son//nom.mp3"
    },
    "besoin": {
      fullText: "Quel est votre besoin principal aujourd'hui ?",
      audio_url: "https://hcxlesleujrfutixrqeu.supabase.co/storage/v1/object/public/son//besoin.mp3"
    },
    "demain": {
      fullText: "Êtes-vous disponible pour un rendez-vous demain ?",
      audio_url: "https://hcxlesleujrfutixrqeu.supabase.co/storage/v1/object/public/son//rdv.mp3"
    }
  };

 let response = {};

  if (fragment && triggerMap[fragment]) {
    const phrase = triggerMap[fragment];
    response = {
      text: phrase.fullText,
      audio_url: phrase.audio_url
    };
    console.log("🔊 MP3 déclenché :", phrase.audio_url);
  } else {
    console.log("🗣️ Fragment ignoré ou non reconnu.");
  }

  return res.status(200).json(response);
}
