import React, { useState, forwardRef, useEffect, useMemo } from "react";
import { Dropdown, DropdownDivider, Form } from "react-bootstrap";
import { getLanguage, setLanguage } from "./service/LocalStorageService";
import {
  LANGUAGE_HISTORY,
  LAST_SELECTED_LANGUAGE,
} from "./Util/constants/localStorage";
import { supportedLangList } from "./Util/constants/languages";

export default function LanguageSelector(props) {
  const [selectedLang, setSelectLang] = useState("PlainText");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const selectedKey = "PlainText";
    const lastSelectedLanguage = getLanguage(LAST_SELECTED_LANGUAGE);
    console.log(lastSelectedLanguage);
    setSelectLang(lastSelectedLanguage ? lastSelectedLanguage : selectedKey);
  }, []);

  function onSelectLang(value) {
    setSelectLang(value);
    setLanguage(LAST_SELECTED_LANGUAGE, value);
    const existingLanguage = JSON.parse(getLanguage(LANGUAGE_HISTORY)) || [];
    existingLanguage.includes(value)
      ? existingLanguage.splice(existingLanguage.indexOf(value), 1)
      : existingLanguage;
    existingLanguage.push(value);
    setLanguage(LANGUAGE_HISTORY, JSON.stringify(existingLanguage));
    props.setLang(() => supportedLangList[value]);
  }

  const filteredLanguagesList = useMemo(() => {
    const results = [];

    for (let key in supportedLangList) {
      const currentLang = supportedLangList[key];

      if (
        (search &&
          currentLang.toLowerCase().search(search.toLowerCase()) !== -1) ||
        !search
      ) {
        results.push({ id: currentLang, value: key });
      }
    }
    return results;
  }, [search]);

  const historyLanguagesList = useMemo(() => {
    const results = JSON.parse(getLanguage(LANGUAGE_HISTORY)) || [];
    return results.reverse().slice(0, 3);
  }, [selectedLang]);

  const _renderLanguages = () => {
    const languageList = filteredLanguagesList.map((item) => {
      return (
        <Dropdown.Item key={item.id} eventKey={item.value}>
          {item.value}
        </Dropdown.Item>
      );
    });

    // Case 1 - When there's no value of history or having search
    if (historyLanguagesList.length === 0 || search) {
      return languageList;
    }

    // Case 2 - When there's no value but history
    if (!search && historyLanguagesList.length > 0) {
      return (
        <>
          {historyLanguagesList.map((item, index) => {
            return (
              <Dropdown.Item key={index} eventKey={item}>
                {item}
              </Dropdown.Item>
            );
          })}
          <DropdownDivider />
          {languageList}
        </>
      );
    }
    return null;
  };

  const resetSearchBar = () => {
    setSearch("");
  };

  return (
    <>
      <Dropdown
        onSelect={onSelectLang}
        onToggle={resetSearchBar}
        focusFirstItemOnShow="true"
      >
        <Dropdown.Toggle
          variant="dark"
          id="dropdown-basic"
          onToggle={resetSearchBar}
        >
          {selectedLang}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <ScrollableMenu>{_renderLanguages()}</ScrollableMenu>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

const ScrollableMenu = forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => (
    <div
      ref={ref}
      style={{
        ...style,
        overflow: "auto",
        maxHeight: "400px",
      }} // Adjust the maxHeight as needed
      className={className}
      aria-labelledby={labeledBy}
    >
      {children}
    </div>
  )
);
