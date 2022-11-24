import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/confirm-dialog/ConfirmDialog";
import { LOGOUT_API } from "../utils/API_ROUTES";
import { DASHBOARD_PAGE, LOGIN_PAGE } from "../utils/APP_ROUTES";
import { API } from "../utils/axios/axiosConfig";
import { REMOVE_TOKEN, USER_INFO } from "../utils/session/token";
import Navbar from "./navbar/navbar";
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
      <Navbar />
      <Navbar1 />
      <main className="main-content">
        <div className="pt-0">{children}</div>
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
