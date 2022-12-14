import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LANDING_PAGE, LOGIN_PAGE } from "../../utils/APP_ROUTES";

export default function NavbarPublic() {
  return (
    <Navbar bg="white" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>
          <Link to={LANDING_PAGE}>
            <img
              src="/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to={LOGIN_PAGE}>
                <Button className="px-5">
                  <h4 className="mb-0">Login</h4>
                </Button>
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
