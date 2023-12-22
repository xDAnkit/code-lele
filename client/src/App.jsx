import "./styles.css";
import { useAuth0 } from "@auth0/auth0-react";

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
