import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useOutletContext } from "react-router-dom";
import ShortUniqueId from "short-unique-id";
export default function HomePage() {
  const uid = new ShortUniqueId({ length: 7 });
  const [id, setId] = useState(uid.rnd());
  console.log(id);
  return (
    <div
      className="dark-theme"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link to={`/${id}`} style={{ textDecoration: "none", color: "black" }}>
        <button type="button" className="btn btn-warning">
          Share Code
        </button>
      </Link>
    </div>
  );
}
