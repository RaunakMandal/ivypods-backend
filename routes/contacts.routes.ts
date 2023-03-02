import { Router } from "express";
import { isSignedIn } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", isSignedIn);

module.exports = router;