import { Router } from "express";

import { signIn, signUp } from "../controllers/authControllers.js";
import { signInValidation, signUpValidation } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/sign-up", signUpValidation, signUp);
router.post("/sign-in", signInValidation, signIn);

export default router;
