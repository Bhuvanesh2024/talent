import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const userId = req.user.clerkId;
    const userName = req.user.name;
    const userImage = req.user.profileImage;

    console.log("🎥 Generating Stream token for:", { userId, userName, userImage });

    // Create/update user in Stream
    await chatClient.upsertUser({
      id: userId,
      name: userName,
      image: userImage,
    });

    // Generate token for both video and chat
    const token = chatClient.createToken(userId);

    console.log("✅ Stream token generated successfully");

    res.status(200).json({
      token,
      userId,
      userName,
      userImage,
    });
  } catch (error) {
    console.log("❌ Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
