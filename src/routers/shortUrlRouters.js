import { Router } from "express";

import tokenValidation from "../middleware/tokenValidationMiddleware.js";
import { urlPost } from "../controllers/shortUrlControllers.js";
import { shortUrlValidation } from "../middleware/shortUrlMiddleware.js";

const router = Router();

router.post("/urls/shorten", tokenValidation, shortUrlValidation, urlPost);

export default router;
