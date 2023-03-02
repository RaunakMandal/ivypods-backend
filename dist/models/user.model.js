"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const userSchema = new mongoose_1.default.Schema({
    fullname: {
        type: String,
        required: true,
        length: 50
    },
    username: {
        type: String,
        required: true,
        length: 14,
        unique: true
    },
    email: {
        type: String,
        required: true,
        length: 50,
        unique: true
    },
    strong_password: {
        type: String,
        required: true,
    },
    salt: String
}, {
    timestamps: true
});
userSchema.virtual('password')
    .set(function (password) {
    this._password = password;
    this.salt = crypto_1.default.randomUUID();
    this.strong_password = this.encryptPassword(password);
})
    .get(function () {
    return this._password;
});
userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.strong_password;
    },
    encryptPassword: function (password) {
        if (!password)
            return '';
        try {
            return crypto_1.default
                .createHmac("sha256", this.salt)
                .update(password)
                .digest("hex");
        }
        catch (err) {
            return "";
        }
    },
};
exports.default = mongoose_1.default.model('User', userSchema); // Exporting the model
