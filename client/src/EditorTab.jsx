import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import axios from "axios";
export default function EditorTab() {
  const Lang = useOutletContext();
  const location = useLocation();
  const [codeSave, setCodeSave] = useState(null);
  const [editorCode, setEditorCode] = useState("");
  console.log(location.pathname.split("/")[2]);
  console.log(Lang);
  useEffect(() => {
    if (location.pathname.split("/")[2]) {
      axios
        .get(
          `https://codesharebackendapi.onrender.com/${
            location.pathname.split("/")[2]
          }`
        )
        .then((res) => setCodeSave(() => (res.data ? { ...res.data } : null)));
    }
  }, []);
  useEffect(() => {
    if (codeSave === null && editorCode != "") {
      console.log("post request");
      axios
        .post(
          `https://codesharebackendapi.onrender.com/${
            location.pathname.split("/")[2]
          }`,
          {
            id: location.pathname.split("/")[2],
            code: editorCode,
            language: Lang,
          }
        )
        .then(function (response) {
          console.log(response.status);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (editorCode !== "") {
      axios
        .patch(
          `https://codesharebackendapi.onrender.com/${
            location.pathname.split("/")[2]
          }`,
          {
            code: editorCode,
            language: Lang,
          }
        )
        .then(function (response) {
          console.log(response.status);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (codeSave?.code) {
      const mText = document.querySelector(".monaco-text");
      if (codeSave.code) {
        mText.style.display = "flex";
      } else {
        mText.style.display = "none";
      }
    }
  }, [codeSave, Lang, editorCode]);

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
      <Editor
        height="90vh"
        language={codeSave ? codeSave.language : Lang}
        value={codeSave ? codeSave.code : ""}
        onChange={preTextRemove}
        theme="vs-dark"
      />
      <div className="monaco-text"></div>
    </>
  );
}
