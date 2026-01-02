import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import toast from "react-hot-toast";
import { executeCode } from "../lib/piston";
import Navbar from "../components/Navbar";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Loader2Icon, LogOutIcon, PhoneOffIcon, ShareIcon, UserPlusIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";
import ShareLinkModal from "../components/ShareLinkModal";
import InviteUserModal from "../components/InviteUserModal";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  // find the problem data based on session problem title
  const [problemData, setProblemData] = useState(null);
  const [loadingProblem, setLoadingProblem] = useState(false);

  // Fetch problem data when session loads
  useEffect(() => {
    const fetchProblem = async () => {
      if (!session?.problem) return;
      
      setLoadingProblem(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/problems/title/${encodeURIComponent(session.problem)}`);
        if (response.ok) {
          const data = await response.json();
          setProblemData(data.problem);
        }
      } catch (error) {
        console.error("Error fetching problem:", error);
      } finally {
        setLoadingProblem(false);
      }
    };

    fetchProblem();
  }, [session?.problem]);

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(problemData?.starterCode?.[selectedLanguage] || "");

  // auto-join session if user is not already a participant and not the host
  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;

    joinSessionMutation.mutate(id);
  }, [session?._id, user?.id, loadingSession, isHost, isParticipant, id, joinSessionMutation]);

  // redirect the "participant" when session ends
  useEffect(() => {
    if (!session || loadingSession) return;

    if (session.status === "completed") {
      navigate("/dashboard");
    }
  }, [session?.status, loadingSession, navigate]);

  // update code when problem loads or changes
  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData?.starterCode, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    // use problem-specific starter code
    const starterCode = problemData?.starterCode?.[newLang] || "";
    setCode(starterCode);
    setOutput(null);
  };

  const handleRunCode = async () => {
    console.log('🚀 Starting code execution...');
    console.log('Language:', selectedLanguage);
    console.log('Code:', code);
    
    setIsRunning(true);
    setOutput(null);

    try {
      const result = await executeCode(selectedLanguage, code);
      console.log('📊 Execution result:', result);
      setOutput(result);
    } catch (error) {
      console.error('💥 Code execution failed:', error);
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

  const handleEndSession = () => {
    if (confirm("Are you sure you want to end this session? All participants will be notified.")) {
      // this will navigate the HOST to dashboard
      endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
    }
  };

  const handleShareMeetingLink = () => {
    setShowShareModal(true);
  };

  const handleInviteUser = () => {
    setShowInviteModal(true);
  };

  // Show loading state
  if (loadingSession) {
    return (
      <div className="h-screen bg-base-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
            <p className="text-lg">Loading session...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if no session found
  if (!session && !loadingSession) {
    return (
      <div className="h-screen bg-base-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <PhoneOffIcon className="w-12 h-12 mx-auto text-error mb-4" />
            <p className="text-lg">Session not found</p>
            <button 
              onClick={() => navigate("/dashboard")} 
              className="btn btn-primary mt-4"
            >
              Back to Dashboard
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
                    <h1 className="text-2xl font-bold text-base-content">
                      {session?.problem || "Loading..."}
                    </h1>
                    <span className={`badge ${getDifficultyBadgeClass(session?.difficulty)}`}>
                      {session?.difficulty?.charAt(0).toUpperCase() + session?.difficulty?.slice(1) || "Easy"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleInviteUser}
                      className="btn btn-success btn-sm gap-1"
                      title="Invite candidate"
                    >
                      <UserPlusIcon className="w-4 h-4" />
                      Invite
                    </button>
                    
                    <button
                      onClick={handleShareMeetingLink}
                      className="btn btn-ghost btn-sm gap-1"
                      title="Share link"
                    >
                      <ShareIcon className="w-4 h-4" />
                      Share
                    </button>
                    
                    {isHost && session?.status === "active" && (
                      <button
                        onClick={handleEndSession}
                        disabled={endSessionMutation.isPending}
                        className="btn btn-error btn-sm gap-1"
                      >
                        {endSessionMutation.isPending ? (
                          <Loader2Icon className="w-4 h-4 animate-spin" />
                        ) : (
                          <LogOutIcon className="w-4 h-4" />
                        )}
                        End
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-base-content/60 mt-2">
                  <span>Host: {session?.host?.name}</span>
                  <span>•</span>
                  <span>{session?.participant ? "2/2" : "1/2"} participants</span>
                </div>
              </div>

              {/* PROBLEM CONTENT */}
              <div className="p-6 space-y-6">
                {problemData?.description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Description</h3>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-base-content/90 leading-relaxed">{problemData.description.text}</p>
                      {problemData.description.notes?.map((note, idx) => (
                        <p key={idx} className="text-base-content/90 leading-relaxed mt-2">{note}</p>
                      ))}
                    </div>
                  </div>
                )}

                {problemData?.examples && (
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

                {problemData?.constraints && (
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
            <div className="h-32 border-t border-base-300 flex-shrink-0">
              <OutputPanel output={output} />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - VIDEO CALL */}
        <div className="w-96 border-l border-base-300 bg-base-200">
          <div className="h-full p-4">
            {isInitializingCall ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Loader2Icon className="w-8 h-8 mx-auto animate-spin text-primary mb-2" />
                  <p className="text-sm">Connecting...</p>
                </div>
              </div>
            ) : !streamClient || !call ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <PhoneOffIcon className="w-12 h-12 mx-auto text-error mb-2" />
                  <p className="text-sm text-base-content/70">Connection Failed</p>
                </div>
              </div>
            ) : (
              <div className="h-full">
                <StreamVideo client={streamClient}>
                  <StreamCall call={call}>
                    <VideoCallUI chatClient={chatClient} channel={channel} />
                  </StreamCall>
                </StreamVideo>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* MODALS */}
      <ShareLinkModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        sessionId={id}
        sessionTitle={session?.problem || "Interview Session"}
      />
      
      <InviteUserModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        sessionId={id}
        sessionTitle={session?.problem || "Interview Session"}
      />
    </div>
  );
}

export default SessionPage;
