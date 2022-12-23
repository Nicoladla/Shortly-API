import { Router } from "express";

import tokenValidation from "../middleware/tokenValidationMiddleware.js";
import {
  deleteShortUrlValidation,
  postShortUrlValidation,
} from "../middleware/shortUrlMiddleware.js";
import {
  urlDelete,
  urlIdGet,
  urlOpenGet,
  urlPost,
} from "../controllers/shortUrlControllers.js";

const router = Router();

router.post("/urls/shorten", tokenValidation, postShortUrlValidation, urlPost);
router.get("/urls/:id", urlIdGet);
router.get("/urls/open/:shortUrl", urlOpenGet);
router.delete(
  "/urls/:id",
  tokenValidation,
  deleteShortUrlValidation,
  urlDelete
);

export default router;
