import MonacoEditor from "@monaco-editor/react";
import socket from "../socket/socket";
import { useParams } from "react-router-dom";

function CodeEditor({ code, setCode }) {
  const { roomId } = useParams();
  const handleEditorChange = (value) => {
    setCode(value || "");
    socket.emit("code-change", {
      roomId,
      code: value,
    });
    console.log("sent");
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
