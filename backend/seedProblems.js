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
  },
  {
    title: "Palindrome Number",
    description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
    difficulty: "easy",
    category: "Math",
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    examples: [
      { input: "x = 121", output: "true", explanation: "121 reads as 121 from left to right and from right to left." },
      { input: "x = -121", output: "false", explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome." }
    ],
    testCases: [
      { input: "121", expectedOutput: "true", isHidden: false },
      { input: "-121", expectedOutput: "false", isHidden: false },
      { input: "10", expectedOutput: "false", isHidden: true }
    ],
    starterCode: {
      javascript: `function isPalindrome(x) {
    // Write your solution here
    
}`,
      python: `def isPalindrome(x):
    # Write your solution here
    pass`,
      java: `public boolean isPalindrome(int x) {
    // Write your solution here
    
}`
    },
    tags: ["Math"]
  },
  {
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "easy",
    category: "Stack",
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
    examples: [
      { input: "s = \"()\"", output: "true" },
      { input: "s = \"()[]{}\"", output: "true" },
      { input: "s = \"(]\"", output: "false" }
    ],
    testCases: [
      { input: "()", expectedOutput: "true", isHidden: false },
      { input: "()[]{}", expectedOutput: "true", isHidden: false },
      { input: "(]", expectedOutput: "false", isHidden: true }
    ],
    starterCode: {
      javascript: `function isValid(s) {
    // Write your solution here
    
}`,
      python: `def isValid(s):
    # Write your solution here
    pass`,
      java: `public boolean isValid(String s) {
    // Write your solution here
    
}`
    },
    tags: ["String", "Stack"]
  },
  {
    title: "Merge Two Sorted Lists",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.",
    difficulty: "easy",
    category: "Linked List",
    constraints: ["The number of nodes in both lists is in the range [0, 50].", "-100 <= Node.val <= 100"],
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" }
    ],
    testCases: [
      { input: "[1,2,4]\n[1,3,4]", expectedOutput: "[1,1,2,3,4,4]", isHidden: false }
    ],
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {
    // Write your solution here
    
}`,
      python: `def mergeTwoLists(list1, list2):
    # Write your solution here
    pass`,
      java: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    // Write your solution here
    
}`
    },
    tags: ["Linked List", "Recursion"]
  },
  {
    title: "Remove Duplicates from Sorted Array",
    description: "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once.",
    difficulty: "easy",
    category: "Array",
    constraints: ["1 <= nums.length <= 3 * 10^4", "-100 <= nums[i] <= 100"],
    examples: [
      { input: "nums = [1,1,2]", output: "2, nums = [1,2,_]" }
    ],
    testCases: [
      { input: "[1,1,2]", expectedOutput: "2", isHidden: false },
      { input: "[0,0,1,1,1,2,2,3,3,4]", expectedOutput: "5", isHidden: false }
    ],
    starterCode: {
      javascript: `function removeDuplicates(nums) {
    // Write your solution here
    
}`,
      python: `def removeDuplicates(nums):
    # Write your solution here
    pass`,
      java: `public int removeDuplicates(int[] nums) {
    // Write your solution here
    
}`
    },
    tags: ["Array", "Two Pointers"]
  },
  {
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    difficulty: "medium",
    category: "Dynamic Programming",
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." }
    ],
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6", isHidden: false },
      { input: "[1]", expectedOutput: "1", isHidden: false },
      { input: "[5,4,-1,7,8]", expectedOutput: "23", isHidden: true }
    ],
    starterCode: {
      javascript: `function maxSubArray(nums) {
    // Write your solution here
    
}`,
      python: `def maxSubArray(nums):
    # Write your solution here
    pass`,
      java: `public int maxSubArray(int[] nums) {
    // Write your solution here
    
}`
    },
    tags: ["Array", "Dynamic Programming"]
  },
  {
    title: "Climbing Stairs",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    difficulty: "easy",
    category: "Dynamic Programming",
    constraints: ["1 <= n <= 45"],
    examples: [
      { input: "n = 2", output: "2", explanation: "There are two ways to climb to the top: 1+1 or 2." },
      { input: "n = 3", output: "3", explanation: "There are three ways: 1+1+1, 1+2, or 2+1." }
    ],
    testCases: [
      { input: "2", expectedOutput: "2", isHidden: false },
      { input: "3", expectedOutput: "3", isHidden: false },
      { input: "5", expectedOutput: "8", isHidden: true }
    ],
    starterCode: {
      javascript: `function climbStairs(n) {
    // Write your solution here
    
}`,
      python: `def climbStairs(n):
    # Write your solution here
    pass`,
      java: `public int climbStairs(int n) {
    // Write your solution here
    
}`
    },
    tags: ["Math", "Dynamic Programming"]
  },
  {
    title: "Binary Tree Inorder Traversal",
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    difficulty: "easy",
    category: "Tree",
    constraints: ["The number of nodes in the tree is in the range [0, 100].", "-100 <= Node.val <= 100"],
    examples: [
      { input: "root = [1,null,2,3]", output: "[1,3,2]" }
    ],
    testCases: [
      { input: "[1,null,2,3]", expectedOutput: "[1,3,2]", isHidden: false },
      { input: "[]", expectedOutput: "[]", isHidden: false }
    ],
    starterCode: {
      javascript: `function inorderTraversal(root) {
    // Write your solution here
    
}`,
      python: `def inorderTraversal(root):
    # Write your solution here
    pass`,
      java: `public List<Integer> inorderTraversal(TreeNode root) {
    // Write your solution here
    
}`
    },
    tags: ["Stack", "Tree", "DFS"]
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
    difficulty: "easy",
    category: "Array",
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." }
    ],
    testCases: [
      { input: "[7,1,5,3,6,4]", expectedOutput: "5", isHidden: false },
      { input: "[7,6,4,3,1]", expectedOutput: "0", isHidden: false }
    ],
    starterCode: {
      javascript: `function maxProfit(prices) {
    // Write your solution here
    
}`,
      python: `def maxProfit(prices):
    # Write your solution here
    pass`,
      java: `public int maxProfit(int[] prices) {
    // Write your solution here
    
}`
    },
    tags: ["Array", "Dynamic Programming"]
  }
];

async function seedProblems() {
  try {
    await mongoose.connect("mongodb+srv://bhuvanesh3602:seceaids2024@cluster0.jiqgost.mongodb.net/talentiqDB");
    console.log("Connected to MongoDB Atlas");
    
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