import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import { INNER_LANDING, LOGIN_PAGE } from "../../utils/routes/app_routes/APP_ROUTES";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../utils/axios/axiosConfig";
import { LOGOUT_API } from "../../utils/routes/api_routes/API_ROUTES";
import Loader from "../../components/loader/Loader";
import { REMOVE_TOKEN, USER_INFO } from "../../utils/session/token";
import ConfirmDialog from "../../components/confirm-dialog/ConfirmDialog";
import { SUPPORT_DASHBOARD_URL } from "../../utils/routes/app_routes/SP_APP_ROUTES";
import {
  BILLING_DASHBOARD,
  BILL_APPROVE_LIST,
  BILL_LIST_URL,
  CONVEYANCE_APPROVE_LIST,
  CONVEYANCE_LIST_URL,
} from "../../utils/routes/app_routes/BILL_APP_ROUTE";

export default function NavbarBill() {
  const user = USER_INFO();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

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
            <Nav.Item as={"li"}>
              <Link to={BILLING_DASHBOARD} className="nav-link">
                <i className="fe fe-grid"></i> Dashboard
              </Link>
            </Nav.Item>
            {user?.module?.includes("Bill") && (
              <Nav.Item as={"li"}>
                <Link to={BILL_LIST_URL} className="nav-link">
                  <i className="fe fe-clipboard"></i> Bill
                </Link>
              </Nav.Item>
            )}

            {user?.module?.includes("Bill Approve") && (
              <Nav.Item as={"li"}>
                <Link to={BILL_APPROVE_LIST} className="nav-link">
                  <i className="fe fe-clipboard"></i> Bill Approve
                </Link>
              </Nav.Item>
            )}

            {user?.module?.includes("Conveyance") && (
              <Nav.Item as={"li"}>
                <Link to={CONVEYANCE_LIST_URL} className="nav-link">
                  <i className="fe fe-file-text"></i> Conveyance
                </Link>
              </Nav.Item>
            )}

            {user?.module?.includes("Conveyance Approve") && (
              <Nav.Item as={"li"}>
                <Link to={CONVEYANCE_APPROVE_LIST} className="nav-link">
                  <i className="fe fe-file-text"></i> Conveyance Approve
                </Link>
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
  );
}
