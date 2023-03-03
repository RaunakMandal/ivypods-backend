"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContact = exports.getContactsByUser = exports.addContact = void 0;
const contacts_model_1 = __importDefault(require("../models/contacts.model"));
const addContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, phone, message } = req.body;
    if (!fullname || !phone) {
        return res.status(400).json({
            error: true,
            message: "All fields are required",
        });
    }
    const contact = new contacts_model_1.default({
        fullname,
        email,
        phone,
        message,
        owner: req.auth._id,
    });
    yield contact
        .save()
        .then((contact) => {
        return res.status(200).json({
            error: false,
            message: "Contact created successfully",
        });
    })
        .catch((err) => {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    });
});
exports.addContact = addContact;
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, phone, message } = req.body;
    yield contacts_model_1.default.findOneAndUpdate({ _id: req.params.id, owner: req.auth._id }, {
        fullname,
        email,
        phone,
        message,
    }, { new: true })
        .then((contact) => {
        if (!contact) {
            return res.status(404).json({
                error: true,
                message: "Contact not found or user not authorized",
            });
        }
        return res.status(200).json({
            error: false,
            message: "Contact updated successfully",
        });
    })
        .catch((err) => {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    });
});
exports.updateContact = updateContact;
const getContactsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.auth;
    const { per_page, page } = req.query;
    yield contacts_model_1.default.find({ owner: _id }).limit(per_page).skip(per_page * (page - 1))
        .then((contacts) => {
        return res.status(200).json({
            error: false,
            contacts,
        });
    })
        .catch((err) => {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    });
});
exports.getContactsByUser = getContactsByUser;
