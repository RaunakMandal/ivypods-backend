"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contactSchema = new mongoose_1.default.Schema({
    fullname: {
        type: String,
        required: true,
        length: 50
    },
    email: {
        type: String,
        length: 50,
    },
    phone: {
        type: String,
        required: true,
        length: 50,
    },
    message: {
        type: String,
        required: true,
        length: 500,
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
exports.default = mongoose_1.default.model('Contact', contactSchema); // Exporting the model
