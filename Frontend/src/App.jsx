import "./styles.css";
import NavBar from "./NavBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
export default function App() {
  const [Lang, setLang] = useState("plaintext");
  return (
    <div className="App">
      <NavBar setLang={setLang} />
      <Outlet context={Lang} />
    </div>
  );
}
