"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(express_1.default.json());
const userRoutes = require("./routes/user.routes");
const contactRoutes = require("./routes/contacts.routes");
app.use('/api/user', userRoutes);
app.use('/api/contacts', contactRoutes);
mongoose_1.default
    .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("👋 MongoDB is connected");
})
    .catch((err) => {
    console.log(err);
});
app.listen(port, () => {
    console.log(`👋 Server is running on port ${port}`);
});
