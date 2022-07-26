import axios from "axios";
import { body,param } from "express-validator";
import { validationAuth } from "./validationAuth.js";

export const validatorRegister = [
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
  validationAuth,
];

export const validatorLogin = [
  body("email", "email incorrect").trim().isEmail().normalizeEmail(),
  body("password", "format password incorrect").trim().isLength({ min: 6 }),

  validationAuth,
];

export const validatorLink = [
  body("longLink", "format link incorrect")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        await axios.get(value);
        return value;
      } catch (error) {
        console.error(error);
        throw new Error("not found");
      }
    }),
  validationAuth,
];

export const validatorParams= [
    param("id","id formato no valido").trim().notEmpty().escape(),
    validationAuth
]

























