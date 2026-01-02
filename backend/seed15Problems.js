import mongoose from "mongoose";
import Problem from "./src/models/Problem.js";

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
    title: "Reverse Integer",
    description: "Given a signed 32-bit integer x, return x with its digits reversed.",
    difficulty: "medium",
    category: "Math",
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    examples: [
      { input: "x = 123", output: "321" }
    ],
    testCases: [
      { input: "123", expectedOutput: "321", isHidden: false },
      { input: "-123", expectedOutput: "-321", isHidden: false },
      { input: "120", expectedOutput: "21", isHidden: true },
      { input: "1534236469", expectedOutput: "0", isHidden: true },
      { input: "-2147483648", expectedOutput: "0", isHidden: true }
    ],
    starterCode: {
      javascript: `function reverse(x) {\n    // Write your code here\n    \n}`,
      python: `def reverse(x):\n    # Write your code here\n    pass`,
      java: `public int reverse(int x) {\n    // Write your code here\n    \n}`
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
      { input: "x = 121", output: "true" }
    ],
    testCases: [
      { input: "121", expectedOutput: "true", isHidden: false },
      { input: "-121", expectedOutput: "false", isHidden: false },
      { input: "10", expectedOutput: "false", isHidden: true },
      { input: "0", expectedOutput: "true", isHidden: true },
      { input: "1221", expectedOutput: "true", isHidden: true }
    ],
    starterCode: {
      javascript: `function isPalindrome(x) {\n    // Write your solution here\n    \n}`,
      python: `def isPalindrome(x):\n    # Write your solution here\n    pass`,
      java: `public boolean isPalindrome(int x) {\n    // Write your solution here\n    \n}`
    },
    tags: ["Math"]
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
  },
  {
    title: "Merge Two Sorted Lists",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.",
    difficulty: "easy",
    category: "Linked List",
    constraints: ["The number of nodes in both lists is in the range [0, 50]."],
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" }
    ],
    testCases: [
      { input: "[1,2,4]\n[1,3,4]", expectedOutput: "[1,1,2,3,4,4]", isHidden: false },
      { input: "[]\n[]", expectedOutput: "[]", isHidden: false },
      { input: "[]\n[0]", expectedOutput: "[0]", isHidden: true },
      { input: "[1]\n[2]", expectedOutput: "[1,2]", isHidden: true },
      { input: "[1,3,5]\n[2,4,6]", expectedOutput: "[1,2,3,4,5,6]", isHidden: true }
    ],
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {\n    // Write your solution here\n    \n}`,
      python: `def mergeTwoLists(list1, list2):\n    # Write your solution here\n    pass`,
      java: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    // Write your solution here\n    \n}`
    },
    tags: ["Linked List", "Recursion"]
  },
  {
    title: "Remove Duplicates from Sorted Array",
    description: "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place.",
    difficulty: "easy",
    category: "Array",
    constraints: ["1 <= nums.length <= 3 * 10^4"],
    examples: [
      { input: "nums = [1,1,2]", output: "2" }
    ],
    testCases: [
      { input: "[1,1,2]", expectedOutput: "2", isHidden: false },
      { input: "[0,0,1,1,1,2,2,3,3,4]", expectedOutput: "5", isHidden: false },
      { input: "[1,2,3]", expectedOutput: "3", isHidden: true },
      { input: "[1,1,1,1]", expectedOutput: "1", isHidden: true },
      { input: "[1]", expectedOutput: "1", isHidden: true }
    ],
    starterCode: {
      javascript: `function removeDuplicates(nums) {\n    // Write your solution here\n    \n}`,
      python: `def removeDuplicates(nums):\n    # Write your solution here\n    pass`,
      java: `public int removeDuplicates(int[] nums) {\n    // Write your solution here\n    \n}`
    },
    tags: ["Array", "Two Pointers"]
  },
  {
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    difficulty: "medium",
    category: "Dynamic Programming",
    constraints: ["1 <= nums.length <= 10^5"],
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" }
    ],
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6", isHidden: false },
      { input: "[1]", expectedOutput: "1", isHidden: false },
      { input: "[5,4,-1,7,8]", expectedOutput: "23", isHidden: true },
      { input: "[-1]", expectedOutput: "-1", isHidden: true },
      { input: "[-2,-1]", expectedOutput: "-1", isHidden: true }
    ],
    starterCode: {
      javascript: `function maxSubArray(nums) {\n    // Write your solution here\n    \n}`,
      python: `def maxSubArray(nums):\n    # Write your solution here\n    pass`,
      java: `public int maxSubArray(int[] nums) {\n    // Write your solution here\n    \n}`
    },
    tags: ["Array", "Dynamic Programming"]
  },
  {
    title: "Climbing Stairs",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.",
    difficulty: "easy",
    category: "Dynamic Programming",
    constraints: ["1 <= n <= 45"],
    examples: [
      { input: "n = 2", output: "2" }
    ],
    testCases: [
      { input: "2", expectedOutput: "2", isHidden: false },
      { input: "3", expectedOutput: "3", isHidden: false },
      { input: "5", expectedOutput: "8", isHidden: true },
      { input: "1", expectedOutput: "1", isHidden: true },
      { input: "4", expectedOutput: "5", isHidden: true }
    ],
    starterCode: {
      javascript: `function climbStairs(n) {\n    // Write your solution here\n    \n}`,
      python: `def climbStairs(n):\n    # Write your solution here\n    pass`,
      java: `public int climbStairs(int n) {\n    // Write your solution here\n    \n}`
    },
    tags: ["Math", "Dynamic Programming"]
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day.",
    difficulty: "easy",
    category: "Array",
    constraints: ["1 <= prices.length <= 10^5"],
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5" }
    ],
    testCases: [
      { input: "[7,1,5,3,6,4]", expectedOutput: "5", isHidden: false },
      { input: "[7,6,4,3,1]", expectedOutput: "0", isHidden: false },
      { input: "[1,2,3,4,5]", expectedOutput: "4", isHidden: true },
      { input: "[2,4,1]", expectedOutput: "2", isHidden: true },
      { input: "[3,2,6,5,0,3]", expectedOutput: "4", isHidden: true }
    ],
    starterCode: {
      javascript: `function maxProfit(prices) {\n    // Write your solution here\n    \n}`,
      python: `def maxProfit(prices):\n    # Write your solution here\n    pass`,
      java: `public int maxProfit(int[] prices) {\n    // Write your solution here\n    \n}`
    },
    tags: ["Array", "Dynamic Programming"]
  },
  {
    title: "Valid Anagram",
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    difficulty: "easy",
    category: "Hash Table",
    constraints: ["1 <= s.length, t.length <= 5 * 10^4"],
    examples: [
      { input: "s = \"anagram\", t = \"nagaram\"", output: "true" }
    ],
    testCases: [
      { input: "anagram\nnagaram", expectedOutput: "true", isHidden: false },
      { input: "rat\ncar", expectedOutput: "false", isHidden: false },
      { input: "listen\nsilent", expectedOutput: "true", isHidden: true },
      { input: "hello\nbello", expectedOutput: "false", isHidden: true },
      { input: "a\nab", expectedOutput: "false", isHidden: true }
    ],
    starterCode: {
      javascript: `function isAnagram(s, t) {\n    // Write your solution here\n    \n}`,
      python: `def isAnagram(s, t):\n    # Write your solution here\n    pass`,
      java: `public boolean isAnagram(String s, String t) {\n    // Write your solution here\n    \n}`
    },
    tags: ["Hash Table", "String"]
  },
  {
    title: "Contains Duplicate",
    description: "Given an integer array nums, return true if any value appears at least twice in the array.",
    difficulty: "easy",
    category: "Array",
    constraints: ["1 <= nums.length <= 10^5"],
    examples: [
      { input: "nums = [1,2,3,1]", output: "true" }
    ],
    testCases: [
      { input: "[1,2,3,1]", expectedOutput: "true", isHidden: false },
      { input: "[1,2,3,4]", expectedOutput: "false", isHidden: false },
      { input: "[1,1,1,3,3,4,3,2,4,2]", expectedOutput: "true", isHidden: true },
      { input: "[1]", expectedOutput: "false", isHidden: true },
      { input: "[0,0]", expectedOutput: "true", isHidden: true }
    ],
    starterCode: {
      javascript: `function containsDuplicate(nums) {\n    // Write your solution here\n    \n}`,
      python: `def containsDuplicate(nums):\n    # Write your solution here\n    pass`,
      java: `public boolean containsDuplicate(int[] nums) {\n    // Write your solution here\n    \n}`
    },
    tags: ["Array", "Hash Table"]
  },
  {
    title: "Missing Number",
    description: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
    difficulty: "easy",
    category: "Array",
    constraints: ["n == nums.length", "1 <= n <= 10^4"],
    examples: [
      { input: "nums = [3,0,1]", output: "2" }
    ],
    testCases: [
      { input: "[3,0,1]", expectedOutput: "2", isHidden: false },
      { input: "[0,1]", expectedOutput: "2", isHidden: false },
      { input: "[9,6,4,2,3,5,7,0,1]", expectedOutput: "8", isHidden: true },
      { input: "[0]", expectedOutput: "1", isHidden: true },
      { input: "[1]", expectedOutput: "0", isHidden: true }
    ],
    starterCode: {
      javascript: `function missingNumber(nums) {\n    // Write your solution here\n    \n}`,
      python: `def missingNumber(nums):\n    # Write your solution here\n    pass`,
      java: `public int missingNumber(int[] nums) {\n    // Write your solution here\n    \n}`
    },
    tags: ["Array", "Math"]
  },
  {
    title: "Single Number",
    description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
    difficulty: "easy",
    category: "Bit Manipulation",
    constraints: ["1 <= nums.length <= 3 * 10^4"],
    examples: [
      { input: "nums = [2,2,1]", output: "1" }
    ],
    testCases: [
      { input: "[2,2,1]", expectedOutput: "1", isHidden: false },
      { input: "[4,1,2,1,2]", expectedOutput: "4", isHidden: false },
      { input: "[1]", expectedOutput: "1", isHidden: true },
      { input: "[7,3,7]", expectedOutput: "3", isHidden: true },
      { input: "[0,1,0]", expectedOutput: "1", isHidden: true }
    ],
    starterCode: {
      javascript: `function singleNumber(nums) {\n    // Write your solution here\n    \n}`,
      python: `def singleNumber(nums):\n    # Write your solution here\n    pass`,
      java: `public int singleNumber(int[] nums) {\n    // Write your solution here\n    \n}`
    },
    tags: ["Array", "Bit Manipulation"]
  },
  {
    title: "Move Zeroes",
    description: "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.",
    difficulty: "easy",
    category: "Array",
    constraints: ["1 <= nums.length <= 10^4"],
    examples: [
      { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]" }
    ],
    testCases: [
      { input: "[0,1,0,3,12]", expectedOutput: "[1,3,12,0,0]", isHidden: false },
      { input: "[0]", expectedOutput: "[0]", isHidden: false },
      { input: "[1,2,3]", expectedOutput: "[1,2,3]", isHidden: true },
      { input: "[0,0,1]", expectedOutput: "[1,0,0]", isHidden: true },
      { input: "[1,0,2,0,3]", expectedOutput: "[1,2,3,0,0]", isHidden: true }
    ],
    starterCode: {
      javascript: `function moveZeroes(nums) {\n    // Write your solution here\n    \n}`,
      python: `def moveZeroes(nums):\n    # Write your solution here\n    pass`,
      java: `public void moveZeroes(int[] nums) {\n    // Write your solution here\n    \n}`
    },
    tags: ["Array", "Two Pointers"]
  },
  {
    title: "Intersection of Two Arrays II",
    description: "Given two integer arrays nums1 and nums2, return an array of their intersection.",
    difficulty: "easy",
    category: "Array",
    constraints: ["1 <= nums1.length, nums2.length <= 1000"],
    examples: [
      { input: "nums1 = [1,2,2,1], nums2 = [2,2]", output: "[2,2]" }
    ],
    testCases: [
      { input: "[1,2,2,1]\n[2,2]", expectedOutput: "[2,2]", isHidden: false },
      { input: "[4,9,5]\n[9,4,9,8,4]", expectedOutput: "[4,9]", isHidden: false },
      { input: "[1,2,3]\n[4,5,6]", expectedOutput: "[]", isHidden: true },
      { input: "[1,1,2,2]\n[2,2]", expectedOutput: "[2,2]", isHidden: true },
      { input: "[3,1,2]\n[1,1]", expectedOutput: "[1]", isHidden: true }
    ],
    starterCode: {
      javascript: `function intersect(nums1, nums2) {\n    // Write your solution here\n    \n}`,
      python: `def intersect(nums1, nums2):\n    # Write your solution here\n    pass`,
      java: `public int[] intersect(int[] nums1, int[] nums2) {\n    // Write your solution here\n    \n}`
    },
    tags: ["Array", "Hash Table"]
  }
];

async function seedProblems() {
  try {
    await mongoose.connect("mongodb+srv://bhuvanesh3602:seceaids2024@cluster0.jiqgost.mongodb.net/talentiqDB");
    console.log("Connected to MongoDB Atlas");
    
    await Problem.deleteMany({});
    console.log("Cleared existing problems");
    
    await Problem.insertMany(problems);
    console.log("✅ 15 Problems seeded successfully!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding problems:", error);
    process.exit(1);
  }
}

seedProblems();