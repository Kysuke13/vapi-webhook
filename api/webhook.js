export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { text } = req.body;

  const preRecordedAudios = {
    "Bonjour, pouvez-vous confirmer votre nom ?": "https://hcxlesleujrfutixrqeu.supabase.co/storage/v1/object/public/son//nom.mp3",
    "Quel est votre besoin principal aujourd'hui ?": "https://hcxlesleujrfutixrqeu.supabase.co/storage/v1/object/public/son//besoin.mp3",
    "Êtes-vous disponible pour un rendez-vous demain ?": "https://hcxlesleujrfutixrqeu.supabase.co/storage/v1/object/public/son//rdv.mp3",
  };

  let response = { text };

  if (preRecordedAudios[text]) {
    response.audio_url = preRecordedAudios[text];
  }
console.log("Phrase reçue de Vapi :", text);

  return res.status(200).json(response);
}
