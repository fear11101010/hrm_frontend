import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Collapse } from "react-bootstrap";
import { useState } from "react";
import {
  EMPLOYEE_LIST_PAGE,
  FILE_UPLOAD_PAGE,
  INNER_LANDING,
  LOGIN_PAGE,
  USER_LIST_PAGE,
  USER_ROLE_LIST_PAGE,
} from "../../utils/routes/app_routes/APP_ROUTES";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../utils/axios/axiosConfig";
import { LOGOUT_API } from "../../utils/routes/api_routes/API_ROUTES";
import Loader from "../../components/loader/Loader";
import { REMOVE_TOKEN, USER_INFO } from "../../utils/session/token";
import ConfirmDialog from "../../components/confirm-dialog/ConfirmDialog";
import { SUPPORT_DASHBOARD_URL } from "../../utils/routes/app_routes/SP_APP_ROUTES";
import {
  LUNCH_DASHBOARD_PAGE,
  LUNCH_ORDER_PAGE,
  SUBSIDY_COST_LIST_PAGE,
  SUBSIDY_LIST_PAGE,
} from "../../utils/routes/app_routes/LUNCH_ROUTES";
export default function NavbarConfiguration() {
  const user = USER_INFO();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [menuOpenCloseState, setMenuOpenCloseState] = useState([false]);
  const [isConfirm, setIsConfirm] = useState(false);

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

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsConfirm(true);
  };
  return (
    <>
      <Navbar expand="md" fixed="top" variant="light" className="navbar-vertical pb-0 border fixed-start">
        {loading && <Loader />}
        <Container fluid>
          <Navbar.Toggle aria-controls="sidebarCollapse" />
          <Navbar.Brand>
            <Link to={INNER_LANDING}>
              <img src="/img/logo.svg" className="navbar-brand-img mx-auto" alt="..." />
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse id="sidebarCollapse">
            <Nav as="ul">
              {/* Dashboard */}
              {/* MANAGEMENT */}
              {user.sub_module.includes("User Management") && (
                <Nav.Item as={"li"}>
                  <Link
                    onClick={() => openOrCloseMenu(0)}
                    to="#"
                    className={`${menuOpenCloseState[0] ? "collapsed" : ""} nav-link`}
                    data-bs-toggle="collapse"
                    role="button"
                    aria-expanded={menuOpenCloseState[0] ? "true" : "false"}
                    aria-controls="sidebarUser"
                  >
                    <i className="fe fe-users"></i> Management
                  </Link>
                  <Collapse in={menuOpenCloseState[0]}>
                    <div id="sidebarUser">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          {user.module.includes("User") && (
                            <Link className={"nav-link"} to={USER_LIST_PAGE}>
                              User
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {user.module.includes("Role") && (
                            <Link className={"nav-link"} to={USER_ROLE_LIST_PAGE}>
                              Role
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {user.module.includes("Employee") && (
                            <Link className={"nav-link"} to={EMPLOYEE_LIST_PAGE}>
                              Employee
                            </Link>
                          )}
                        </li>
                      </ul>
                    </div>
                  </Collapse>
                </Nav.Item>
              )}

              {/* Configuration */}
              {user.sub_module.includes("Configuration") && (
                <Nav.Item as={"li"}>
                  <Link
                    onClick={() => openOrCloseMenu(1)}
                    to="#"
                    className={`${menuOpenCloseState[1] ? "collapsed" : ""} nav-link`}
                    data-bs-toggle="collapse"
                    role="button"
                    aria-expanded={menuOpenCloseState[1] ? "true" : "false"}
                    aria-controls="sidebarUser"
                  >
                    <i className="fe fe-settings"></i> Configuration
                  </Link>
                  <Collapse in={menuOpenCloseState[1]}>
                    <div id="sidebarUser">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          {user.module.includes("File Upload") && (
                            <Link className={"nav-link"} to={FILE_UPLOAD_PAGE}>
                              File Upload
                            </Link>
                          )}
                        </li>
                      </ul>
                    </div>
                  </Collapse>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>

          {/* LOGOUT */}
          <Nav as="ul" className="d-md-none">
            <Nav.Item as={"li"}>
              <Link
                to={SUPPORT_DASHBOARD_URL}
                onClick={(e) => {
                  handleConfirm(e);
                }}
                className="text-danger fw-bold nav-link px-0"
                title="Logout"
              >
                <h4 className="mb-0 d-flex justify-content-center align-items-center" style={{ padding: ".5rem 1.5rem" }}>
                  <i className="fe fe-log-out me-1"></i> Logout
                </h4>
              </Link>
            </Nav.Item>
          </Nav>
        </Container>

        {/* Logout Confirm Modal */}
        {isConfirm && (
          <ConfirmDialog
            message={"Are you sure you want to Logout?"}
            onOkButtonClick={handleLogout}
            onCancelButtonClick={(e) => setIsConfirm(false)}
          />
        )}
      </Navbar>
    </>
  );
}
