import { Router } from "express";
import authRoutes from "./auth.routes";
import contactRoutes from "./contact.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/contact", contactRoutes);
router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default router;
