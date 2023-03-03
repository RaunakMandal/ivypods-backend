import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT as string;

app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/user.routes");
const contactRoutes = require("./routes/contacts.routes");
    
app.use('/api/user', userRoutes);
app.use('/api/contacts', contactRoutes);

mongoose
  .connect(process.env.MONGODB_URL as string, {
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
