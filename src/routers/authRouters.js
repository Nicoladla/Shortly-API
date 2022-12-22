import { Router } from "express";

import { signIn, signUp } from "../controllers/authControllers.js";
import { signInValidation, signUpValidation } from "../middleware/authMiddleware.js";
import tokenValidation from "../middleware/tokenValidationMiddleware.js";

const router = Router();

router.post("/sign-up", signUpValidation, signUp);
router.post("/sign-in", signInValidation, signIn);

router.get("/token", tokenValidation)

export default router;
