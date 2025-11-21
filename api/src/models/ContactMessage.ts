import { Schema, model, Document } from "mongoose";

export type ContactStatus = "new" | "acknowledged";

export interface IContactMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: Date;
  updatedAt: Date;
}

const contactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "acknowledged"], default: "new" },
  },
  { timestamps: true }
);

export const ContactMessage = model<IContactMessage>("ContactMessage", contactMessageSchema);
