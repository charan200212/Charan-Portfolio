// pages/api/recaptcha.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { token } = req.body;
  const secret_key = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`
    );
    
    if (response.data.success) {
      return res.status(200).json({ success: true, message: "Captcha verified!" });
    } else {
      return res.status(400).json({ success: false, error: "Captcha failed!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server error!" });
  }
}