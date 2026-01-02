import Problem from "../models/Problem.js";

export async function createProblem(req, res) {
  try {
    const problem = await Problem.create(req.body);
    res.status(201).json({ problem });
  } catch (error) {
    console.log("Error in createProblem controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllProblems(req, res) {
  try {
    const problems = await Problem.find({ isActive: true })
      .select("-testCases") // Hide test cases from public API
      .sort({ createdAt: -1 });
    
    res.status(200).json({ problems });
  } catch (error) {
    console.log("Error in getAllProblems controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getProblemById(req, res) {
  try {
    const { id } = req.params;
    const problem = await Problem.findById(id).select("-testCases");
    
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    
    res.status(200).json({ problem });
  } catch (error) {
    console.log("Error in getProblemById controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getProblemByTitle(req, res) {
  try {
    const { title } = req.params;
    const problem = await Problem.findOne({ title, isActive: true }).select("-testCases");
    
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    
    res.status(200).json({ problem });
  } catch (error) {
    console.log("Error in getProblemByTitle controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function runTestCases(req, res) {
  try {
    const { problemId, code, language } = req.body;
    
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Create test wrapper based on language
    let testCode = "";
    
    if (language === "javascript") {
      testCode = `${code}

// Test execution
const results = [];
const testCases = ${JSON.stringify(problem.testCases)};

for (let i = 0; i < testCases.length; i++) {
  try {
    const inputs = testCases[i].input.split('\\n');
    const nums = JSON.parse(inputs[0]);
    const target = parseInt(inputs[1]);
    const result = twoSum(nums, target);
    const expected = JSON.parse(testCases[i].expectedOutput);
    
    const passed = JSON.stringify(result.sort()) === JSON.stringify(expected.sort());
    results.push({ passed, input: testCases[i].input, expected: testCases[i].expectedOutput, actual: JSON.stringify(result) });
  } catch (error) {
    results.push({ passed: false, error: error.message });
  }
}

console.log(JSON.stringify({ results }));`;
    }
    
    // Execute the test code using your existing executeCode function
    const { executeCode } = await import("../lib/piston.js");
    const executionResult = await executeCode(language, testCode);
    
    if (executionResult.success) {
      try {
        const testResults = JSON.parse(executionResult.output.split('\n').find(line => line.includes('"results"')));
        const passed = testResults.results.filter(r => r.passed).length;
        const total = testResults.results.length;
        
        const results = {
          passed,
          total,
          details: `${passed}/${total} test cases passed`,
          success: passed === total
        };
        
        res.status(200).json({ results });
      } catch (parseError) {
        res.status(500).json({ message: "Error parsing test results" });
      }
    } else {
      res.status(400).json({ 
        results: {
          passed: 0,
          total: problem.testCases.length,
          details: "Code execution failed",
          success: false,
          error: executionResult.error
        }
      });
    }
  } catch (error) {
    console.log("Error in runTestCases controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}