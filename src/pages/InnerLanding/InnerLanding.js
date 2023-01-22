import React, { useState } from "react";
import { Button, Card, Col, Dropdown, Modal, Nav, Navbar, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/confirm-dialog/ConfirmDialog";
import { LOGOUT_API } from "../../utils/routes/api_routes/API_ROUTES";
import {
  CONFIG_DASHBOARD,
  DASHBOARD_PAGE,
  LANDING_PAGE,
  REQUISITION_DASHBOARD,
} from "../../utils/routes/app_routes/APP_ROUTES";
import { API } from "../../utils/axios/axiosConfig";
import { REMOVE_TOKEN, SET_MODULE, USER_INFO } from "../../utils/session/token";
import { useIdleTimer } from "react-idle-timer";
// import "./layout.css";
import Container from "react-bootstrap/Container";
import { FaCogs, FaUser } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineLunchDining } from "react-icons/md";
import { SUPPORT_DASHBOARD_URL } from "../../utils/routes/app_routes/SP_APP_ROUTES";
import { LUNCH_DASHBOARD_PAGE } from "../../utils/routes/app_routes/LUNCH_ROUTES";
import "./innerLanding.css";
import kpi_svg from "./svgs/kpi-svg.svg";
import ticket_svg from "./svgs/ticket-svg.svg";
import lunch_svg from "./svgs/lunch.svg";
import config_svg from "./svgs/config-svg.svg";
import requisition_svg from "./svgs/requisition.webp";

