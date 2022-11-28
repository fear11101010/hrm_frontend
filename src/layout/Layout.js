import React, { useState } from "react";
import { Button, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/confirm-dialog/ConfirmDialog";
import { LOGOUT_API } from "../utils/API_ROUTES";
import { DASHBOARD_PAGE, LOGIN_PAGE } from "../utils/APP_ROUTES";
import { API } from "../utils/axios/axiosConfig";
import { REMOVE_TOKEN, USER_INFO } from "../utils/session/token";
import CustomNavbar from "./navbar/navbar";
import Navbar1 from "./navbar/navbar1";
import "./layout.css";

export default function Layout({ children }) {
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
    <>
      <CustomNavbar />
      <Navbar1 />
      <main className="main-content">
        <Navbar bg="white" fixed="top" style={{ zIndex: "99" }}>
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

        <div className="pt-6">{children}</div>
      </main>

      {/* Logout Confirm Modal */}
      {isConfirm && (
        <ConfirmDialog
          message={"Are you sure you want to Logout?"}
          onOkButtonClick={handleLogout}
          onCancelButtonClick={(e) => setIsConfirm(false)}
        />
      )}
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
