import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const authData = req.auth();
      const clerkId = authData?.userId;
      console.log("🔐 Auth check - Clerk ID:", clerkId);
      console.log("🔐 Full auth data:", authData);

      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

      // find user in db by clerk ID
      let user = await User.findOne({ clerkId });
      console.log("👤 Found user:", user ? user._id : "Not found");

      // If user doesn't exist, create them (fallback for webhook issues)
      if (!user) {
        console.log("🆕 Creating new user for Clerk ID:", clerkId);
        user = await User.create({
          clerkId,
          email: authData.sessionClaims?.email || `user_${clerkId}@example.com`,
          name: authData.sessionClaims?.name || `User ${clerkId.slice(-4)}`,
          profileImage: authData.sessionClaims?.image_url || "",
        });
        console.log("✅ New user created:", user._id);
      }

      // attach user to req
      req.user = user;

      next();
    } catch (error) {
      console.error("❌ Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
