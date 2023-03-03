import { NextFunction } from "express";
import Jwt from "jsonwebtoken";

const isSignedIn = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized access to resource",
    });
  }

  try {
    const user = Jwt.verify(token, process.env.JWT_SECRET as string);
    req.auth = user;
    next();
  } catch (err) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized access to resource",
    });
  }
};

export { isSignedIn };
