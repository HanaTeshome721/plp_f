import { Request, Response } from "express";
import { loginUser, registerUser, getProfile } from "../services/auth.service";

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await registerUser(req.body);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        user,
        accessToken,
      });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Registration failed" });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await loginUser(req.body);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        user,
        accessToken,
      });
  } catch (error: any) {
    res.status(401).json({ message: error.message || "Login failed" });
  }
};

export const profileHandler = async (req: Request, res: Response) => {
  try {
    const { userId } = req as Request & { userId?: string };
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const profile = await getProfile(userId);
    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Unable to load profile" });
  }
};
