import { login, register } from "../controllers/auth.controller.js";
import express from "express";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/login",
  [
    body("email", "email incorrect").trim().isEmail().normalizeEmail(),
    body("password", "format password incorrect").trim().isLength({ min: 6 }),
  ],
  login
);
router.post(
  "/register",
  [
    body("email", "email incorrect").trim().isEmail().normalizeEmail(),
    body("password", "format password incorrect")
      .trim()
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error("Password no coinciden");
        }
        return value;
      }),
  ],
  register
);

export default router;
