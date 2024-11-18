import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import LanguageSelector from "../LanguageSelector/LanguageSelector.component";

export default function NavBar() {
  const { id } = useParams();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  console.log("User", isAuthenticated);
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className="nav-width">
          <img
            src="/codeshare-logo.png"
            alt="Navbarlogo"
            className="code-logo"
          />

          {/* <Navbar.Brand>Code Lele</Navbar.Brand> */}

          <Nav className="me-auto">
            <Link
              className="p-2"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
              }}
              to={"/"}
            >
              Home
            </Link>
            {id && <LanguageSelector />}
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
                className="m-1 btn btn-danger btn-sm logout-btn"
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
}
