import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/confirm-dialog/ConfirmDialog";
import { LOGOUT_API, USER_GROUP_CHANGE_API } from "../utils/routes/api_routes/API_ROUTES";
import {
  CONFIG_DASHBOARD,
  DASHBOARD_PAGE,
  LANDING_PAGE,
  LOGIN_PAGE,
  REQUISITION_DASHBOARD,
  UNAUTHORIZED,
} from "../utils/routes/app_routes/APP_ROUTES";
import { API } from "../utils/axios/axiosConfig";
import SET_TOKEN, { GET_MODULE, REMOVE_MODULE, REMOVE_TOKEN, SET_MODULE, USER_INFO } from "../utils/session/token";
import Navbar1 from "./navbar/navbar1";
import { useIdleTimer } from "react-idle-timer";
import "./layout.css";
import Select from "../components/select/Select";
import NavbarSupport from "./navbar/navbar-support";
import { SUPPORT_DASHBOARD_URL } from "../utils/routes/app_routes/SP_APP_ROUTES";
import { LUNCH_DASHBOARD_PAGE } from "../utils/routes/app_routes/LUNCH_ROUTES";
import NavbarLunchManagement from "./navbar/navbar-lunch-management";
import NavbarConfiguration from "./navbar/navbar-configuration";
import Loader from "../components/loader/Loader";
import NavbarRequisition from "./navbar/navbar-requisition";
import { BILLING_DASHBOARD } from "../utils/routes/app_routes/BILL_APP_ROUTE";
import NavbarBill from "./navbar/navbar-bill";

export default function Layout({ children }) {
  const [user, setUser] = useState(USER_INFO());
  const userGroups = user?.group_access?.map((ga) => ({ label: ga.name, value: ga.id }));
  const [currentSelectedGroup, setCurrentSelectedGroup] = useState(
    userGroups?.find((ug) => parseInt(ug.value) === parseInt(user.group_id || 0))
  );
  const modules = [
    // { label: "Configration", value: "configuration" },
    // { label: "Requisition", value: "requisition" },
    { label: "HRM", value: "hrm" },
    { label: "Ticketing System", value: "support_system" },
    { label: "Lunch Management", value: "lunch_management" },
    { label: "Bill Management", value: "bill_management" },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const excludePath = [LOGIN_PAGE];
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [idleModal, setIdleModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState(modules.find((v) => v?.value === GET_MODULE()));

  const handleLogout = (e) => {
    e.preventDefault();
    setLoading(true);
    API.post(LOGOUT_API)
      .then((res) => {
        if (res.data.statuscode === 200) {
          REMOVE_TOKEN();
          REMOVE_MODULE();
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

  const changeModule = (m) => {
    setSelectedModule(m);
    SET_MODULE(m?.value);
  };

  const changeUserGroup = (m) => {
    setCurrentSelectedGroup(m);
    setIsLoading(true);
    API.post(USER_GROUP_CHANGE_API, { group: m?.value })
      .then((res) => {
        REMOVE_TOKEN();
        SET_TOKEN(res.data?.token);
        setUser(USER_INFO());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        window.location.reload();
      });
  };

  const getNavBar = () => {
    const path = location.pathname;
    const cPath = excludePath.find((p) => path.includes(p));
    switch (GET_MODULE()) {
      case "hrm":
        if (!path?.includes("hrm") && !cPath) navigate(DASHBOARD_PAGE);
        return <Navbar1 />;
      case "support_system":
        if (!path?.includes("support") && !cPath) navigate(SUPPORT_DASHBOARD_URL);
        return <NavbarSupport />;
      case "lunch_management":
        if (!path?.includes("lunch") && !cPath) navigate(LUNCH_DASHBOARD_PAGE);
        return <NavbarLunchManagement />;
      case "configuration":
        if (!path?.includes("configuration") && !cPath) navigate(CONFIG_DASHBOARD);
        return <NavbarConfiguration />;
      case "requisition":
        if (!path?.includes("requisition") && !cPath) navigate(REQUISITION_DASHBOARD);
        return <NavbarRequisition />;
      case "bill_management":
        if (!path?.includes("bill_management") && !cPath) navigate(BILLING_DASHBOARD);
        return <NavbarBill />;
      default:
        return <Navbar1 />;
    }
  };

  return (
    <>
      {/*<CustomNavbar />*/}
      {getNavBar()}
      <main className="main-content">
        <Navbar bg="white" className="navbar navbar-expand-md navbar-light d-none d-md-flex">
          <Nav className="me-auto px-5">
            <Select options={modules} value={selectedModule} onChange={changeModule} />
          </Nav>
          <Nav className="ms-auto px-5">
            <Dropdown>
              <Dropdown.Toggle variant="white" id="dropdown-basic" className="fw-bold border-0">
                {user.name}
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100 border">
                <Dropdown.Item>{user.username}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <label>
                    <strong>Select a Group</strong>
                  </label>
                  <Select options={userGroups} value={currentSelectedGroup} onChange={changeUserGroup} />
                </Dropdown.Item>
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

        <div className="pt-3">{children}</div>
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
        <Modal.Body className="shadow-lg" style={{ border: "1px solid #dddddd", borderRadius: "4px" }}>
          <div className="text-center py-4">
            <h2 className="mb-2">You have been idle for 10 minute</h2>
            <h5 className="mb-4 text-danger">Please Logout and login again!</h5>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </Modal.Body>
      </Modal>
      {isLoading && <Loader />}
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
