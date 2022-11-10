import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Collapse } from "react-bootstrap";
import { useState } from "react";
import { DASHBOARD_PAGE, LOGIN_PAGE } from "../../utils/APP_ROUTES";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../utils/axios/axiosConfig";
import { LOGOUT_API } from "../../utils/API_ROUTES";
import Loader from "../../components/loader/Loader";
import { REMOVE_TOKEN } from "../../utils/session/token";

function Navbar1(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [menuOpenCloseState, setMenuOpenCloseState] = useState([false]);
  const openOrCloseMenu = (i) => {
    // console.log(e);
    const menus = [...menuOpenCloseState];
    const currentMenuState = menuOpenCloseState[i];
    menus.fill(false);
    menus[i] = !currentMenuState;
    setMenuOpenCloseState(menus);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setLoading(true);
    API.post(LOGOUT_API)
      .then((res) => {
        if (res.data.statuscode === 200) {
          REMOVE_TOKEN();
          navigate(LOGIN_PAGE);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Navbar expand="md" fixed="top" variant="light" className="navbar-vertical">
      {loading && <Loader />}
      <Container fluid>
        <Navbar.Toggle aria-controls="sidebarCollapse" />
        <Navbar.Brand href="#">
          <img src="/img/logo.svg" className="navbar-brand-img mx-auto" alt="..." />
        </Navbar.Brand>
        <Navbar.Collapse id="sidebarCollapse">
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge input-group-reverse">
              <FormControl type="search" placeholder="Search" />
              <InputGroup.Text>
                <span className="fe fe-search"></span>
              </InputGroup.Text>
            </InputGroup>
          </Form>
          <Nav as="ul">
            {/* Dashboard */}
            <Nav.Item as={"li"}>
              <Nav.Link to={DASHBOARD_PAGE}>
                <i className="fe fe-home"></i> Dashboards
              </Nav.Link>
            </Nav.Item>

            {/* KPI */}
            <Nav.Item as={"li"}>
              <Nav.Link
                onClick={() => openOrCloseMenu(0)}
                href="#"
                className={menuOpenCloseState[0] ? "collapsed" : ""}
                data-bs-toggle="collapse"
                role="button"
                aria-expanded={menuOpenCloseState[0] ? "true" : "false"}
                aria-controls="sidebarDashboards"
              >
                <i className="fe fe-home"></i> KPI
              </Nav.Link>
              <Collapse in={menuOpenCloseState[0]}>
                <div id="sidebarDashboards">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a href="#" className="nav-link active">
                        Employee Assign
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link ">
                        KPI Performance Form
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link ">
                        KPI Assestment
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link ">
                        KPI Performer Assestment
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link ">
                        KPI All Employee Assestment
                      </a>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </Nav.Item>

            {/* LOgOUT */}
            <Nav.Item as={"li"}>
              <Nav.Link
                to={DASHBOARD_PAGE}
                onClick={(e) => {
                  handleLogout(e);
                }}
                className="text-danger fw-bold"
              >
                <i className="fe fe-log-out"></i> logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navbar1;
