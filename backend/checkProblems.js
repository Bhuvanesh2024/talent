import mongoose from "mongoose";
import Problem from "./src/models/Problem.js";
import dotenv from "dotenv";

dotenv.config();

async function checkProblems() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB Atlas");
    
    const problems = await Problem.find({});
    console.log(`📊 Total problems in database: ${problems.length}`);
    
    problems.forEach((problem, index) => {
      console.log(`${index + 1}. ${problem.title} (${problem.difficulty})`);
    });
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

checkProblems();