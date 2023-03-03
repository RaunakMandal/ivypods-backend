import { Router } from "express";
import { addContact, getContactsByUser, updateContact } from "../controllers/contacts.controller";
import { isSignedIn } from "../middlewares/auth.middleware";

const router = Router();

router.post("/add-contact", isSignedIn as any, addContact);
router.get("/get-contacts", isSignedIn as any, getContactsByUser);
router.put("/update-contact/:id", isSignedIn as any, updateContact);

module.exports = router;