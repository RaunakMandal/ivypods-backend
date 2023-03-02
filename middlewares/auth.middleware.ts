import { NextFunction } from "express";
import Jwt from "jsonwebtoken";

const isSignedIn = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"].split(" ")[1];
    const user = Jwt.verify(
        token,
        process.env.JWT_SECRET as string
    )
    req.auth = user;
    console.log(req.auth);
    next();
  };

export { isSignedIn };