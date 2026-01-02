import { useState, useEffect } from "react";
import { Link } from "react-router";
import { CodeIcon, PlayIcon, CheckCircleIcon, ClockIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import { getDifficultyBadgeClass } from "../lib/utils";

function PracticeProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/problems`);
      if (response.ok) {
        const data = await response.json();
        setProblems(data.problems);
      }
    } catch (error) {
      console.error("Error fetching problems:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProblems = problems.filter(problem => {
    if (filter === "all") return true;
    return problem.difficulty === filter;
  });

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>
          <p className="text-base-content/70">Solve coding problems to improve your skills</p>
        </div>

        {/* Filter Tabs */}
        <div className="tabs tabs-boxed mb-8 bg-base-200">
          <button 
            className={`tab ${filter === "all" ? "tab-active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({problems.length})
          </button>
          <button 
            className={`tab ${filter === "easy" ? "tab-active" : ""}`}
            onClick={() => setFilter("easy")}
          >
            Easy ({problems.filter(p => p.difficulty === "easy").length})
          </button>
          <button 
            className={`tab ${filter === "medium" ? "tab-active" : ""}`}
            onClick={() => setFilter("medium")}
          >
            Medium ({problems.filter(p => p.difficulty === "medium").length})
          </button>
          <button 
            className={`tab ${filter === "hard" ? "tab-active" : ""}`}
            onClick={() => setFilter("hard")}
          >
            Hard ({problems.filter(p => p.difficulty === "hard").length})
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th className="w-8">#</th>
                  <th>Title</th>
                  <th>Difficulty</th>
                  <th>Category</th>
                  <th>Tags</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((problem, index) => (
                  <tr key={problem._id} className="hover">
                    <td className="font-mono text-sm">{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-semibold text-base">{problem.title}</div>
                          <div className="text-sm text-base-content/60 line-clamp-1">
                            {problem.description.substring(0, 80)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
                        {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm text-base-content/70">{problem.category}</span>
                    </td>
                    <td>
                      <div className="flex gap-1 flex-wrap">
                        {problem.tags?.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="badge badge-outline badge-xs">
                            {tag}
                          </span>
                        ))}
                        {problem.tags?.length > 2 && (
                          <span className="badge badge-outline badge-xs">+{problem.tags.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <Link 
                        to={`/practice/${problem._id}`} 
                        className="btn btn-primary btn-sm gap-2"
                      >
                        <PlayIcon className="w-4 h-4" />
                        Solve
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredProblems.length === 0 && (
              <div className="text-center py-20">
                <CodeIcon className="w-16 h-16 mx-auto text-base-content/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No problems found</h3>
                <p className="text-base-content/60">Try adjusting your filter or create some problems first</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PracticeProblemsPage;