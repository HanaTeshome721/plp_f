import { Schema, model, Document } from "mongoose";

export type UserRole = "learner" | "mentor" | "admin";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  headline?: string;
  roles: UserRole[];
  skills: string[];
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    headline: String,
    roles: {
      type: [String],
      enum: ["learner", "mentor", "admin"],
      default: ["learner"],
    },
    skills: {
      type: [String],
      default: [],
    },
    bio: String,
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
