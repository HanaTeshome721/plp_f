import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { IUser } from "../models/User";

export interface TokenPayload {
  sub: string;
  roles: string[];
}

export const signAccessToken = (user: IUser) => {
  const payload: TokenPayload = {
    sub: user.id,
    roles: user.roles,
  };

  return jwt.sign(payload, ENV.JWT_ACCESS_SECRET, { expiresIn: "15m" });
};

export const signRefreshToken = (user: IUser) => {
  const payload: TokenPayload = {
    sub: user.id,
    roles: user.roles,
  };

  return jwt.sign(payload, ENV.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ENV.JWT_ACCESS_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, ENV.JWT_REFRESH_SECRET) as TokenPayload;
};
