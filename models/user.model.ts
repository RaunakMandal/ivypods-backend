import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
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
},
    {
        timestamps: true
    }
);

userSchema.virtual('password')
    .set(function (password: string) {
        this._password = password;
        this.salt = crypto.randomUUID();
        this.strong_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainText: string) {
        return this.encryptPassword(plainText) === this.strong_password;
    },
    encryptPassword: function (password: string) {
        if (!password) return '';
        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
};

export default mongoose.model('User', userSchema);  // Exporting the model