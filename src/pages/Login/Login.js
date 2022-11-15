import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { LOGIN_API } from "../../utils/API_ROUTES";
import { DASHBOARD_PAGE } from "../../utils/APP_ROUTES";
import { HTTP_LOGIN } from "../../utils/axios/axiosConfig";
import SET_TOKEN, { GET_TOKEN } from "../../utils/session/token";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState("");

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    HTTP_LOGIN.post(LOGIN_API, { username: username, password: pass })
      .then((res) => {
        if (res.data.statuscode === 200) {
          SET_TOKEN(res.data.token);
          setLoading(false);
          navigate(DASHBOARD_PAGE);
          setErrMsg("");
        } else {
          setErrMsg(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(err.response.data.non_field_errors[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const error_alert = () => (
    <div className="alert alert-danger" role="alert">
      {errMsg}
    </div>
  );

  return GET_TOKEN() ? (
    <Navigate to={DASHBOARD_PAGE} />
  ) : (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      {loading && <Loader />}
      <div className="card shadow-sm w-25">
        <div className="card-body">
          <h2 className="text-primary">Login</h2>
          <hr />
          {errMsg && error_alert()}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                value={pass}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4" disabled={loading}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
