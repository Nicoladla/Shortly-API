import { Router } from "express";

import { signIn, signUp } from "../controllers/authControllers.js";
import { signInValidation, signUpValidation } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", signUpValidation, signUp);
router.post("/signin", signInValidation, signIn);

export default router;
