import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Select from "react-select";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import useRole from "../../../hooks/user/useRole";
import Layout from "../../../layout/Layout";
import { UNAUTHORIZED, USER_LIST_PAGE } from "../../../utils/routes/app_routes/APP_ROUTES";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API } from "../../../utils/axios/axiosConfig";
import { USER_CREATE_POST } from "../../../utils/routes/api_routes/API_ROUTES";
import { success_alert, error_alert } from "../../../components/alert/Alert";
import { USER_INFO } from "../../../utils/session/token";

export default function UserAdd() {
  const user = USER_INFO();
  const navigate = useNavigate();
  const roleList = useRole()?.data?.map((d) => ({ label: d.name, value: d.id }));

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  //input states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFull_name] = useState("");
  const [joining_date, setJoining_date] = useState("");
  const [mobile_number, setMobile_number] = useState("");
  const [address, setAddress] = useState("");
  const [group, setGroup] = useState("");

  //err states
  const [usernameErr, setUserNameErr] = useState("");
  const [passErr, setPassErr] = useState("");

  // Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setUserNameErr("");
    setPassErr("");
    const payload = {
      username: username,
      email: email,
      password: password,
      full_name: full_name,
      joining_date: joining_date,
      mobile_number: mobile_number,
      address: address,
      group: group,
    };
    API.post(USER_CREATE_POST, payload)
      .then((res) => {
        if (res.data.statuscode === 200) {
          success_alert(res.data.message);
          navigate(-1);
        } else {
          error_alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        // Username Error
        if (err.response.data.error.username) {
          setUserNameErr(err.response.data.error.username);
        }

        // Password Error
        if (err.response.data.error.password) {
          if (err.response.data.error.password.length > 1) {
            setPassErr(err.response.data.error.password[0] + " " + err.response.data.error.password[1]);
            error_alert(err.response.data.error.password[0] + " " + err.response.data.error.password[1]);
          } else {
            setPassErr(err.response.data.error.password[0]);
            error_alert(err.response.data.error.password[0]);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return user.accessibility.includes("authuserAdd") ? (
    <Layout>
      {loading && <Loader />}
      <PageHeader title="User Add" onBack />
      <Content>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm="12" md="6">
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  placeholder="Enter fullname"
                  type="text"
                  values={full_name}
                  onChange={(e) => {
                    setFull_name(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="6">
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="Enter Username"
                  type="text"
                  values={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className={usernameErr ? "is-invalid" : ""}
                  required
                />
                {usernameErr && <div className="invalid-feedback">{usernameErr}</div>}
              </Form.Group>
            </Col>

            <Col sm="12" md="6">
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    placeholder="Enter Password"
                    type={showPass ? "text" : "password"}
                    values={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className={passErr ? "is-invalid" : ""}
                    required
                  />
                  <Button
                    variant="light"
                    className="ms-2"
                    onClick={() => {
                      setShowPass(!showPass);
                    }}
                    title={showPass ? " Hide Password" : "Show Password"}
                  >
                    {showPass ? <FaEye /> : <FaEyeSlash />}
                  </Button>
                </div>
                {passErr && <div className="invalid-feedback">{passErr}</div>}
              </Form.Group>
            </Col>
            <Col sm="12" md="6">
              <Form.Group className="mb-3">
                <Form.Label>User Group</Form.Label>
                <Select options={roleList} onChange={(e) => setGroup(e.value)} />
              </Form.Group>
            </Col>
            <Col sm="12" md="6">
              <Form.Group className="mb-3">
                <Form.Label>Joining Date</Form.Label>
                <Form.Control
                  placeholder="Enter Joining Date"
                  type="date"
                  values={joining_date}
                  onChange={(e) => {
                    setJoining_date(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="6">
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Enter Email"
                  type="email"
                  values={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="6">
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  placeholder="Enter Mobile Number"
                  type="text"
                  maxlength="11"
                  values={mobile_number}
                  onChange={(e) => {
                    setMobile_number(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="6">
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Enter Email"
                  type="email"
                  values={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="12">
              <Form.Group className="mb-3">
                <Form.Label> Address</Form.Label>
                <Form.Control
                  as={"textarea"}
                  rows={6}
                  placeholder="Enter Address"
                  type="text"
                  maxlength="11"
                  values={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <div>
              <Button type="submit" variant="primary">
                Submit
              </Button>
              <Link to={USER_LIST_PAGE}>
                <Button variant="light" className="ms-2">
                  Cancel
                </Button>
              </Link>
            </div>
          </Row>
        </Form>
      </Content>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
