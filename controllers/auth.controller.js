import { validationResult } from "express-validator";

export const login = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  res.json({ ok: req.body });
};

export const register = (req, res) => {
  res.json({ ok: true });
};
