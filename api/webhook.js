export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const message = req.body?.message;
  const type = message?.type;

  if (type !== 'model-output') {
    console.log("Ignoré : type =", type);
    return res.status(200).json({ text: '' });
  }

  console.log("🧩 message.content complet :", JSON.stringify(message?.content));

  // 🧠 Extraction intelligente du texte (quelle que soit la structure)
  let text = null;

  if (typeof message?.content === 'string') {
    text = message.content;
  } else if (message?.content?.text) {
    text = message.content.text;
  } else if (Array.isArray(message?.content?.messages)) {
    const firstMessage = message.content.messages.find(m => m?.text);
    if (firstMessage) text = firstMessage.text;
  }

  console.log("🧠 Phrase détectée :", text);
  const preRecordedAudios = {
    "Bonjour, pouvez-vous confirmer votre nom ?": "https://hcxlesleujrfutixrqeu.supabase.co/storage/v1/object/public/son//nom.mp3",
    "Quel est votre besoin principal aujourd'hui ?": "https://hcxlesleujrfutixrqeu.supabase.co/storage/v1/object/public/son//besoin.mp3",
    "Êtes-vous disponible pour un rendez-vous demain ?": "https://hcxlesleujrfutixrqeu.supabase.co/storage/v1/object/public/son//rdv.mp3",
  };
 
  let response = { text };

  if (text && preRecordedAudios[text]) {
    response.audio_url = preRecordedAudios[text];
    console.log("🔊 Audio trouvé :", response.audio_url);
  } else {
    console.log("🗣️ Pas de correspondance, voix synthétique utilisée.");
  }

  return res.status(200).json(response);
}
