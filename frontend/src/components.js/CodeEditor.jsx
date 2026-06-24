import MonacoEditor from "@monaco-editor/react";
import socket from "../socket/socket";
import { useParams } from "react-router-dom";
function CodeEditor({ code, setCode, language, setLanguage }) {
  const { roomId } = useParams();
  const handleEditorChange = (value) => {
    setCode(value || "");
    socket.emit("code-change", {
      roomId,
      code: value,
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
    <div className="h-screen flex flex-col">
      <div className="bg-slate-900 p-3 border-b border-slate-700">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-slate-800 text-white px-3 py-2 rounded"
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
          minimap: {
            enabled: false,
          },
          automaticLayout: true,
        }}
      />
    </div>
  );
}
export default CodeEditor;
