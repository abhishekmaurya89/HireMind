import MonacoEditor from "@monaco-editor/react";

function CodeEditor({ code, setCode }) {
  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  return (
    <MonacoEditor
      height="90vh"
      language="cpp"
      value={code}
      onChange={handleEditorChange}
      theme="vs-dark"
    />
  );
}

export default CodeEditor;