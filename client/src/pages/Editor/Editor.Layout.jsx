import Editor from "@monaco-editor/react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useLanguage from "../../hooks/useLanguage";
import NavBar from "../../components/organisms/Navbar/NavBar.Component";

export default function EditorTab() {
  const { selectedLanguage } = useLanguage();
  const [codeSave, setCodeSave] = useState(null);
  const [editorCode, setEditorCode] = useState("");

  const { user, isAuthenticated } = useAuth0();
  const hasUser = isAuthenticated && user.name === "Yash Shukla";

  function preTextRemove(value) {
    const mText = document.querySelector(".monaco-text");
    if (value) {
      mText.style.display = "none";
    } else {
      mText.style.display = "flex";
    }
    setEditorCode(() => (value ? value : ""));
  }

  return (
    <>
      <NavBar />
      <Editor
        height="94dvh"
        language={selectedLanguage}
        value={codeSave ? codeSave.code : ""}
        onChange={preTextRemove}
        theme="vs-dark"
        options={{
          //readOnly: !hasUser,
          lineHeight: 20,
        }}
      />
      <div className="monaco-text"></div>
    </>
  );
}
