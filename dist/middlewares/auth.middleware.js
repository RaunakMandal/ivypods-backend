"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSignedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isSignedIn = (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];
    const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    req.auth = user;
    console.log(req.auth);
    next();
};
exports.isSignedIn = isSignedIn;
