import { Router } from "express";
import { addContact, getContactsByUser, updateContact, deleteContact } from "../controllers/contacts.controller";
import { isSignedIn } from "../middlewares/auth.middleware";

const router = Router();

router.post("/add-contact", isSignedIn as any, addContact);
router.get("/", isSignedIn as any, getContactsByUser);
router.put("/update-contact/:id", isSignedIn as any, updateContact);
router.delete("/delete-contact/:id", isSignedIn as any, deleteContact);

module.exports = router;