import { Request, Response } from "express";
import { ContactMessage } from "../models/ContactMessage";

export const submitContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body ?? {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const entry = await ContactMessage.create({ name, email, subject, message });

    res.status(201).json({ message: "Message received", contactId: entry.id });
  } catch (error: any) {
    res.status(500).json({ message: error.message ?? "Unable to submit message" });
  }
};
