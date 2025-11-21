import { User, IUser } from "../models/User";
import { comparePassword, hashPassword } from "../utils/password";
import { signAccessToken, signRefreshToken } from "../utils/jwt";

export const registerUser = async (data: {
  fullName: string;
  email: string;
  password: string;
  roles?: string[];
}) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) {
    throw new Error("Email already registered");
  }

  const hashed = await hashPassword(data.password);
  const user = await User.create({
    fullName: data.fullName,
    email: data.email,
    password: hashed,
    roles: data.roles ?? ["learner"],
  });

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  return { user, accessToken, refreshToken };
};

export const loginUser = async (data: { email: string; password: string }) => {
  const user = await User.findOne({ email: data.email }).select("+password roles fullName email");
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(data.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  return { user, accessToken, refreshToken };
};

export const getProfile = async (userId: string) => {
  return User.findById(userId).select("-password");
};
