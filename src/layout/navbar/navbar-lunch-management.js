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
  ASSESTMENT_EMPLOYER_REPORT,
  ASSESSMENT_YEAR_REPORT,
  DASHBOARD_PAGE,
  EMPLOYEE_ASSESTMENT_PAGE,
  EMPLOYEE_LIST_PAGE,
  EMPLOYEE_PERFORMANCE_INDEX_PAGE,
  EMPLOYEE_PERFORMANCE_PAGE,
  KPI_ALL_EMPLOYEE_ASSESTMENT_PAGE,
  KPI_ASSESTMENT_PAGE,
  KPI_EMPLOYEE_ASSIGN_PAGE,
  KPI_PERMORMANCE_FORM_PAGE,
  KPI_PERMORMANCE_FORM_URL,
  KPI_PERMORMER_ASSESTMENT_PAGE,
  LOGIN_PAGE,
  SALARY_FULL_REPORT_URL,
  SALARY_INCREMENT_ELIGIBLE_REPORT_URL,
  SALARY_PIVOT_SUMMARY_REPORT_URL,
  USER_LIST_PAGE,
  USER_ROLE_LIST_PAGE,
  REQUISITION_RESOURCE_LIST,
  SALARY_INCREMENT_REPORT,
  SBU_ASSESTMENT_REPORT,
  SUPERVISOR_ASSESTMENT_PERFORMANE_PAGE,
  SUPERVISOR_APPRAISAL_REVIEW_PAGE,
  FILE_UPLOAD_PAGE,
  BILL_LIST,
  ASSESTMENT_SUMMARY_REPORT,
  BILL_LIST_URL,
  CONVEYANCE_LIST_URL,
  REQUISITION_FORM,
  REQUISITION_LIST,
} from "../../utils/routes/app_routes/APP_ROUTES";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../utils/axios/axiosConfig";
import { LOGOUT_API } from "../../utils/routes/api_routes/API_ROUTES";
import Loader from "../../components/loader/Loader";
import { REMOVE_TOKEN, USER_INFO } from "../../utils/session/token";
import ConfirmDialog from "../../components/confirm-dialog/ConfirmDialog";
import { AiOutlineAudit } from "react-icons/ai";
import { FaMoneyBill, FaTicketAlt } from "react-icons/fa";
import {
  ALL_TICKETS_URL,
  MY_TICKETS_URL,
  OTHER_TICKETS_URL,
  SUPPORT_DASHBOARD_URL,
} from "../../utils/routes/app_routes/SP_APP_ROUTES";
import { LUNCH_ORDER_PAGE } from "../../utils/routes/app_routes/LUNCH_ROUTES";
export default function NavbarLunchManagement() {
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
            <Link to={SUPPORT_DASHBOARD_URL}>
              <img src="/img/logo.svg" className="navbar-brand-img mx-auto" alt="..." />
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse id="sidebarCollapse">
            <Nav as="ul">
              {/* Dashboard */}
              {user.module.includes("Support Dashboard") && (
                <Nav.Item as={"li"}>
                  <Link to={SUPPORT_DASHBOARD_URL} className="nav-link">
                    <i className="fe fe-grid"></i> Dashboard
                  </Link>
                </Nav.Item>
              )}
              {user.sub_module.includes("Requisition From") && (
                <Nav.Item as={"li"}>
                  <Nav.Link
                    onClick={() => openOrCloseMenu(3)}
                    href="#"
                    className={menuOpenCloseState[3] ? "collapsed" : ""}
                    data-bs-toggle="collapse"
                    role="button"
                    aria-expanded={menuOpenCloseState[3] ? "true" : "false"}
                    aria-controls="sidebarReport"
                  >
                    <i className="fe fe-file-text"></i> Lunch
                  </Nav.Link>
                  <Collapse in={menuOpenCloseState[3]}>
                    <div id="sidebarDashboards">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          {/* {user.module.includes("Requisition From Entry") && ()} */}
                          <Link className={"nav-link"} to={LUNCH_ORDER_PAGE}>
                            Order Lunch
                          </Link>
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
