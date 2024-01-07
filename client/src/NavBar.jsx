import axios from "axios";
import React, { useState, forwardRef, useEffect, useMemo } from "react";
import {
  Container,
  Dropdown,
  DropdownDivider,
  Form,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { getLanguage, setLanguage } from "./service/LocalStorageService";
import {
  LANGUAGE_HISTORY,
  LAST_SELECTED_LANGUAGE,
} from "./Util/constants/localStorage";
import { supportedLangList } from "./Util/constants/languages";

import { useAuth0 } from "@auth0/auth0-react";
const supportedLangList = {
  ABAP: "abap",
  Apex: "apex",
  "Azure CLI": "azcli",
  "Batch File": "bat",
  Bicep: "bicep",
  Cameligo: "cameligo",
  Clojure: "clojure",
  CoffeeScript: "coffeescript",
  C: "c",
  "C++": "cpp",
  "C#": "csharp",
  "Content Security Policy": "csp",
  CSS: "css",
  Cypher: "cypher",
  Dart: "dart",
  Dockerfile: "dockerfile",
  ECL: "ecl",
  Elixir: "elixir",
  Flow9: "flow9",
  "F#": "fsharp",
  Go: "go",
  GraphQL: "graphql",
  Handlebars: "handlebars",
  HCL: "hcl",
  HTML: "html",
  INI: "ini",
  Java: "java",
  JavaScript: "javascript",
  Julia: "julia",
  Kotlin: "kotlin",
  LESS: "less",
  Lexon: "lexon",
  Lua: "lua",
  M3: "m3",
  Markdown: "markdown",
  MDX: "mdx",
  MISP: "misp",
  MSDAX: "msdax",
  MySQL: "mysql",
  "Objective-C": "objective-c",
  Pascal: "pascal",
  Pascaligo: "pascaligo",
  Perl: "perl",
  Postiats: "postiats",
  "Power Query": "powerquery",
  PowerShell: "powershell",
  "Protocol Buffers": "proto",
  Python: "python",
  "Q#": "qsharp",
  R: "r",
  Razor: "razor",
  Redis: "redis",
  Redshift: "redshift",
  reStructuredText: "restructuredtext",
  Ruby: "ruby",
  Rust: "rust",
  SB: "sb",
  Scala: "scala",
  Scheme: "scheme",
  SCSS: "scss",
  Shell: "shell",
  Solidity: "sol",
  AES: "aes",
  SparkQL: "sparkql",
  SQL: "sql",
  ST: "st",
  Swift: "swift",
  SystemVerilog: "systemverilog",
  Verilog: "verilog",
  Tcl: "tcl",
  Twig: "twig",
  TypeScript: "typescript",
  VB: "vb",
  "WebGPU Shader Language": "wgsl",
  XML: "xml",
  YAML: "yaml",
  JSON: "json",
  PlainText: "plaintext",
};

export default function NavBar(props) {
  const [selectedLang, setSelectLang] = useState("PlainText");
  const [search, setSearch] = useState("");

  //console.log(value);
  const Location = useLocation();
  useEffect(() => {
    /*if (location.pathname.split("/")[2]) {
      axios
        .get(
          `https://codesharebackendapi.onrender.com/${
            location.pathname.split("/")[2]
          }`
        )
        .then((res) => {
          const selectedKey = Object.keys(supportedLangList).find(
            (key) => res.data.language == supportedLangList[key]
          );*/
    const selectedKey = "PlainText";
    const lastSelectedLanguage = getLanguage(LAST_SELECTED_LANGUAGE);
    console.log(lastSelectedLanguage);
    setSelectLang(lastSelectedLanguage ? lastSelectedLanguage : selectedKey);
    //});
    //}
  }, []);
  function onSelectLang(value) {
    setSelectLang(value);
    setLanguage(LAST_SELECTED_LANGUAGE, value);
    const existingLanguage = JSON.parse(getLanguage(LANGUAGE_HISTORY)) || [];
    existingLanguage.includes(value)
      ? existingLanguage
      : existingLanguage.push(value);
    setLanguage(LANGUAGE_HISTORY, JSON.stringify(existingLanguage));
    props.setLang(() => supportedLangList[value]);
  }

  const filteredLanguagesList = useMemo(() => {
    const results = [];

    for (let key in supportedLangList) {
      const currentLang = supportedLangList[key];

      if (
        search &&
        currentLang.toLowerCase().search(search.toLowerCase()) !== -1
      ) {
        results.push({ id: currentLang, value: key });
      } else if (!search) {
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
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <img src="/code.png" alt="Navbarlogo" className="code-logo" />
          <Navbar.Brand>Code Lele</Navbar.Brand>

          <Navbar.Brand>Code Share</Navbar.Brand>

          <Nav className="me-auto">
            <Link
              className="p-2"
              style={{ textDecoration: "none", color: "white" }}
              to={"/"}
            >
              Home
            </Link>
            {Location.pathname.startsWith("/") ? (
              <Dropdown onSelect={onSelectLang}>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
            {Location.pathname.startsWith("/code/") ? (
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
            ) : null}
          </Nav>

          {isAuthenticated === false ? (
            <button
              type="button"
              className="m-1 btn btn-outline-secondary btn-sm"
              onClick={loginWithRedirect}
            >
              Sign In/ Sign Up
            </button>
          ) : (
            <div className="Profile">
              <div className="Profile-Box">
                {isAuthenticated && <p className="ProfileName">{user.name}</p>}
              </div>

              <button
                type="button"
                className="m-1 btn btn-danger btn-sm"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </Container>
      </Navbar>
    </>
  );
  return () => {
    setSearch("");
  };
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
  )
);
