import mongoose from "mongoose";
import Problem from "./src/models/Problem.js";
import dotenv from "dotenv";

dotenv.config();

const newProblem = {
  title: "Intersection of Two Arrays II",
  description: "Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.",
  difficulty: "easy",
  category: "Array",
  constraints: ["1 <= nums1.length, nums2.length <= 1000", "0 <= nums1[i], nums2[i] <= 1000"],
  examples: [
    { input: "nums1 = [1,2,2,1], nums2 = [2,2]", output: "[2,2]" },
    { input: "nums1 = [4,9,5], nums2 = [9,4,9,8,4]", output: "[4,9]" }
  ],
  testCases: [
    { input: "[1,2,2,1]\n[2,2]", expectedOutput: "[2,2]", isHidden: false },
    { input: "[4,9,5]\n[9,4,9,8,4]", expectedOutput: "[4,9]", isHidden: false },
    { input: "[1,2,3]\n[4,5,6]", expectedOutput: "[]", isHidden: true },
    { input: "[1,1,2,2]\n[2,2]", expectedOutput: "[2,2]", isHidden: true },
    { input: "[3,1,2]\n[1,1]", expectedOutput: "[1]", isHidden: true }
  ],
  starterCode: {
    javascript: `function intersect(nums1, nums2) {
    // Write your solution here
    
}`,
    python: `def intersect(nums1, nums2):
    # Write your solution here
    pass`,
    java: `public int[] intersect(int[] nums1, int[] nums2) {
    // Write your solution here
    
}`
  },
  tags: ["Array", "Hash Table"]
};

async function addMissingProblem() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB Atlas");
    
    await Problem.create(newProblem);
    console.log("✅ 15th problem added successfully!");
    
    const count = await Problem.countDocuments();
    console.log(`📊 Total problems now: ${count}`);
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

addMissingProblem();