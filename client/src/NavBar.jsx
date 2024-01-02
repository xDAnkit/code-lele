import axios from "axios";
import React, { useState, forwardRef, useEffect } from "react";
import { Container, Dropdown, Form, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

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
  const [value, setValue] = useState("");
  //console.log(value);
  const Location = useLocation();
  useEffect(() => {
    if (location.pathname.split("/")[2]) {
      axios
        .get(
          `https://codesharebackendapi.onrender.com/${
            location.pathname.split("/")[2]
          }`
        )
        .then((res) => {
          const selectedKey = Object.keys(supportedLangList).find(
            (key) => res.data.language == supportedLangList[key]
          );
          setSelectLang(selectedKey);
        });
    }
  }, []);
  function onSelectLang(value) {
    setSelectLang(value);
    console.log(value);
    props.setLang(() => supportedLangList[value]);
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Code Share</Navbar.Brand>

          <Nav className="me-auto">
            <Link
              className="p-2"
              style={{ textDecoration: "none", color: "white" }}
              to={"/"}
            >
              Home
            </Link>
            {Location.pathname.startsWith("/code/") ? (
              <Dropdown onSelect={onSelectLang}>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  {selectedLang}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <ScrollableMenu>
                    <Form.Control
                      autoFocus
                      className="mx-3 my-2 w-auto"
                      placeholder="Type to filter..."
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                    />

                    {value
                      ? Object.keys(supportedLangList)
                          .sort()
                          .filter((Langauge) => {
                            console.log(
                              Langauge.toLowerCase().startsWith(value)
                            );
                            return Langauge.toLowerCase().startsWith(value);
                          })
                          .map((Langauge) => {
                            console.log(Langauge);
                            return (
                              <Dropdown.Item key={Langauge} eventKey={Langauge}>
                                {Langauge}
                              </Dropdown.Item>
                            );
                          })
                      : Object.keys(supportedLangList)
                          .sort()
                          .map((Langauge) => {
                            //console.log(Langauge);
                            return (
                              <Dropdown.Item key={Langauge} eventKey={Langauge}>
                                {Langauge}
                              </Dropdown.Item>
                            );
                          })}
                  </ScrollableMenu>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Container></Container>
            )}
          </Nav>
          <button
            type="button"
            className="m-1 btn btn-outline-secondary btn-sm"
          >
            Sign In
          </button>
          <button type="button" className="m-1 btn btn-danger btn-sm">
            Sign Up
          </button>
        </Container>
      </Navbar>
    </>
  );
}

const ScrollableMenu = forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => (
    <div
      ref={ref}
      style={{ ...style, overflow: "auto", maxHeight: "150px" }} // Adjust the maxHeight as needed
      className={className}
      aria-labelledby={labeledBy}
    >
      {children}
    </div>
  )
);
