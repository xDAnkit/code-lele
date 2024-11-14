import React, { useState, useMemo } from "react";
import { Dropdown, DropdownDivider, Form } from "react-bootstrap";
import { supportedLangList } from "../../../Util/constants/languages";
import useLanguage from "../../../hooks/useLanguage";
import ScrollableMenu from "../../templates/ScrollableView/ScollableView.Component";

export default function LanguageSelector() {
  const [search, setSearch] = useState("");
  const { selectedLanguage, languageHistory, setSelectedLanguage } =
    useLanguage();

  const filteredLanguagesList = useMemo(() => {
    const searchLowerCase = search.toLowerCase();

    return Object.entries(supportedLangList).reduce(
      (results, [key, currentLang]) => {
        if (
          !searchLowerCase ||
          currentLang.toLowerCase().includes(searchLowerCase)
        ) {
          results.push({ id: currentLang, value: key });
        }
        return results;
      },
      []
    );
  }, [search]);

  const _renderLanguages = () => {
    const languageList = filteredLanguagesList.map((item) => (
      <Dropdown.Item
        key={item.id}
        eventKey={item.id}
        style={{ textTransform: "capitalize" }}
      >
        {item.value}
      </Dropdown.Item>
    ));

    if (!languageHistory.length || search) {
      return languageList;
    }

    return (
      <>
        {languageHistory.map((item, index) => (
          <Dropdown.Item
            key={index}
            eventKey={item}
            style={{ textTransform: "capitalize" }}
          >
            {item}
          </Dropdown.Item>
        ))}
        <DropdownDivider />
        {languageList}
      </>
    );
  };

  const resetSearchBar = () => {
    setSearch("");
  };

  return (
    <>
      <Dropdown
        onSelect={setSelectedLanguage}
        onToggle={resetSearchBar}
        focusFirstItemOnShow="true"
      >
        <Dropdown.Toggle
          variant="dark"
          id="dropdown-basic"
          onToggle={resetSearchBar}
          style={{ textTransform: "capitalize" }}
        >
          {selectedLanguage}
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
