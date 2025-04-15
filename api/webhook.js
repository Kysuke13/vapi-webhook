// Mémoire simple pour stocker le texte par appel
const buffers = {};
const alreadyPlayed = {};

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

  const fragment = message?.output?.trim().toLowerCase();
  const callId = message?.call?.id;

  if (!fragment || !callId) {
    console.log("❌ Fragment ou callId manquant.");
    return res.status(200).json({ text: '' });
  }

  // On bufferise tout par call
  buffers[callId] = (buffers[callId] || '') + fragment;
  const full = buffers[callId];

  console.log(`📥 Buffer actuel (${callId}):`, full);
  
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

for (const keyword of Object.keys(triggerMap)) {
    if (full.includes(keyword) && !alreadyPlayed[callId + keyword]) {
      alreadyPlayed[callId + keyword] = true; // empêche de rejouer
      const phrase = triggerMap[keyword];

      console.log("🔊 Détection ! Envoi du MP3 :", phrase.audio_url);

      return res.status(200).json({
        text: phrase.fullText,
        audio_url: phrase.audio_url
      });
    }
  }

  // Sinon on ne dit rien
  return res.status(200).json({ text: '' });
};
