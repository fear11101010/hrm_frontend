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
} from "../../utils/routes/app_routes/APP_ROUTES";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../utils/axios/axiosConfig";
import { LOGOUT_API } from "../../utils/routes/api_routes/API_ROUTES";
import Loader from "../../components/loader/Loader";
import { REMOVE_TOKEN, USER_INFO } from "../../utils/session/token";
import ConfirmDialog from "../../components/confirm-dialog/ConfirmDialog";
import { AiOutlineAudit } from "react-icons/ai";
import { FaMoneyBill } from "react-icons/fa";
import {
  ALL_TICKETS_URL,
  MY_TICKETS_URL,
  OTHER_TICKETS_URL,
  SUPPORT_DASHBOARD_URL,
} from "../../utils/routes/app_routes/SP_APP_ROUTES";
function Navbar1(props) {
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
            <Link to={DASHBOARD_PAGE}>
              <img src="/img/logo.svg" className="navbar-brand-img mx-auto" alt="..." />
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse id="sidebarCollapse">
            {/*<Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge input-group-reverse">
                <FormControl type="search" placeholder="Search" />
                <InputGroup.Text>
                  <span className="fe fe-search"></span>
                </InputGroup.Text>
              </InputGroup>
            </Form>*/}
            <Nav as="ul">
              {/* Dashboard */}
              <Nav.Item as={"li"}>
                <Link to={DASHBOARD_PAGE} className="nav-link">
                  <i className="fe fe-grid"></i> Dashboards
                </Link>
              </Nav.Item>

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

              {/* KPI */}
              {user.sub_module.includes("Kpi Management") && (
                <Nav.Item as={"li"}>
                  <Nav.Link
                    onClick={() => openOrCloseMenu(2)}
                    href="#"
                    className={menuOpenCloseState[2] ? "collapsed" : ""}
                    data-bs-toggle="collapse"
                    role="button"
                    aria-expanded={menuOpenCloseState[2] ? "true" : "false"}
                    aria-controls="sidebarKpi"
                  >
                    {/* <i className="fe fe-home"></i> */}
                    <AiOutlineAudit className="me-3" />
                    KPI
                  </Nav.Link>

                  <Collapse in={menuOpenCloseState[2]}>
                    <div id="sidebarKpi">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          {user.module.includes("Circularte To Employees") && (
                            <Link className={"nav-link"} to={KPI_EMPLOYEE_ASSIGN_PAGE}>
                              {/* Employee Assign */}
                              Circularte To Employees
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {user.module.includes("Appraisal Form") && (
                            <Link className={"nav-link"} to={EMPLOYEE_PERFORMANCE_INDEX_PAGE}>
                              {/* KPI Performance Form */}
                              Appraisal Form
                            </Link>
                          )}
                        </li>
                        {/* <li className="nav-item">
                      <Link className={"nav-link"} to={KPI_ASSESTMENT_PAGE}>
                        KPI Assestment
                      </Link>
                    </li> */}
                        <li className="nav-item">
                          {user.module.includes("Assessment Performance") && (
                            <Link className={"nav-link"} to={EMPLOYEE_ASSESTMENT_PAGE}>
                              {/* Employee Assestment */}
                              Assessment Performance
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {user.module.includes("Team Assessment Performance") && (
                            <Link className={"nav-link"} to={SUPERVISOR_ASSESTMENT_PERFORMANE_PAGE}>
                              {/* Employee Assestment */}
                              Team Assessment Performance
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {user.module.includes("Team Appraisal Review") && (
                            <Link className={"nav-link"} to={EMPLOYEE_PERFORMANCE_PAGE}>
                              {/* Employee Performance */}
                              Team Appraisal Review
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {user.module.includes("Supervisor Appraisal Review") && (
                            <Link className={"nav-link"} to={SUPERVISOR_APPRAISAL_REVIEW_PAGE}>
                              {/* Employee Performance */}
                              Supervisor Appraisal Review
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {user.module.includes("Performance Review") && (
                            <Link className={"nav-link"} to={KPI_PERMORMER_ASSESTMENT_PAGE}>
                              Performance Review
                            </Link>
                          )}

                          {/* KPI Performer Assestment */}
                        </li>
                        {/* <li className="nav-item">
                      <Link className={"nav-link"} to={KPI_ALL_EMPLOYEE_ASSESTMENT_PAGE}>
                        //  KPI All Employee Assestment
                        Employee wise appraisal
                      </Link>
                    </li> */}
                      </ul>
                    </div>
                  </Collapse>
                </Nav.Item>
              )}

              {/* BILL MANAGEMENT */}
              {user.sub_module.includes("Bill Management") && (
                <Nav.Item as={"li"}>
                  <Nav.Link
                    onClick={() => openOrCloseMenu(3)}
                    href="#"
                    className={menuOpenCloseState[3] ? "collapsed" : ""}
                    data-bs-toggle="collapse"
                    role="button"
                    aria-expanded={menuOpenCloseState[3] ? "true" : "false"}
                    aria-controls="sidebarKpi"
                  >
                    {/* <i className="fe fe-home"></i> */}
                    <FaMoneyBill className="me-3" />
                    Bill Management
                  </Nav.Link>

                  <Collapse in={menuOpenCloseState[3]}>
                    <div id="sidebarKpi">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          {user.module.includes("Circularte To Employees") && (
                            <Link className={"nav-link"} to={BILL_LIST_URL}>
                              {/* Employee Assign */}
                              Bill
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {user.module.includes("Appraisal Form") && (
                            <Link className={"nav-link"} to={CONVEYANCE_LIST_URL}>
                              {/* KPI Performance Form */}
                              Conveyance
                            </Link>
                          )}
                        </li>
                      </ul>
                    </div>
                  </Collapse>
                </Nav.Item>
              )}

              {/* BILL */}
              {/* {user.sub_module.includes("Configuration")}
              <Nav.Item as={"li"}>
                <Link
                  onClick={() => openOrCloseMenu(4)}
                  to="#"
                  className={`${menuOpenCloseState[4] ? "collapsed" : ""} nav-link`}
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded={menuOpenCloseState[4] ? "true" : "false"}
                  aria-controls="sidebarUser"
                >
                  <i className="fe fe-file"></i> Bill Management
                </Link>
                <Collapse in={menuOpenCloseState[4]}>
                  <div id="sidebarUser">
                    <ul className="nav nav-sm flex-column">
                      <li className="nav-item">
                        <Link className={"nav-link"} to={BILL_LIST}>
                          Bill
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Collapse>
              </Nav.Item> */}

              {/* Requisition  */}
              {/* {user.sub_module.includes("Report")}
              <Nav.Item as={"li"}>
                <Nav.Link
                  onClick={() => openOrCloseMenu(5)}
                  href="#"
                  className={menuOpenCloseState[5] ? "collapsed" : ""}
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded={menuOpenCloseState[5] ? "true" : "false"}
                  aria-controls="sidebarRequisition"
                >
                  <i className="fe fe-clipboard"></i> Requisition Form
                </Nav.Link>
                <Collapse in={menuOpenCloseState[5]}>
                  <div id="sidebarDashboards">
                    <ul className="nav nav-sm flex-column">
                      <li className="nav-item">
                        {user.module.includes("Salary Full Report")}
                        <Link className={"nav-link"} to={REQUISITION_RESOURCE_LIST}>
                          Resource Requisition
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Collapse>
              </Nav.Item> */}

              {/* Report */}
              {user.sub_module.includes("Report") && (
                <Nav.Item as={"li"}>
                  <Nav.Link
                    onClick={() => openOrCloseMenu(6)}
                    href="#"
                    className={menuOpenCloseState[6] ? "collapsed" : ""}
                    data-bs-toggle="collapse"
                    role="button"
                    aria-expanded={menuOpenCloseState[6] ? "true" : "false"}
                    aria-controls="sidebarReport"
                  >
                    <i className="fe fe-file-text"></i> Report
                  </Nav.Link>
                  <Collapse in={menuOpenCloseState[6]}>
                    <div id="sidebarDashboards">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          {user.module.includes("Salary Full Report") && (
                            <Link className={"nav-link"} to={SALARY_FULL_REPORT_URL}>
                              Salary Full Report
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {user.module.includes("Salary Pivot Summary") && (
                            <Link className={"nav-link"} to={SALARY_PIVOT_SUMMARY_REPORT_URL}>
                              Salary Pivot Summary
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {user.module.includes("Increment Eligible") && (
                            <Link className={"nav-link"} to={SALARY_INCREMENT_ELIGIBLE_REPORT_URL}>
                              Increment Eligible
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {user.module.includes("Assestment Year Report") && (
                            <Link className={"nav-link"} to={ASSESSMENT_YEAR_REPORT}>
                              Assessment Year Report
                            </Link>
                          )}
                        </li>

                        <li className="nav-item">
                          {user.module.includes("Assestment Employer Report") && (
                            <Link className={"nav-link"} to={ASSESTMENT_EMPLOYER_REPORT}>
                              Assessment Employer Report
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {user.module.includes("Salary Increment Report") && (
                            <Link className={"nav-link"} to={SALARY_INCREMENT_REPORT}>
                              Salary Increment Report
                            </Link>
                          )}
                        </li>
                        <li className="nav-item">
                          {user.module.includes("Sbu Assestment Report") && (
                            <Link className={"nav-link"} to={SBU_ASSESTMENT_REPORT}>
                              SBU Assessment
                            </Link>
                          )}
                        </li>

                        <li className="nav-item">
                          {user.module.includes("Assessment Summary Report") && (
                            <Link className={"nav-link"} to={ASSESTMENT_SUMMARY_REPORT}>
                              Assessment Summary Report
                            </Link>
                          )}
                        </li>
                      </ul>
                    </div>
                  </Collapse>
                </Nav.Item>
              )}

              {/* Support */}
              {user.sub_module.includes("Support") && (
                <Nav.Item as={"li"}>
                  <Nav.Link
                    onClick={() => openOrCloseMenu(7)}
                    href="#"
                    className={menuOpenCloseState[7] ? "collapsed" : ""}
                    data-bs-toggle="collapse"
                    role="button"
                    aria-expanded={menuOpenCloseState[7] ? "true" : "false"}
                    aria-controls="sidebarReport"
                  >
                    <i className="fe fe-file-text"></i> Support
                  </Nav.Link>
                  <Collapse in={menuOpenCloseState[7]}>
                    <div id="sidebarDashboards">
                      <ul className="nav nav-sm flex-column">
                        {user.module.includes("Support Dashboard") && (
                          <li className="nav-item">
                            <Link className={"nav-link"} to={SUPPORT_DASHBOARD_URL}>
                              Dashboard
                            </Link>
                          </li>
                        )}
                        {user.module.includes("My Tickets") && (
                          <li className="nav-item">
                            <Link className={"nav-link"} to={MY_TICKETS_URL}>
                              My Tickets
                            </Link>
                          </li>
                        )}
                        {user.module.includes("All Request") && (
                          <li className="nav-item">
                            <Link className={"nav-link"} to={ALL_TICKETS_URL}>
                              All Tickets
                            </Link>
                          </li>
                        )}
                        {user.module.includes("Other Request") && (
                          <li className="nav-item">
                            <Link className={"nav-link"} to={OTHER_TICKETS_URL}>
                              Request For Approval
                            </Link>
                          </li>
                        )}
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
                to={DASHBOARD_PAGE}
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
export default Navbar1;
