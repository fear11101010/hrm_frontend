import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import ReactSelect from "react-select";
import { error_alert } from "../../components/alert/Alert";
import Content from "../../components/content/Content";
import PageHeader from "../../components/header/PageHeader";
import Loader from "../../components/loader/Loader";
import useSbu from "../../hooks/SBU/useSbu";
import useSubSbu from "../../hooks/SBU/useSubSbu";
import Layout from "../../layout/Layout";
import { EMPLOYEE_EACH_GET } from "../../utils/API_ROUTES";
import { UNAUTHORIZED } from "../../utils/APP_ROUTES";
import { API } from "../../utils/axios/axiosConfig";
import { USER_INFO } from "../../utils/session/token";

export default function EmployeeEdit() {
  const { id } = useParams();
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);

  // Input states
  const [name, setName] = useState("");
  const [emId, setEmId] = useState("");
  const [sbu, setSbu] = useState("");
  const [subSbu, setSubSbu] = useState("");
  const [date_of_joining, setDate_of_joining] = useState("");
  const [supervisor, setsupervisor] = useState("");

  const [total_salary_and_allowance, setTotal_salary_and_allowance] = useState("");
  const [basic_salary, setbasic_salary] = useState("");
  const [gross_salary, setgross_salary] = useState("");

  const [house_rent, sethouse_rent] = useState("");
  const [medical_allowance, setmedical_allowance] = useState("");
  const [conveyance_allowance, setconveyance_allowance] = useState("");
  const [wppf, setwppf] = useState("");
  const [special_bonus, setspecial_bonus] = useState("");
  const [mobile_and_other_allowance, setmobile_and_other_allowance] = useState("");
  const [other_benefit, setother_benefit] = useState("");
  const [pf_com_contribution, setpf_com_contribution] = useState("");
  const [increment, setincrement] = useState("");

  const [project_expense, setproject_expense] = useState("");
  const [project, setproject] = useState("");

  //Hooks call
  const { data } = useSbu();
  const { subSbudata } = useSubSbu();

  //Fetch
  useEffect(() => {
    setLoading(true);
    API.get(EMPLOYEE_EACH_GET(id))
      .then((res) => {
        if (res.data.statuscode === 200) {
          setName(res.data?.data?.name);
          setEmId(res.data?.data?.employee_id);
          setSbu(res.data?.data?.sbu?.id);
          setSubSbu(res.data?.data?.sub_sbu?.id);
          setDate_of_joining(res.data?.data?.date_of_joining);
          setTotal_salary_and_allowance(res.data?.data?.total_salary_and_allowance);
          setbasic_salary(res.data?.data?.basic_salary);
          setgross_salary(res.data?.data?.gross_salary);
        } else {
          error_alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  return user.accessibility.includes("EmployeeEdit") ? (
    <Layout>
      {loading && <Loader />}
      <PageHeader title={"Edit Employee"} onBack />
      <Content>
        <Form>
          {/* General Info */}
          <Row className="mb-4">
            <Col sm="12" md="12" className="mb-0">
              <h2 className="mb-2">General</h2>
              <hr className="mb-3 mt-0" />
            </Col>
            <Col sm="12" md="6" className="mb-3">
              <Form.Group>
                <Form.Label className="mb-1">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="6" className="mb-3">
              <Form.Group>
                <Form.Label className="mb-1">Employee ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Employee ID"
                  value={emId}
                  onChange={(e) => {
                    setEmId(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="6" className="mb-3">
              <Form.Group>
                <Form.Label className="mb-1">SBU</Form.Label>
                <ReactSelect
                  options={data?.map((d) => ({ label: d.name, value: d.id }))}
                  placeholder={data?.map((d) => d.id === sbu && d.name)}
                  onChange={(e) => {
                    setSbu(e.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="6" className="mb-3">
              <Form.Group>
                <Form.Label className="mb-1">Sub SBU</Form.Label>
                <ReactSelect
                  options={subSbudata?.map((d) => ({ label: d.name, value: d.id }))}
                  placeholder={subSbudata?.map((d) => d.id === subSbu && d.name)}
                  onChange={(e) => {
                    setSubSbu(e.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="6" className="mb-3">
              <Form.Group>
                <Form.Label className="mb-1">Date of Joining</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Date of Joining"
                  value={date_of_joining}
                  onChange={(e) => {
                    setDate_of_joining(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Salary and Benefits Info */}
          <Row className="mb-4">
            <Col sm="12" md="12" className="mb-0">
              <h2 className="mb-2">Salary and Benefits</h2>
              <hr className="mb-3 mt-0" />
            </Col>
            <Col sm="12" md="4" className="mb-3">
              <Form.Group>
                <Form.Label className="mb-1">Total Salary and Allowance</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Total Salary and Allowance"
                  value={total_salary_and_allowance}
                  onChange={(e) => {
                    setTotal_salary_and_allowance(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="4" className="mb-3">
              <Form.Group>
                <Form.Label className="mb-1">Basic Salary</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Basic Salary"
                  value={basic_salary}
                  onChange={(e) => {
                    setbasic_salary(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="4" className="mb-3">
              <Form.Group>
                <Form.Label className="mb-1">Gross Salary</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Gross Salary"
                  value={gross_salary}
                  onChange={(e) => {
                    setgross_salary(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="4" className="mb-3">
              <Form.Group>
                <Form.Label className="mb-1"> House Rent</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter House Rent"
                  value={house_rent}
                  onChange={(e) => {
                    sethouse_rent(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="4" className="mb-3">
              <Form.Group>
                <Form.Label className="mb-1"> Medical Allowance</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Medical Allowance"
                  value={medical_allowance}
                  onChange={(e) => {
                    setmedical_allowance(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="4" className="mb-3">
              <Form.Group>
                <Form.Label className="mb-1"> Conveyance Allowance</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Conveyance Allowance"
                  value={conveyance_allowance}
                  onChange={(e) => {
                    setconveyance_allowance(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Content>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
