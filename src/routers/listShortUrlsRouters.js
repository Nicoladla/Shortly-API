import { Router } from "express";
import tokenValidation from "../middleware/tokenValidationMiddleware.js";
import { MyshortUrlsGet } from "../controllers/listShortUrlsControllers.js";

const router = Router();

router.get("/users/me", tokenValidation, MyshortUrlsGet);

export default router;