export default function InnerLanding({ children }) {
  const user = USER_INFO();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [idleModal, setIdleModal] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    setLoading(true);
    API.post(LOGOUT_API)
      .then((res) => {
        if (res.data.statuscode === 200) {
          REMOVE_TOKEN();
          navigate(LANDING_PAGE);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setIsConfirm(false);
      });
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsConfirm(true);
  };

  // IDLE TIMER
  const onIdle = () => {
    setIdleModal(true);
  };

  const idleTimer = useIdleTimer({ onIdle, timeout: 1000 * 60 * 10 });

  const changeModule = (e, type) => {
    e.preventDefault();
    switch (type) {
      case "CONFIGURATION":
        SET_MODULE("configuration");
        navigate(CONFIG_DASHBOARD);
        break;
      case "HRM":
        SET_MODULE("hrm");
        navigate(DASHBOARD_PAGE);
        break;
      case "SUPPORT":
        SET_MODULE("support_system");
        navigate(SUPPORT_DASHBOARD_URL);
        break;
      case "LUNCH_MANAGEMENT":
        SET_MODULE("lunch_management");
        navigate(LUNCH_DASHBOARD_PAGE);
        break;
      case "REQUISITION":
        SET_MODULE("requisition");
        navigate(REQUISITION_DASHBOARD);
        break;
    }
  };

  return (
    <>
      <main className="main-content">
        <Navbar bg="white" className="navbar navbar-expand-md navbar-light">
          <Nav className="ms-auto px-5">
            <Dropdown>
              <Dropdown.Toggle variant="white" id="dropdown-basic" className="fw-bold border-0">
                {user.name}
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100 border bg-white">
                <Dropdown.Item>{user.username}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={(e) => {
                    handleConfirm(e);
                  }}
                  className="text-danger"
                >
                  <h5 className="mb-0 fw-bold">
                    <i className="fe fe-log-out me-1"></i> LOGOUT
                  </h5>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar>

        <div className="pt-3 d-flex align-items-center inner-page" style={{ minHeight: "calc(100vh - 63.5px)" }}>
          <Container fluid>
            {/*<Row className="justify-content-center">
               <Col sm={12} md={3} lg={3} className="mb-3">
                <Button
                  className="module-button border-0"
                  variant="light"
                  // onClick={(e) => changeModule(e, "CONFIGURATION")}
                >
                  <Card className="mb-0 shadow">
                    <Card.Body className="p-0">
                      <div className="d-flex justify-content-center align-items-center p-3 flex-column">
                        <img src={config_svg} alt="kpi" width={"120px"} />
                        <h3 className="mt-2">Configuration</h3>
                      </div>
                    </Card.Body>
                  </Card>
                </Button>
              </Col>

              <Col sm={12} md={3} lg={3} className="mb-3">
                <Button className="module-button border-0" variant="light" onClick={(e) => changeModule(e, "HRM")}>
                  <Card className="mb-0 shadow">
                    <Card.Body className="p-0">
                      <div className="d-flex justify-content-center align-items-center p-3 flex-column">
                         <FaUser size={32} />
                        <img src={kpi_svg} alt="kpi" width={"120px"} />
                        <h3 className="mt-2">KPI</h3>
                      </div>
                    </Card.Body>
                  </Card>
                </Button>
              </Col>
            </Row>*/}
            <Row className="justify-content-center">
              {/*<Col sm={12} md={3} lg={3} className="mb-3">
                <Button className="module-button border-0" variant="light" onClick={(e) => changeModule(e, "REQUISITION")}>
                  <Card className="mb-0 shadow">
                    <Card.Body className="p-0">
                      <div className="d-flex justify-content-center align-items-center p-3 flex-column">
                         <FaCogs size={32} />
                        <img src={requisition_svg} alt="kpi" width={"110px"} />
                        <h3 className="mt-2">Requisition</h3>
                      </div>
                    </Card.Body>
                  </Card>
                </Button>
              </Col>*/}
              <Col sm={12} md={3} lg={3} className="mb-3">
                <Button className="module-button border-0" variant="light" onClick={(e) => changeModule(e, "SUPPORT")}>
                  <Card className="mb-0 shadow">
                    <Card.Body className="p-0">
                      <div className="d-flex justify-content-center align-items-center p-3 flex-column">
                         <IoTicketOutline size={32} />
                        <img src={ticket_svg} alt="kpi" width={"140px"} />
                        <h3 className="mt-2">Ticketing System</h3>
                      </div>
                    </Card.Body>
                  </Card>
                </Button>
              </Col>
              {/*<Col sm={12} md={3} lg={3} className="mb-3">
                <Button
                  className="module-button border-0"
                  variant="light"
                  onClick={(e) => changeModule(e, "LUNCH_MANAGEMENT")}
                >
                  <Card className="mb-0 shadow">
                    <Card.Body className="p-0">
                      <div className="d-flex justify-content-center align-items-center p-3 flex-column">
                         <MdOutlineLunchDining size={32} />
                        <img src={lunch_svg} alt="kpi" width={"110px"} />
                        <h3 className="mt-2">Lunch Management</h3>
                      </div>
                    </Card.Body>
                  </Card>
                </Button>
              </Col>*/}
            </Row>
          </Container>
        </div>
      </main>

      {/* Logout Confirm Modal */}
      {isConfirm && (
        <ConfirmDialog
          message={"Are you sure you want to Logout?"}
          onOkButtonClick={handleLogout}
          onCancelButtonClick={(e) => setIsConfirm(false)}
        />
      )}
      <Modal show={idleModal} centered>
        <Modal.Body>
          <div className="text-center py-4">
            <h2 className="mb-2">You have been idle for 10 minute</h2>
            <h5 className="mb-4 text-danger">Please Logout and login again!</h5>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

{
  /* <div
  className="bg-white py-2 px-5 d-flex justify-content-end align-items-center border-bottom"
  style={{ minHeight: "42px" }}
  >
  <Dropdown>
    <Dropdown.Toggle variant="light" id="dropdown-basic" className="fw-bold border-0">
      {user.name}
    </Dropdown.Toggle>
    <Dropdown.Menu className="w-100">
      <Dropdown.Item>{user.username}</Dropdown.Item>
      <Dropdown.Item>Another action</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        onClick={(e) => {
          handleConfirm(e);
        }}
        className="text-danger"
      >
        <h5 className="mb-0 fw-bold">
          <i className="fe fe-log-out me-1"></i> LOGOUT
        </h5>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  </div> */
}
