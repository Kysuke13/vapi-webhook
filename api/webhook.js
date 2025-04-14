export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { text } = req.body;

  const preRecordedAudios = {
    "Bonjour, pouvez-vous confirmer votre nom ?": "https://tonserveur.com/audios/question1.mp3",
    "Quel est votre besoin principal aujourd'hui ?": "https://tonserveur.com/audios/question2.mp3",
  };

  let response = { text };

  if (preRecordedAudios[text]) {
    response.audio_url = preRecordedAudios[text];
  }

  return res.status(200).json(response);
}
