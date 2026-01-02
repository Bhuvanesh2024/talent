const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
};

export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const payload = {
      language: languageConfig.language,
      version: languageConfig.version,
      files: [
        {
          name: `main.${getFileExtension(language)}`,
          content: code,
        },
      ],
      stdin: "",
      args: [],
      compile_timeout: 10000,
      run_timeout: 3000,
      compile_memory_limit: -1,
      run_memory_limit: -1,
    };

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `HTTP error! status: ${response.status}\n${errorText}`,
      };
    }

    const data = await response.json();

    const stdout = data.run?.stdout || "";
    const stderr = data.run?.stderr || "";
    const output = data.run?.output || "";

    if (data.compile && data.compile.stderr) {
      return {
        success: false,
        error: `Compilation Error:\n${data.compile.stderr}`,
        output: data.compile.stdout || "",
      };
    }

    if (stderr) {
      return {
        success: false,
        output: stdout || output,
        error: `Runtime Error:\n${stderr}`,
      };
    }

    const finalOutput = stdout || output || "Program executed successfully (no output)";
    
    return {
      success: true,
      output: finalOutput,
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}

function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
  };

  return extensions[language] || "txt";
}