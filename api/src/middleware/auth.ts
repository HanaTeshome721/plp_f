import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/env";
import type { TokenPayload } from "../utils/jwt";

interface AuthRequest extends Request {
  userId?: string;
  roles?: string[];
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_ACCESS_SECRET as string) as unknown as JwtPayload & TokenPayload;
    req.userId = decoded.sub;
    req.roles = decoded.roles;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const roles = req.roles ?? [];
    const isAllowed = roles.some((role) => allowedRoles.includes(role));
    if (!isAllowed) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
