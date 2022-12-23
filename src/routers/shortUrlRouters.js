import { Router } from "express";

import tokenValidation from "../middleware/tokenValidationMiddleware.js";
import { urlIdGet, urlPost } from "../controllers/shortUrlControllers.js";
import { shortUrlValidation } from "../middleware/shortUrlMiddleware.js";

const router = Router();

router.post("/urls/shorten", tokenValidation, shortUrlValidation, urlPost);
router.get("/urls/:id", urlIdGet)

export default router;
