import React, { useState } from "react";
import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { error_alert, success_alert } from "../../../components/alert/Alert";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import useSbu from "../../../hooks/SBU/useSbu";
import useSubSbu from "../../../hooks/SBU/useSubSbu";
import useDesignation from "../../../hooks/useDesignation";
import useSupervisor from "../../../hooks/useSupervisor";
import Layout from "../../../layout/Layout";
import { API } from "../../../utils/axios/axiosConfig";
import { EMPLOYEE_ADD_POST } from "../../../utils/routes/api_routes/API_ROUTES";
import { EMPLOYEE_LIST_PAGE, UNAUTHORIZED } from "../../../utils/routes/app_routes/APP_ROUTES";
import { USER_INFO } from "../../../utils/session/token";
import ReactSelect from "react-select";
import ConfirmDialog from "../../../components/confirm-dialog/ConfirmDialog";
import { _Encrypt } from "../../../utils/Hash";

export default function EmployeeAdd() {
  const user = USER_INFO();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  // Input states
  const [name, setName] = useState("");
  const [emId, setEmId] = useState("");
  const [sbu, setSbu] = useState("");
  const [subSbu, setSubSbu] = useState("");
  const [designation, setDesignation] = useState("");
  const [date_of_joining, setDate_of_joining] = useState("");
  const [supervisor, setsupervisor] = useState("");
  const [level, setLevel] = useState("");

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

  //err state
  const [em_id_err, setEm_id_err] = useState("");

  //Hooks call
  const { data } = useSbu();
  const { subSbudata } = useSubSbu();
  const supervisorList = useSupervisor();
  const designationList = useDesignation();

  //Handle Confirm Modal
  const handleConfirmModal = (e) => {
    e.preventDefault();
    setIsConfirm(!isConfirm);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const payload = {
      sbu: sbu,
      name: name,
      status: "1",
      employee_id: emId,
      desig_id: designation,
      project: project,
      sub_sbu: subSbu,
      supervisor: supervisor,
      date_of_joining: date_of_joining,
      total_salary_and_allowance: _Encrypt(total_salary_and_allowance),
      basic_salary: _Encrypt(basic_salary),
      house_rent: _Encrypt(house_rent),
      medical_allowance: _Encrypt(medical_allowance),
      conveyance_allowance: _Encrypt(conveyance_allowance),
      wppf: _Encrypt(wppf),
      special_bonus: _Encrypt(special_bonus),
      mobile_and_other_allowance: _Encrypt(mobile_and_other_allowance),
      project_expense: project_expense,
      other_benefit: _Encrypt(other_benefit),
      gross_salary: _Encrypt(gross_salary),
      pf_com_contribution: _Encrypt(pf_com_contribution),
      level: level,
      increment: _Encrypt(increment),
    };
    console.log(payload);
    if (sbu === "" || subSbu === "" || designation === "" || supervisor === "") {
      error_alert("Please fill up all required fields");
      setIsConfirm(false);
    } else {
      setLoading(true);
      API.post(EMPLOYEE_ADD_POST, payload)
        .then((res) => {
          if (res.data.statuscode === 201) {
            success_alert(res.data.message);
            // navigate(-1);
          } else {
            error_alert(res.data.message);
          }
        })
        .catch((err) => {
          // console.log(err);
          console.log(err?.response?.data?.message?.employee_id);
          error_alert(err?.response?.data?.message?.employee_id[0]);
          setEm_id_err(err?.response?.data?.message?.employee_id[0]);
        })
        .finally(() => {
          setLoading(false);
          setIsConfirm(false);
        });
    }
  };
  if (!user.accessibility.includes("employee.POST")) {
    return <Navigate to={UNAUTHORIZED} />;
  }
  return (
    <Layout>
      {loading && <Loader />} <PageHeader title={"Add Employee"} onBack />{" "}
      <Content>
        <Form onSubmit={handleConfirmModal}>
          {/* General Info */}
          <Accordion className="mb-5">
            <Accordion.Item className="bg-white">
              <Accordion.Header>
                <h2 className="mb-0" style={{ fontWeight: 900 }}>
                  General
                </h2>
              </Accordion.Header>
              <Accordion.Body>
                <Row className="mb-0">
                  <Col sm="12" md="6" className="mb-3">
                    <Form.Group>
                      <Form.Label className="mb-1">
                        Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm="12" md="6" className="mb-3">
                    <Form.Group>
                      <Form.Label className="mb-1">
                        Employee ID <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        className={em_id_err ? "border-danger" : ""}
                        type="text"
                        placeholder="Enter Employee ID"
                        value={emId}
                        onChange={(e) => {
                          setEmId(e.target.value);
                        }}
                        required
                      />
                      {em_id_err !== "" && (
                        <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                  <Col sm="12" md="6" className="mb-3">
                    <Form.Group>
                      <Form.Label className="mb-1">
                        Designation <span className="text-danger">*</span>{" "}
                      </Form.Label>
                      <ReactSelect
                        options={designationList?.map((d) => ({ label: d.designation, value: d.id }))}
                        placeholder={designationList?.map((d) => d.id === designation && d.designation)}
                        onChange={(e) => {
                          setDesignation(e.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm="12" md="6" className="mb-3">
                    <Form.Group>
                      <Form.Label className="mb-1">
                        Level <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Level"
                        value={level}
                        onChange={(e) => {
                          setLevel(e.target.value);
                        }}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm="12" md="6" className="mb-3">
                    <Form.Group>
                      <Form.Label className="mb-1">
                        SBU <span className="text-danger">*</span>
                      </Form.Label>
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
                      <Form.Label className="mb-1">
                        Sub SBU <span className="text-danger">*</span>
                      </Form.Label>
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
                      <Form.Label className="mb-1">
                        Supervisor <span className="text-danger">*</span>
                      </Form.Label>
                      <ReactSelect
                        options={supervisorList?.map((d) => ({ label: d.name, value: d.id }))}
                        placeholder={supervisorList?.map((d) => d.id === supervisor && d.name)}
                        onChange={(e) => {
                          setsupervisor(e.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm="12" md="6" className="mb-3">
                    <Form.Group>
                      <Form.Label className="mb-1">
                        Date of Joining <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Enter Date of Joining"
                        value={date_of_joining}
                        onChange={(e) => {
                          setDate_of_joining(e.target.value);
                        }}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Salary and Benefits Info */}
          <Accordion className="mb-5">
            <Accordion.Item className="bg-white" eventKey="0">
              <Accordion.Header>
                <h2 className="mb-0">Salary and Benefits</h2>
              </Accordion.Header>
              <Accordion.Body>
                <Row className="mb-5">
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
                  <Col sm="12" md="4" className="mb-3">
                    <Form.Group>
                      <Form.Label className="mb-1"> WPPF</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter WPPF"
                        value={wppf}
                        onChange={(e) => {
                          setwppf(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm="12" md="4" className="mb-3">
                    <Form.Group>
                      <Form.Label className="mb-1"> Special Bonus</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Special Bonus"
                        value={special_bonus}
                        onChange={(e) => {
                          setspecial_bonus(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm="12" md="4" className="mb-3">
                    <Form.Group>
                      <Form.Label className="mb-1"> Mobile and Other Allowance</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Mobile and Other Allowance"
                        value={mobile_and_other_allowance}
                        onChange={(e) => {
                          setmobile_and_other_allowance(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm="12" md="4" className="mb-3">
                    <Form.Group>
                      <Form.Label className="mb-1"> Other Benefit</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Other Benefit"
                        value={other_benefit}
                        onChange={(e) => {
                          setother_benefit(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm="12" md="4" className="mb-3">
                    <Form.Group>
                      <Form.Label className="mb-1"> PF Com Contribution</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter PF Com Contribution"
                        value={pf_com_contribution}
                        onChange={(e) => {
                          setpf_com_contribution(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm="12" md="4" className="mb-3">
                    <Form.Group>
                      <Form.Label className="mb-1"> Increment</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Increment"
                        value={increment}
                        onChange={(e) => {
                          setincrement(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Projects */}
          <Accordion className="mb-5">
            <Accordion.Item className="bg-white" eventKey="0">
              <Accordion.Header>
                <h2 className="mb-0">Projects</h2>
              </Accordion.Header>
              <Accordion.Body>
                <Row className="mb-5">
                  <Col sm="12" md="6" className="mb-3">
                    <Form.Group>
                      <Form.Label className="mb-1">Project</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Project"
                        value={project}
                        onChange={(e) => {
                          setproject(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm="12" md="6" className="mb-3">
                    <Form.Group>
                      <Form.Label className="mb-1">Project Expense</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Project Expense"
                        value={project_expense}
                        onChange={(e) => {
                          setproject_expense(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="text-end">
            <Link to={EMPLOYEE_LIST_PAGE}>
              <Button variant="light" className="fw-bold me-2">
                Cancel
              </Button>
            </Link>
            {user.accessibility.includes("employee_update.PUT") && <Button type="submit">Create</Button>}
          </div>
        </Form>

        {isConfirm && (
          <ConfirmDialog
            message="Are you sure you want to update employee?"
            onOkButtonClick={handleUpdate}
            onCancelButtonClick={() => {
              setIsConfirm(false);
            }}
          />
        )}
      </Content>
    </Layout>
  );
}
