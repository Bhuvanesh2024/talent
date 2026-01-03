import Problem from "../models/Problem.js";

const problems = [
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "easy",
    category: "Array",
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." }
    ],
    testCases: [
      { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]", isHidden: false },
      { input: "[3,2,4]\n6", expectedOutput: "[1,2]", isHidden: false },
      { input: "[3,3]\n6", expectedOutput: "[0,1]", isHidden: true },
      { input: "[1,2,3,4,5]\n8", expectedOutput: "[2,4]", isHidden: true },
      { input: "[-1,-2,-3,-4,-5]\n-8", expectedOutput: "[2,4]", isHidden: true }
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n    // Write your solution here\n    \n}`,
      python: `def twoSum(nums, target):\n    # Write your solution here\n    pass`,
      java: `public int[] twoSum(int[] nums, int target) {\n    // Write your solution here\n    \n}`
    },
    tags: ["Array", "Hash Table"]
  },
  {
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "easy",
    category: "Stack",
    constraints: ["1 <= s.length <= 10^4"],
    examples: [
      { input: "s = \"()\"", output: "true" }
    ],
    testCases: [
      { input: "()", expectedOutput: "true", isHidden: false },
      { input: "()[]{}", expectedOutput: "true", isHidden: false },
      { input: "(]", expectedOutput: "false", isHidden: true },
      { input: "([)]", expectedOutput: "false", isHidden: true },
      { input: "{[]}", expectedOutput: "true", isHidden: true }
    ],
    starterCode: {
      javascript: `function isValid(s) {\n    // Write your solution here\n    \n}`,
      python: `def isValid(s):\n    # Write your solution here\n    pass`,
      java: `public boolean isValid(String s) {\n    // Write your solution here\n    \n}`
    },
    tags: ["String", "Stack"]
  }
];

export async function seedDatabase(req, res) {
  try {
    console.log("🌱 Starting database seeding...");
    
    await Problem.deleteMany({});
    console.log("🗑️ Cleared existing problems");
    
    await Problem.insertMany(problems);
    console.log("✅ Problems seeded successfully!");
    
    const count = await Problem.countDocuments();
    
    res.status(200).json({ 
      message: "Database seeded successfully!",
      problemsCount: count,
      problems: problems.map(p => ({ title: p.title, difficulty: p.difficulty }))
    });
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    res.status(500).json({ 
      message: "Failed to seed database", 
      error: error.message 
    });
  }
}