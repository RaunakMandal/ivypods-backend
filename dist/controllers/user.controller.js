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
exports.signout = exports.signin = exports.signup = exports.userExists = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userExists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({
            error: true,
            message: "Username is required",
        });
    }
    yield user_model_1.default.findOne({ username: username })
        .then((user) => {
        if (user) {
            return res.status(409).json({
                error: true,
                message: `User with username ${username} already exists`,
            });
        }
        else {
            return res.status(200).json({
                error: false,
                message: "User does not exist",
            });
        }
    })
        .catch((err) => {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    });
});
exports.userExists = userExists;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, username, email, password } = req.body;
    if (!fullname || !username || !email || !password) {
        return res.status(400).json({
            error: true,
            message: "All fields are required",
        });
    }
    const user = new user_model_1.default({
        fullname,
        username,
        email,
        password,
    });
    yield user
        .save()
        .then((user) => {
        console.log(user);
        return res.status(200).json({
            error: false,
            message: "User created successfully",
        });
    })
        .catch((err) => {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    });
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            error: true,
            message: "All fields are required",
        });
    }
    yield user_model_1.default.findOne({ username: username })
        .then((user) => {
        if (!user) {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: true,
                message: "Username and password do not match",
            });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, { expires: new Date() });
        return res.json({
            error: false,
            token,
            user: {
                username: user.username, fullname: user.fullname, email: user.email
            }
        });
    })
        .catch((err) => {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    });
});
exports.signin = signin;
const signout = (req, res) => {
    res.clearCookie("token");
    return res.json({
        error: false,
        message: "User signed out successfully"
    });
};
exports.signout = signout;
