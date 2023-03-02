import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const userRoutes = require("./routes/user.routes");
const contactRoutes = require("./routes/contacts.routes");
app.use('/api/user', userRoutes);
app.use('/api/contacts', contactRoutes);

mongoose
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
