export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log("Contenu brut reçu :", req.body);

  const message = req.body?.message;
  const type = message?.type;

  // ✅ On ne s'occupe que des messages que l'assistant veut prononcer
  if (type !== 'assistant-message') {
    console.log("Ignoré : type =", type);
    return res.status(200).json({ text: '' }); // on ne répond rien
  }

  const text = message?.content?.text;
  console.log("Phrase assistant :", text);
  const preRecordedAudios = {
    "Bonjour, pouvez-vous confirmer votre nom ?": "https://hcxlesleujrfutixrqeu.supabase.co/storage/v1/object/public/son//nom.mp3",
    "Quel est votre besoin principal aujourd'hui ?": "https://hcxlesleujrfutixrqeu.supabase.co/storage/v1/object/public/son//besoin.mp3",
    "Êtes-vous disponible pour un rendez-vous demain ?": "https://hcxlesleujrfutixrqeu.supabase.co/storage/v1/object/public/son//rdv.mp3",
  };
let response = { text };

  if (text && preRecordedAudios[text]) {
    response.audio_url = preRecordedAudios[text];
  }

  console.log("Réponse envoyée à Vapi :", response);

  return res.status(200).json(response);
}
