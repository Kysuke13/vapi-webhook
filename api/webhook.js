export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const message = req.body?.message;
  const type = message?.type;

  // 💬 On intercepte uniquement les messages générés par l'IA avant qu'ils ne soient parlés
  if (type !== 'model-output') {
    console.log("Ignoré : type =", type);
    return res.status(200).json({ text: '' });
  }

  const text = message?.content?.text;
  console.log("🧠 Phrase générée par l'IA :", text);

  // 🎯 Ton mapping texte exact ➜ fichier audio
  const preRecordedAudios = {
    "Bonjour, pouvez-vous confirmer votre nom ?": "https://hcxlesleujrfutixrqeu.supabase.co/storage/v1/object/public/son//nom.mp3",
    "Quel est votre besoin principal aujourd'hui ?": "https://hcxlesleujrfutixrqeu.supabase.co/storage/v1/object/public/son//besoin.mp3",
    "Êtes-vous disponible pour un rendez-vous demain ?": "https://hcxlesleujrfutixrqeu.supabase.co/storage/v1/object/public/son//rdv.mp3",
  };
// 🛠️ Réponse par défaut = texte original
  let response = { text };

  // 🎧 Si la phrase correspond, on utilise l'enregistrement
  if (text && preRecordedAudios[text]) {
    response.audio_url = preRecordedAudios[text];
    console.log("🔊 On remplace par l'audio :", response.audio_url);
  } else {
    console.log("🗣️ Pas de correspondance, voix synthétique utilisée.");
  }

  return res.status(200).json(response);
}
