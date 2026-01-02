import { useState } from "react";
import { useNavigate } from "react-router";
import { PlusIcon, TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

function CreateProblemPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [problem, setProblem] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    category: "Algorithm",
    constraints: [""],
    examples: [{ input: "", output: "", explanation: "" }],
    testCases: [{ input: "", expectedOutput: "", isHidden: false }],
    starterCode: {
      javascript: "",
      python: "",
      java: ""
    },
    tags: [""]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/problems`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await window.Clerk?.session?.getToken()}`
        },
        body: JSON.stringify({
          ...problem,
          constraints: problem.constraints.filter(c => c.trim()),
          tags: problem.tags.filter(t => t.trim()),
          examples: problem.examples.filter(e => e.input && e.output),
          testCases: problem.testCases.filter(t => t.input && t.expectedOutput)
        })
      });

      if (response.ok) {
        toast.success("Problem created successfully!");
        navigate("/dashboard");
      } else {
        throw new Error('Failed to create problem');
      }
    } catch (error) {
      toast.error("Failed to create problem");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addExample = () => {
    setProblem(prev => ({
      ...prev,
      examples: [...prev.examples, { input: "", output: "", explanation: "" }]
    }));
  };

  const removeExample = (index) => {
    setProblem(prev => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== index)
    }));
  };

  const addTestCase = () => {
    setProblem(prev => ({
      ...prev,
      testCases: [...prev.testCases, { input: "", expectedOutput: "", isHidden: false }]
    }));
  };

  const removeTestCase = (index) => {
    setProblem(prev => ({
      ...prev,
      testCases: prev.testCases.filter((_, i) => i !== index)
    }));
  };

  const addConstraint = () => {
    setProblem(prev => ({
      ...prev,
      constraints: [...prev.constraints, ""]
    }));
  };

  const addTag = () => {
    setProblem(prev => ({
      ...prev,
      tags: [...prev.tags, ""]
    }));
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-3xl mb-6">Create New Problem</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Title *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={problem.title}
                    onChange={(e) => setProblem(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Difficulty *</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={problem.difficulty}
                    onChange={(e) => setProblem(prev => ({ ...prev, difficulty: e.target.value }))}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Description *</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-32"
                  value={problem.description}
                  onChange={(e) => setProblem(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              {/* Examples */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="label-text font-semibold">Examples</label>
                  <button type="button" onClick={addExample} className="btn btn-sm btn-primary gap-1">
                    <PlusIcon className="w-4 h-4" />
                    Add Example
                  </button>
                </div>
                
                {problem.examples.map((example, index) => (
                  <div key={index} className="border border-base-300 rounded-lg p-4 mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Example {index + 1}</span>
                      {problem.examples.length > 1 && (
                        <button type="button" onClick={() => removeExample(index)} className="btn btn-sm btn-error">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="label-text text-sm">Input</label>
                        <input
                          type="text"
                          className="input input-bordered input-sm w-full"
                          value={example.input}
                          onChange={(e) => {
                            const newExamples = [...problem.examples];
                            newExamples[index].input = e.target.value;
                            setProblem(prev => ({ ...prev, examples: newExamples }));
                          }}
                        />
                      </div>
                      
                      <div>
                        <label className="label-text text-sm">Output</label>
                        <input
                          type="text"
                          className="input input-bordered input-sm w-full"
                          value={example.output}
                          onChange={(e) => {
                            const newExamples = [...problem.examples];
                            newExamples[index].output = e.target.value;
                            setProblem(prev => ({ ...prev, examples: newExamples }));
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <label className="label-text text-sm">Explanation (Optional)</label>
                      <input
                        type="text"
                        className="input input-bordered input-sm w-full"
                        value={example.explanation}
                        onChange={(e) => {
                          const newExamples = [...problem.examples];
                          newExamples[index].explanation = e.target.value;
                          setProblem(prev => ({ ...prev, examples: newExamples }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Test Cases */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="label-text font-semibold">Test Cases</label>
                  <button type="button" onClick={addTestCase} className="btn btn-sm btn-primary gap-1">
                    <PlusIcon className="w-4 h-4" />
                    Add Test Case
                  </button>
                </div>
                
                {problem.testCases.map((testCase, index) => (
                  <div key={index} className="border border-base-300 rounded-lg p-4 mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Test Case {index + 1}</span>
                      <div className="flex items-center gap-2">
                        <label className="label cursor-pointer gap-2">
                          <span className="label-text text-sm">Hidden</span>
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={testCase.isHidden}
                            onChange={(e) => {
                              const newTestCases = [...problem.testCases];
                              newTestCases[index].isHidden = e.target.checked;
                              setProblem(prev => ({ ...prev, testCases: newTestCases }));
                            }}
                          />
                        </label>
                        {problem.testCases.length > 1 && (
                          <button type="button" onClick={() => removeTestCase(index)} className="btn btn-sm btn-error">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="label-text text-sm">Input</label>
                        <textarea
                          className="textarea textarea-bordered textarea-sm w-full"
                          value={testCase.input}
                          onChange={(e) => {
                            const newTestCases = [...problem.testCases];
                            newTestCases[index].input = e.target.value;
                            setProblem(prev => ({ ...prev, testCases: newTestCases }));
                          }}
                        />
                      </div>
                      
                      <div>
                        <label className="label-text text-sm">Expected Output</label>
                        <textarea
                          className="textarea textarea-bordered textarea-sm w-full"
                          value={testCase.expectedOutput}
                          onChange={(e) => {
                            const newTestCases = [...problem.testCases];
                            newTestCases[index].expectedOutput = e.target.value;
                            setProblem(prev => ({ ...prev, testCases: newTestCases }));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Starter Code */}
              <div>
                <label className="label-text font-semibold mb-3 block">Starter Code</label>
                
                <div className="tabs tabs-bordered mb-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="label-text text-sm">JavaScript</label>
                      <textarea
                        className="textarea textarea-bordered w-full h-24 font-mono text-sm"
                        value={problem.starterCode.javascript}
                        onChange={(e) => setProblem(prev => ({
                          ...prev,
                          starterCode: { ...prev.starterCode, javascript: e.target.value }
                        }))}
                        placeholder="function solution() {&#10;    // Write your code here&#10;}"
                      />
                    </div>
                    
                    <div>
                      <label className="label-text text-sm">Python</label>
                      <textarea
                        className="textarea textarea-bordered w-full h-24 font-mono text-sm"
                        value={problem.starterCode.python}
                        onChange={(e) => setProblem(prev => ({
                          ...prev,
                          starterCode: { ...prev.starterCode, python: e.target.value }
                        }))}
                        placeholder="def solution():&#10;    # Write your code here&#10;    pass"
                      />
                    </div>
                    
                    <div>
                      <label className="label-text text-sm">Java</label>
                      <textarea
                        className="textarea textarea-bordered w-full h-24 font-mono text-sm"
                        value={problem.starterCode.java}
                        onChange={(e) => setProblem(prev => ({
                          ...prev,
                          starterCode: { ...prev.starterCode, java: e.target.value }
                        }))}
                        placeholder="public void solution() {&#10;    // Write your code here&#10;}"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? "Creating..." : "Create Problem"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProblemPage;