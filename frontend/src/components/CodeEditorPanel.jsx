import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
  onSubmitCode,
}) {
  const languageOptions = {
    javascript: { name: "JavaScript", monacoLang: "javascript" },
    python: { name: "Python", monacoLang: "python" },
    java: { name: "Java", monacoLang: "java" },
  };

  return (
    <div className="h-full bg-base-100 flex flex-col border border-base-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-base-200 border-b border-base-300">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Code Editor</span>
          <select 
            className="select select-bordered select-sm" 
            value={selectedLanguage} 
            onChange={onLanguageChange}
          >
            {Object.entries(languageOptions).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button 
            className="btn btn-outline btn-sm gap-1" 
            disabled={isRunning} 
            onClick={onRunCode}
          >
            {isRunning ? (
              <>
                <Loader2Icon className="w-4 h-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <PlayIcon className="w-4 h-4" />
                Run
              </>
            )}
          </button>
          
          {onSubmitCode && (
            <button 
              className="btn btn-success btn-sm" 
              disabled={isRunning} 
              onClick={onSubmitCode}
            >
              {isRunning ? (
                <>
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 bg-gray-900">
        <Editor
          height="100%"
          language={languageOptions[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            wordWrap: "on",
            tabSize: 2,
            insertSpaces: true,
          }}
        />
      </div>
    </div>
  );
}
export default CodeEditorPanel;
