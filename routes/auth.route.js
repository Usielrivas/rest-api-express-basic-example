import { login, register } from "../controllers/auth.controller.js";
import { Router } from "express";
import { body } from "express-validator";
import { validationAuth } from "../middlewares/validationAuth.js";

const router = Router();

router.post(
  "/login",
  [
    body("email", "email incorrect").trim().isEmail().normalizeEmail(),
    body("password", "format password incorrect").trim().isLength({ min: 6 }),
  ],
  validationAuth,
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
  validationAuth,
  register
);

export default router;
