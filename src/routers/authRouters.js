import { Router } from "express";

import { signIn, signUp } from "../controllers/authControllers.js";
import { signUpValidation } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/sign-up", signUpValidation, signUp);
router.post("sign-in", signIn);

export default router;
