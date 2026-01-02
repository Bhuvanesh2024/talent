import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import { chatClient } from "./lib/stream.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import problemRoutes from "./routes/problemRoutes.js";

const app = express();

const __dirname = path.resolve();

// middleware
app.use(express.json());
// credentials:true meaning?? => server allows a browser to include cookies on request
app.use(cors({ 
  origin: true, 
  credentials: true 
}));
app.use(clerkMiddleware()); // this adds auth field to request object: req.auth()

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/problems", problemRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

app.get("/test-db", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const dbStats = await mongoose.connection.db.stats();
    res.status(200).json({ 
      message: "Database connection successful",
      collections: collections.map(c => c.name),
      dbName: mongoose.connection.name,
      dbStats: {
        collections: dbStats.collections,
        objects: dbStats.objects,
        dataSize: dbStats.dataSize
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Database connection failed", 
      error: error.message 
    });
  }
});

app.get("/test-stream", async (req, res) => {
  try {
    // Test Stream API connectivity
    const testUser = {
      id: 'test-user-' + Date.now(),
      name: 'Test User',
      image: ''
    };
    
    await chatClient.upsertUser(testUser);
    const token = chatClient.createToken(testUser.id);
    
    // Clean up test user
    await chatClient.deleteUser(testUser.id);
    
    res.status(200).json({ 
      message: "Stream API connection successful",
      apiKey: ENV.STREAM_API_KEY,
      tokenGenerated: !!token
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Stream API connection failed", 
      error: error.message 
    });
  }
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();
