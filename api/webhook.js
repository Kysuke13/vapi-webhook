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

  // 📦 Log complet et brut de ce que Vapi t'envoie
  console.log("📦 Contenu brut du message :", JSON.stringify(message, null, 2));

  return res.status(200).json({ text: '' }); // on ne joue rien, juste observer
}
