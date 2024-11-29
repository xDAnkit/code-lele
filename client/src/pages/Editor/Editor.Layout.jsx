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
  DecreaseBtn,
  DownloadBtn,
  IncreaseBtn,
  InnerSidebarDiv,
  MainDiv,
  ResetBtn,
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

        <SideBarDiv>
          <CopyDiv>
            <TooltipView text="Copy Code" top="70px">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#FFFFFF"
                onClick={() => copyToClipboard(editorCode)}
              >
                <path d="M780-160H260q-24 0-42-18t-18-42v-640q0-24 18-42t42-18h348l232 232v468q0 24-18 42t-42 18ZM578-662v-198H260v640h520v-442H578ZM140-40q-24 0-42-18t-18-42v-619h60v619h498v60H140Zm120-820v198-198 640-640Z" />
              </svg>
            </TooltipView>
          </CopyDiv>

          <InnerSidebarDiv>
            <TooltipView text="Increase Font Size" top="160px">
              <IncreaseBtn onClick={() => onFontSizeChange("+")}>+</IncreaseBtn>
            </TooltipView>

            <TooltipView text="Decrease Font Size" top="240px">
              <DecreaseBtn onClick={() => onFontSizeChange("-")}>-</DecreaseBtn>
            </TooltipView>

            <ResetBtn
              onClick={() => {
                setFontSize(20), setlineHeight(20);
              }}
            >
              <TooltipView text="Reset Font Size" top="320px">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40px"
                  viewBox="0 -960 960 960"
                  width="40px"
                  fill="#FFFFFF"
                >
                  <path d="M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-129h60v254H546v-60h168q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q83 0 152-47.5T728-393h62q-29 105-115 169t-195 64Z" />
                </svg>
              </TooltipView>
            </ResetBtn>

            <DownloadBtn onClick={onDownloadCode}>
              <TooltipView text="Download Code" top="400px">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40px"
                  viewBox="0 -960 960 960"
                  width="40px"
                  fill="#FFFFFF"
                >
                  <path d="M480-313 287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z" />
                </svg>
              </TooltipView>
            </DownloadBtn>
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
