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
  DASHBOARD_PAGE,
  EMPLOYEE_ASSESTMENT_PAGE,
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
} from "../../utils/APP_ROUTES";
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
              <Link to={DASHBOARD_PAGE} className="nav-link">
                <i className="fe fe-home"></i> Dashboards
              </Link>
            </Nav.Item>

            {/* KPI */}
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
                <i className="fe fe-user"></i> User Management
              </Link>
              <Collapse in={menuOpenCloseState[0]}>
                <div id="sidebarUser">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Nav.Link href={USER_LIST_PAGE}> User </Nav.Link>
                    </li>
                    <li className="nav-item">
                      <Nav.Link href={KPI_EMPLOYEE_ASSIGN_PAGE}> Role </Nav.Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </Nav.Item>

            {/* KPI */}
            <Nav.Item as={"li"}>
              <Nav.Link
                onClick={() => openOrCloseMenu(1)}
                href="#"
                className={menuOpenCloseState[1] ? "collapsed" : ""}
                data-bs-toggle="collapse"
                role="button"
                aria-expanded={menuOpenCloseState[1] ? "true" : "false"}
                aria-controls="sidebarDashboards"
              >
                <i className="fe fe-home"></i> KPI
              </Nav.Link>

              <Collapse in={menuOpenCloseState[1]}>
                <div id="sidebarDashboards">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link className={"nav-link"} to={KPI_EMPLOYEE_ASSIGN_PAGE}>
                        Employee Assign
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className={"nav-link"} to={EMPLOYEE_PERFORMANCE_INDEX_PAGE}>
                        KPI Performance Form
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className={"nav-link"} to={KPI_ASSESTMENT_PAGE}>
                        KPI Assestment
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className={"nav-link"} to={KPI_PERMORMER_ASSESTMENT_PAGE}>
                        KPI Performer Assestment
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className={"nav-link"} to={KPI_ALL_EMPLOYEE_ASSESTMENT_PAGE}>
                        KPI All Employee Assestment
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className={"nav-link"} to={EMPLOYEE_ASSESTMENT_PAGE}>
                        {" "}
                        Employee Assestment
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className={"nav-link"} to={EMPLOYEE_PERFORMANCE_PAGE}>
                        Employee Performance
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </Nav.Item>
            <Nav.Item as={"li"}>
              <Nav.Link
                onClick={() => openOrCloseMenu(2)}
                href="#"
                className={menuOpenCloseState[2] ? "collapsed" : ""}
                data-bs-toggle="collapse"
                role="button"
                aria-expanded={menuOpenCloseState[2] ? "true" : "false"}
                aria-controls="sidebarDashboards"
              >
                <i className="fe fe-file-text"></i> Report
              </Nav.Link>

              <Collapse in={menuOpenCloseState[2]}>
                <div id="sidebarDashboards">
                  <ul className="nav nav-sm flex-column">
                    {/*<li className="nav-item">
                      <Link className={"nav-link"} to={SALARY_FULL_REPORT_URL}>
                        Salary Full Report
                      </Link>
                    </li>*/}
                    <li className="nav-item">
                      <Link className={"nav-link"} to={SALARY_PIVOT_SUMMARY_REPORT_URL}>
                        Salary Pivot Summary
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className={"nav-link"} to={SALARY_INCREMENT_ELIGIBLE_REPORT_URL}>
                        Increment Eligible
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </Nav.Item>

            {/* LOgOUT */}
            <Nav.Item as={"li"}>
              <Link
                to={DASHBOARD_PAGE}
                onClick={(e) => {
                  handleLogout(e);
                }}
                className="text-danger fw-bold nav-link"
              >
                <i className="fe fe-log-out"></i> logout
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navbar1;
