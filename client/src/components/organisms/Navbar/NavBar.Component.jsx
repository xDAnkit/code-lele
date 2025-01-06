import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import LanguageSelector from "../LanguageSelector/LanguageSelector.component";
import { LinkTag, TitleInput } from "./navbar-style";

import React, { useState } from "react";

import HistoryUI from "../History/History.Component";
import Modal from "../../templates/Modal/Modal.Component";

export default function NavBar({ title, setTitle }) {
  const { id } = useParams();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  console.log("User", isAuthenticated);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className="nav-width">
          <img src="/code.png" alt="Navbarlogo" className="code-logo" />

          <Navbar.Brand>Code Lele</Navbar.Brand>

          <Nav className="me-auto">
            <LinkTag className="p-2" to="/">
              Home
            </LinkTag>
            {id && (
              <>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    fontWeight: "700",
                  }}
                  onClick={handleOpen}
                >
                  History
                </button>
                <Modal
                  isOpen={isModalOpen}
                  onClose={handleClose}
                  title="My Codes History"
                >
                  <HistoryUI />
                </Modal>
              </>
            )}
            {id && (
              <TitleInput
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            )}

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
