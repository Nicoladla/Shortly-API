import { Router } from "express";

import tokenValidation from "../middleware/tokenValidationMiddleware.js";
import { shortUrlValidation } from "../middleware/shortUrlMiddleware.js";
import { urlIdGet, urlOpenGet, urlPost } from "../controllers/shortUrlControllers.js";

const router = Router();

router.post("/urls/shorten", tokenValidation, shortUrlValidation, urlPost);
router.get("/urls/:id", urlIdGet);
router.get("/urls/open/:shortUrl", urlOpenGet);

export default router;
