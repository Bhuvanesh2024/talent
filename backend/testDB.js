import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
  try {
    console.log("🔗 Testing MongoDB connection...");
    console.log("📍 DB_URL:", process.env.DB_URL?.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@"));
    
    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log("✅ MongoDB connection successful!");
    console.log("📊 Database:", mongoose.connection.name);
    console.log("🏠 Host:", mongoose.connection.host);
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📁 Collections:", collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log("👋 Disconnected from MongoDB");
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    console.error("🔍 Error details:", error);
    process.exit(1);
  }
}

testConnection();