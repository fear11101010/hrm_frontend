import React, { useState } from "react";
import { Button, Card, Col, Dropdown, Modal, Nav, Navbar, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/confirm-dialog/ConfirmDialog";
import { LOGOUT_API } from "../../utils/routes/api_routes/API_ROUTES";
import { DASHBOARD_PAGE, LANDING_PAGE, LOGIN_PAGE } from "../../utils/routes/app_routes/APP_ROUTES";
import { API } from "../../utils/axios/axiosConfig";
import { REMOVE_TOKEN, USER_INFO } from "../../utils/session/token";
import { useIdleTimer } from "react-idle-timer";
import "./innerLanding.css";
import CustomNavbar from "../../layout/navbar/navbar";
import Container from "react-bootstrap/Container";
import { FaUser } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineLunchDining } from "react-icons/md";

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

  return (
    <>
      <main className="main-content">
        <Navbar bg="white" className="navbar navbar-expand-md navbar-light d-none d-md-flex">
          <Nav className="ms-auto px-5">
            <Dropdown>
              <Dropdown.Toggle variant="white" id="dropdown-basic" className="fw-bold border-0">
                {user.name}
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100 border">
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

        <div className="pt-3 d-flex align-items-center" style={{ height: "calc(100vh - 63.5px)" }}>
          <Container fluid>
            <Row className="justify-content-center">
              <Col sm={12} md={3} lg={3}>
                <Link to={DASHBOARD_PAGE}>
                  <Card className="shadow border module_card">
                    <Card.Body>
                      <div className="d-flex justify-content-center align-items-center p-3 flex-column">
                        <FaUser size={32} />
                        <h3 className="mt-2">HRM Appraisal</h3>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col sm={12} md={3} lg={3}>
                <Card className="shadow border module_card">
                  <Card.Body>
                    <div className="d-flex justify-content-center align-items-center p-3 flex-column">
                      <IoTicketOutline size={32} />
                      <h3 className="mt-2">Ticketing System</h3>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} md={3} lg={3}>
                <Card className="shadow border module_card">
                  <Card.Body>
                    <div className="d-flex justify-content-center align-items-center p-3 flex-column">
                      <MdOutlineLunchDining size={32} />
                      <h3 className="mt-2">Lunch Management</h3>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
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
