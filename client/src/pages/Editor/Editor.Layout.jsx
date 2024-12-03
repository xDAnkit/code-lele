import Editor from "@monaco-editor/react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useLanguage from "../../hooks/useLanguage";
import NavBar from "../../components/organisms/Navbar/NavBar.Component";

import {
  FONT_SIZE,
  LINE_HEIGHT,
  TEXT_EDITOR_FONT_SIZE,
  TEXT_EDITOR_MAX_FONT_SIZE,
} from "./Editor.config";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  CopyDiv,
  IconBtn,
  InnerSidebarDiv,
  MainDiv,
  ShowIcon,
  SideBarDiv,
} from "./Editor-style";
import { getItem, setItem } from "../../service/LocalStorageService";
import TooltipView from "../../components/organisms/Tooltip/Tooltip.Component";

export default function EditorTab() {
  const { selectedLanguage } = useLanguage();
  const [codeSave, setCodeSave] = useState(null);
  const [editorCode, setEditorCode] = useState("");

  const { user, isAuthenticated } = useAuth0();
  const [fontSize, setFontSize] = useState(
    Number(getItem(FONT_SIZE)) || TEXT_EDITOR_FONT_SIZE
  );
  const [lineHeight, setlineHeight] = useState(
    Number(getItem(LINE_HEIGHT)) || 20
  );

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
      const newFontSize = fontSize + increment;
      const newLineHeight = lineHeight + increment;
      setFontSize(newFontSize);
      setlineHeight(newLineHeight);
      setItem(FONT_SIZE, newFontSize);
      setItem(LINE_HEIGHT, newLineHeight);
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

  async function copyToClipboard(text) {
    await navigator.clipboard.writeText(text);
    toast("Code Copied to Clipboard");
  }

  return (
    <>
      <NavBar />
      <MainDiv>
        <Editor
          height="calc(100vh - 70px)"
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

        <SideBarDiv>
          <CopyDiv>
            <TooltipView text="Copy Code" top="70px">
              <ShowIcon
                className="material-symbols-outlined"
                onClick={() => copyToClipboard(editorCode)}
              >
                file_copy
              </ShowIcon>
            </TooltipView>
          </CopyDiv>

          <InnerSidebarDiv>
            <IconBtn>
              <TooltipView text="Increase Font Size" top="160px">
                <ShowIcon
                  onClick={() => onFontSizeChange("+")}
                  className="material-symbols-outlined"
                >
                  add
                </ShowIcon>
              </TooltipView>
            </IconBtn>
            <IconBtn>
              <TooltipView text="Decrease Font Size" top="240px">
                <ShowIcon
                  onClick={() => onFontSizeChange("-")}
                  className="material-symbols-outlined"
                >
                  remove
                </ShowIcon>
              </TooltipView>
            </IconBtn>
            <IconBtn
              onClick={() => {
                setFontSize(20), setlineHeight(20);
              }}
            >
              <TooltipView text="Reset Font Size" top="320px">
                <ShowIcon className="material-symbols-outlined">
                  settings_backup_restore
                </ShowIcon>
              </TooltipView>
            </IconBtn>

            <IconBtn onClick={onDownloadCode}>
              <TooltipView text="Download Code" top="400px">
                <ShowIcon className="material-symbols-outlined">
                  download
                </ShowIcon>
              </TooltipView>
            </IconBtn>
          </InnerSidebarDiv>
        </SideBarDiv>
      </MainDiv>
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
