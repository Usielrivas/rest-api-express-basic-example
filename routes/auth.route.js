import { login, register } from "../controllers/auth.controller.js";
import { Router } from "express";
import {
  validatorLogin,
  validatorRegister,
} from "../middlewares/validatorManager.js";

const router = Router();

router.post("/login", validatorLogin, login);
router.post("/register", validatorRegister, register);

export default router;
