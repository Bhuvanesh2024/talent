import mongoose from "mongoose";
import Problem from "./src/models/Problem.js";

const problems = [
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    difficulty: "easy",
    category: "Array",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      }
    ],
    testCases: [
      { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]", isHidden: false },
      { input: "[3,2,4]\n6", expectedOutput: "[1,2]", isHidden: false },
      { input: "[3,3]\n6", expectedOutput: "[0,1]", isHidden: true },
      { input: "[1,2,3,4,5]\n8", expectedOutput: "[2,4]", isHidden: true },
      { input: "[-1,-2,-3,-4,-5]\n-8", expectedOutput: "[2,4]", isHidden: true }
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
    // Write your solution here
    
}`,
      python: `def twoSum(nums, target):
    # Write your solution here
    pass`,
      java: `public int[] twoSum(int[] nums, int target) {
    // Write your solution here
    
}`
    },
    tags: ["Array", "Hash Table"]
  },
  {
    title: "Reverse Integer",
    description: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
    difficulty: "medium",
    category: "Math",
    constraints: [
      "-2^31 <= x <= 2^31 - 1"
    ],
    examples: [
      {
        input: "x = 123",
        output: "321"
      },
      {
        input: "x = -123",
        output: "-321"
      },
      {
        input: "x = 120",
        output: "21"
      }
    ],
    testCases: [
      { input: "123", expectedOutput: "321", isHidden: false },
      { input: "-123", expectedOutput: "-321", isHidden: false },
      { input: "120", expectedOutput: "21", isHidden: false },
      { input: "1534236469", expectedOutput: "0", isHidden: true },
      { input: "-2147483648", expectedOutput: "0", isHidden: true }
    ],
    starterCode: {
      javascript: `function reverse(x) {
    // Write your code here
    
}`,
      python: `def reverse(x):
    # Write your code here
    pass`,
      java: `public int reverse(int x) {
    // Write your code here
    
}`
    },
    tags: ["Math"]
  }
];

async function seedProblems() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Interview");
    console.log("Connected to MongoDB");
    
    // Clear existing problems
    await Problem.deleteMany({});
    console.log("Cleared existing problems");
    
    // Insert new problems
    await Problem.insertMany(problems);
    console.log("✅ Problems seeded successfully!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding problems:", error);
    process.exit(1);
  }
}

seedProblems();