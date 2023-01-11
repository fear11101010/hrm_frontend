import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Collapse } from "react-bootstrap";
import { useState } from "react";
import {
  INNER_LANDING,
  LOGIN_PAGE,
  REQUISITION_DASHBOARD,
  REQUISITION_FORM,
  REQUISITION_LIST,
} from "../../utils/routes/app_routes/APP_ROUTES";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../utils/axios/axiosConfig";
import { LOGOUT_API } from "../../utils/routes/api_routes/API_ROUTES";
import Loader from "../../components/loader/Loader";
import { REMOVE_TOKEN, USER_INFO } from "../../utils/session/token";
import ConfirmDialog from "../../components/confirm-dialog/ConfirmDialog";
import { SUPPORT_DASHBOARD_URL } from "../../utils/routes/app_routes/SP_APP_ROUTES";
export default function NavbarRequisition() {
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
              {user.module.includes("Support Dashboard") && (
                <Nav.Item as={"li"}>
                  <Link to={REQUISITION_DASHBOARD} className="nav-link">
                    <i className="fe fe-grid"></i> Dashboard
                  </Link>
                </Nav.Item>
              )}
              {user.sub_module.includes("Requisition From") && (
                <Nav.Item as={"li"}>
                  <Nav.Link
                    onClick={() => openOrCloseMenu(8)}
                    href="#"
                    className={menuOpenCloseState[8] ? "collapsed" : ""}
                    data-bs-toggle="collapse"
                    role="button"
                    aria-expanded={menuOpenCloseState[8] ? "true" : "false"}
                    aria-controls="sidebarReport"
                  >
                    <i className="fe fe-file-text"></i> Requisition From
                  </Nav.Link>
                  <Collapse in={menuOpenCloseState[8]}>
                    <div id="sidebarDashboards">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          {user.module.includes("Requisition From Entry") && (
                            <Link className={"nav-link"} to={REQUISITION_FORM}>
                              Resource Requisition
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {user.module.includes("Requisition From List") && (
                            <Link className={"nav-link"} to={REQUISITION_LIST}>
                              Resource Requisition List
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
