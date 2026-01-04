import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const clerkAuth = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      console.log(clerkId)
      if (!clerkId)
        return res
          .status(401)
          .json({ msg: "Unauthorized access / ClerkId not found" });
      const user = await User.findOne({ clerkId });
      if (!user) return res.status(404).json({ message: "User not found" });
      req.user = user;
      next();
    } catch {
      return res.status(500).json({ msg: "Internal server error" });
    }
  },
];
