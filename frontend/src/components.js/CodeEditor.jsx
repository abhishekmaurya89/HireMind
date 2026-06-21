import MonacoEditor from "@monaco-editor/react";
function CodeEditor({ code, setCode }) {
  const handleEditorChange = (value) => {
    setCode(value || "");
  };
  return (
    <MonacoEditor
      height="100vh"
      language="cpp"
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
  );
}

export default CodeEditor;