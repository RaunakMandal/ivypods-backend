"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSignedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isSignedIn = (req, res, next) => {
    var _a, _b;
    const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized access to resource",
        });
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.auth = user;
        next();
    }
    catch (err) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized access to resource",
        });
    }
};
exports.isSignedIn = isSignedIn;
