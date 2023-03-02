import { Request, Response } from "express";
import { Error } from "mongoose";
import User from "../models/user.model";
import Jwt from "jsonwebtoken";

const userExists = async (req: Request, res: Response) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({
      error: true,
      message: "Username is required",
    });
  }

  await User.findOne({ username: username })
    .then((user) => {
      if (user) {
        return res.status(409).json({
          error: true,
          message: `User with username ${username} already exists`,
        });
      } else {
        return res.status(200).json({
          error: false,
          message: "User does not exist",
        });
      }
    })
    .catch((err: Error) => {
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    });
};

const signup = async (req: Request, res: Response) => {
  const { fullname, username, email, password } = req.body;

  if (!fullname || !username || !email || !password) {
    return res.status(400).json({
      error: true,
      message: "All fields are required",
    });
  }

  const user = new User({
    fullname,
    username,
    email,
    password,
  });

  await user
    .save()
    .then((user) => {
      console.log(user);
      return res.status(200).json({
        error: false,
        message: "User created successfully",
      });
    })
    .catch((err: Error) => {
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    });
};

const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      error: true,
      message: "All fields are required",
    });
  }

  await User.findOne({ username: username })
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

      const token = Jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET);
      res.cookie("token", token, { expires: new Date() });
      return res.json({
        error: false,
        token,
      });
    })
    .catch((err: Error) => {
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    });
};

const signout = (req: Request, res: Response) => {
    res.clearCookie("token");
    return res.json({
        error: false,
        message: "User signed out successfully"
    });
};

export { userExists, signup, signin, signout };
