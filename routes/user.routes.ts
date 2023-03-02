import { Router } from "express";

import { userExists, signup, signin, signout } from "../controllers/user.controller";

const router = Router();

router.post("/user-exists", userExists);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;