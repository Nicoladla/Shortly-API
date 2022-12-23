import { Router } from "express";
import tokenValidation from "../middleware/tokenValidationMiddleware.js";
import { MyshortUrlsGet, rankingGet } from "../controllers/listShortUrlsControllers.js";

const router = Router();

router.get("/users/me", tokenValidation, MyshortUrlsGet);
router.get("/ranking", rankingGet);

export default router;