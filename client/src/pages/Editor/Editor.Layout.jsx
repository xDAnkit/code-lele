import Editor from "@monaco-editor/react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useLanguage from "../../hooks/useLanguage";
import NavBar from "../../components/organisms/Navbar/NavBar.Component";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Container, Toast } from "react-bootstrap";
import {
  TEXT_EDITOR_FONT_SIZE,
  TEXT_EDITOR_MAX_FONT_SIZE,
} from "./Editor.config";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tooltip from "./TooltipConfig";

export default function EditorTab() {
  const { selectedLanguage } = useLanguage();
  const [codeSave, setCodeSave] = useState(null);
  const [editorCode, setEditorCode] = useState("");

  const { user, isAuthenticated } = useAuth0();
  const [fontSize, setFontSize] = useState(TEXT_EDITOR_FONT_SIZE);
  const [lineHeight, setlineHeight] = useState(20);

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

  const onFontSizeChange = (operator) => {
    const increment = operator === "+" ? 10 : -10;

    if (
      (operator === "+" && fontSize < TEXT_EDITOR_MAX_FONT_SIZE) ||
      (operator === "-" && fontSize > TEXT_EDITOR_FONT_SIZE)
    ) {
      setFontSize(fontSize + increment);
      setlineHeight(lineHeight + increment);
    }
  };

  const onDownloadCode = () => {
    const link = document.createElement("a");
    const getInput = editorCode;
    const file = new Blob([getInput], { type: "text/html" });
    link.href = URL.createObjectURL(file);
    link.download = "file";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <>
      <NavBar />

      <div style={{ display: "flex", width: "100%", overflow: "hidden" }}>
        <Editor
          height="calc(100vh - 70px)"
          // height="94dvh"
          language={selectedLanguage}
          value={codeSave ? codeSave.code : ""}
          onChange={preTextRemove}
          theme="vs-dark"
          options={{
            //readOnly: !hasUser,
            lineHeight: lineHeight,
            fontSize: fontSize,
          }}
          width="95%"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "10px",
            width: "5%",
            backgroundColor: "#212529",
          }}
        >
          <div
            style={{
              borderBottom: "2px solid #6c757d",
              paddingLeft: "10px",
              paddingRight: "10px",
              textAlign: "center",
              height: "76px",
            }}
          >
            <CopyToClipboard text={editorCode}>
              <Tooltip text="Copy Code" top="70px">
                <img
                  src="/copy-icon-white.png"
                  alt="Copy Icon"
                  style={{ width: "35px", cursor: "pointer" }}
                  onClick={() => toast("Code Copied to Clipboard")}
                />
              </Tooltip>
            </CopyToClipboard>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Tooltip text="Increase Font Size" top="160px">
              <button
                style={{
                  background: "none",
                  color: "#fff",
                  border: "none",
                  fontSize: "45px",
                  borderBottom: "2px solid #6c757d",
                  width: "100%",
                }}
                onClick={() => onFontSizeChange("+")}
              >
                +
              </button>
            </Tooltip>
            <Tooltip text="Decrease Font Size" top="240px">
              <button
                style={{
                  background: "none",
                  color: "#fff",
                  border: "none",
                  fontSize: "55px",
                  borderBottom: "2px solid #6c757d",
                  width: "100%",
                }}
                onClick={() => onFontSizeChange("-")}
              >
                -
              </button>
            </Tooltip>

            <button
              style={{
                background: "none",

                border: "none",
                height: "80px",
                borderBottom: "2px solid #6c757d",
              }}
              onClick={() => {
                setFontSize(15), setlineHeight(20);
              }}
            >
              <Tooltip text="Reset Font Size" top="320px">
                <img
                  src="/undo-white.png"
                  alt="Copy Icon"
                  style={{ width: "35px", cursor: "pointer" }}
                />
              </Tooltip>
            </button>

            <button
              style={{
                background: "none",
                height: "80px",
                border: "none",

                borderBottom: "2px solid #6c757d",
              }}
              onClick={onDownloadCode}
            >
              <Tooltip text="Download Code" top="400px">
                <img
                  src="/download-icon-white.png"
                  alt="Copy Icon"
                  style={{ width: "35px", cursor: "pointer" }}
                />
              </Tooltip>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        theme="dark"
        hideProgressBar={true}
        pauseOnHover={false}
      />
      <div className="monaco-text"></div>
    </>
  );
}
