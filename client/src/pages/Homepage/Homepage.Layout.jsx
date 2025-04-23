import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ShortUniqueId from "short-unique-id";
import NavBar from "../../components/organisms/Navbar/NavBar.Component";

export default function HomePage() {
  const id = useRef(new ShortUniqueId({ length: 7 }).rnd()).current;

  return (
    <div>
      <NavBar />
      <div
        className="dark-theme"
        style={{
          display: "flex",
          flexDirection: "column",
          height: `calc(100vh - ${0}px)`,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Link to={`/${id}`} className="btn-link">
          <button type="button" className="btn btn-warning">
            Share Code
          </button>
        </Link>
      </div>
    </div>
  );
}
