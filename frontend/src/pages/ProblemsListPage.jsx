import { useState, useEffect } from "react";
import { Link } from "react-router";
import { PlusIcon, CodeIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemsListPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Problems</h1>
          <Link to="/create-problem" className="btn btn-primary gap-2">
            <PlusIcon className="w-5 h-5" />
            Create Problem
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid gap-4">
            {problems.map((problem) => (
              <div key={problem._id} className="card bg-base-100 shadow-lg border border-base-300">
                <div className="card-body">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="card-title text-xl">{problem.title}</h2>
                        <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </span>
                      </div>
                      
                      <p className="text-base-content/70 mb-3 line-clamp-2">
                        {problem.description.substring(0, 200)}...
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-base-content/60">
                        <span>Category: {problem.category}</span>
                        <span>•</span>
                        <span>{problem.examples?.length || 0} examples</span>
                        <span>•</span>
                        <span>Created: {new Date(problem.createdAt).toLocaleDateString()}</span>
                      </div>
                      
                      {problem.tags && problem.tags.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {problem.tags.map((tag, index) => (
                            <span key={index} className="badge badge-outline badge-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-primary">
                        <CodeIcon className="w-4 h-4" />
                        <span className="text-sm">
                          {Object.keys(problem.starterCode || {}).length} languages
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {problems.length === 0 && (
              <div className="text-center py-20">
                <CodeIcon className="w-16 h-16 mx-auto text-base-content/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No problems yet</h3>
                <p className="text-base-content/60 mb-4">Create your first coding problem to get started</p>
                <Link to="/create-problem" className="btn btn-primary gap-2">
                  <PlusIcon className="w-5 h-5" />
                  Create Problem
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemsListPage;