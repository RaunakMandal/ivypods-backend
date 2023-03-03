"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacts_controller_1 = require("../controllers/contacts.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/add-contact", auth_middleware_1.isSignedIn, contacts_controller_1.addContact);
router.get("/get-contacts", auth_middleware_1.isSignedIn, contacts_controller_1.getContactsByUser);
router.put("/update-contact/:id", auth_middleware_1.isSignedIn, contacts_controller_1.updateContact);
module.exports = router;
