import MonacoEditor from "@monaco-editor/react";
import socket from "../socket/socket";
import { useParams } from "react-router-dom";
function CodeEditor({
  code,
  setCode,
  language,
  setLanguage,
  problem,
  setProblem,
  role,
}) {
  const { roomId } = useParams();
  const handleEditorChange = (value) => {
    setCode(value || "");
    socket.emit("code-change", {
      roomId,
      code: value,
    });
  };
  const handleProblemChange = (e) => {
    if (role !== "host") return;
    const newProblem = e.target.value;
    setProblem(newProblem);
    socket.emit("problem-change", {
      roomId,
      problem: newProblem,
    });
  };
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    socket.emit("language-change", {
      roomId,
      language: newLanguage,
    });
  };
  return (
    <div className="relative h-full w-full">
      <div className="absolute top-4 right-4 z-9999">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-slate-800/95 backdrop-blur text-white px-3 py-2 rounded-lg shadow-xl border border-slate-700 focus:outline-none"
        >
          <option value="cpp">C++</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
      </div>
      <MonacoEditor
        height="100%"
        language={language}
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
  );
}

export default CodeEditor;
