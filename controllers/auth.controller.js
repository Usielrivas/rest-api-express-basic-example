import { User } from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    return res.json({ ok: req.body });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.json({ error: "user ya existe" });
    }
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "user not fount" });
    const success = await user.verifyPass(password);
    if (!success)
      return res.status(403).json({ error: "credenciales incorrect" });

    //Generar Token
    const { token, expiresIn } = generateToken(user._id);
    res.json({ token, expiresIn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 500 });
  }
};
