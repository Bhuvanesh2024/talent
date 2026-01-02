import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { executeCode } from "../lib/piston";
import Navbar from "../components/Navbar";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Loader2Icon, ArrowLeftIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

function PracticePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  
  const [problemData, setProblemData] = useState(null);
  const [loadingProblem, setLoadingProblem] = useState(true);

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  // Fetch problem data
  useEffect(() => {
    const fetchProblem = async () => {
      if (!id) return;
      
      setLoadingProblem(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/problems/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProblemData(data.problem);
          setCode(data.problem.starterCode?.[selectedLanguage] || "");
        } else {
          toast.error("Problem not found");
          navigate("/problems");
        }
      } catch (error) {
        console.error("Error fetching problem:", error);
        toast.error("Failed to load problem");
      } finally {
        setLoadingProblem(false);
      }
    };

    fetchProblem();
  }, [id, navigate]);

  // Update code when language changes
  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData?.starterCode, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    const starterCode = problemData?.starterCode?.[newLang] || "";
    setCode(starterCode);
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    try {
      const result = await executeCode(selectedLanguage, code);
      setOutput(result);
    } catch (error) {
      console.error("Code execution failed:", error);
      setOutput({
        success: false,
        error: `Execution failed: ${error.message}`,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!problemData?._id) {
      toast.error("Problem not loaded");
      return;
    }

    setIsRunning(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/problems/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await window.Clerk?.session?.getToken()}`
        },
        body: JSON.stringify({
          problemId: problemData._id,
          code,
          language: selectedLanguage
        })
      });

      if (response.ok) {
        const data = await response.json();
        setOutput({
          success: data.results.success,
          output: data.results.details,
          testResults: data.results
        });
        
        if (data.results.success) {
          toast.success("All test cases passed! 🎉");
        } else {
          toast.error(`${data.results.passed}/${data.results.total} test cases passed`);
        }
      } else {
        throw new Error('Failed to submit code');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error("Failed to submit code");
      setOutput({
        success: false,
        error: "Failed to run test cases"
      });
    } finally {
      setIsRunning(false);
    }
  };

  if (loadingProblem) {
    return (
      <div className="h-screen bg-base-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
            <p className="text-lg">Loading problem...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!problemData) {
    return (
      <div className="h-screen bg-base-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg">Problem not found</p>
            <button 
              onClick={() => navigate("/problems")} 
              className="btn btn-primary mt-4"
            >
              Back to Problems
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex">
        {/* LEFT PANEL - PROBLEM & CODE */}
        <div className="flex-1 flex flex-col">
          {/* PROBLEM DESCRIPTION */}
          <div className="h-1/2 border-b border-base-300">
            <div className="h-full overflow-y-auto bg-base-50">
              {/* HEADER */}
              <div className="sticky top-0 bg-base-100 border-b border-base-300 p-4 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigate("/problems")}
                      className="btn btn-ghost btn-sm gap-1"
                    >
                      <ArrowLeftIcon className="w-4 h-4" />
                      Back
                    </button>
                    <h1 className="text-2xl font-bold text-base-content">
                      {problemData.title}
                    </h1>
                    <span className={`badge ${getDifficultyBadgeClass(problemData.difficulty)}`}>
                      {problemData.difficulty?.charAt(0).toUpperCase() + problemData.difficulty?.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-base-content/60 mt-2">
                  <span>Category: {problemData.category}</span>
                  <span>•</span>
                  <span>Practice Mode</span>
                </div>
              </div>

              {/* PROBLEM CONTENT */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-base-content/90 leading-relaxed whitespace-pre-line">
                      {problemData.description}
                    </p>
                  </div>
                </div>

                {problemData.examples && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Examples</h3>
                    <div className="space-y-4">
                      {problemData.examples.map((example, idx) => (
                        <div key={idx} className="bg-base-200 rounded-lg p-4">
                          <div className="text-sm font-medium text-base-content/70 mb-2">
                            Example {idx + 1}:
                          </div>
                          <div className="font-mono text-sm space-y-2">
                            <div>
                              <span className="text-primary font-semibold">Input: </span>
                              <span className="text-base-content">{example.input}</span>
                            </div>
                            <div>
                              <span className="text-secondary font-semibold">Output: </span>
                              <span className="text-base-content">{example.output}</span>
                            </div>
                            {example.explanation && (
                              <div className="pt-2 border-t border-base-300">
                                <span className="text-base-content/60 text-xs">
                                  <strong>Explanation:</strong> {example.explanation}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {problemData.constraints && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Constraints</h3>
                    <ul className="space-y-1 text-sm text-base-content/80">
                      {problemData.constraints.map((constraint, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-primary">•</span>
                          <code className="text-sm bg-base-200 px-1 rounded">{constraint}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CODE EDITOR & OUTPUT */}
          <div className="h-1/2 flex flex-col">
            {/* CODE EDITOR */}
            <div className="flex-1 min-h-0">
              <CodeEditorPanel
                selectedLanguage={selectedLanguage}
                code={code}
                isRunning={isRunning}
                onLanguageChange={handleLanguageChange}
                onCodeChange={(value) => setCode(value)}
                onRunCode={handleRunCode}
                onSubmitCode={handleSubmitCode}
              />
            </div>
            
            {/* OUTPUT PANEL */}
            <div className="h-48 border-t border-base-300 flex-shrink-0">
              <OutputPanel output={output} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticePage;