import React, { useState, useEffect, useRef } from "react";
import { Card, Col, Row, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Layout from "../../../layout/Layout";
import { RESOURCE_REQUISITION_DETAILS } from "../../../utils/routes/api_routes/API_ROUTES";
import { API } from "../../../utils/axios/axiosConfig";
import { HiArrowNarrowLeft } from "react-icons/hi";
import jsPDF from "jspdf";

export default function RequisitionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data_reason_recruitment, setdata_reason_recruitment] = useState([]);
  const [data_current_skill_matrix, setdata_current_skill_matrix] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const pdfRef = useRef();

  const generatePDF = () => {
    const report = new jsPDF("landscape", "pt", "a3");
    report.html(document.querySelector("#report")).then(() => {
      report.save("Requisition_Details.pdf");
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowLoading(true);
        const response = await API.get(RESOURCE_REQUISITION_DETAILS + id + "/");
        setData(response?.data?.data);
        setdata_reason_recruitment(response?.data?.data_reason_recruitment);
        setdata_current_skill_matrix(response?.data?.data_current_skill_matrix);
      } catch (err) {
      } finally {
        setShowLoading(false);
      }
    };

    fetchData();
  }, []);

  const data_body = () => {
    return (
      <div id="report" ref={pdfRef}>
        <Card>
          <Card.Body>
            <div className="form-group">
              <div className="table-responsive">
                <table className="table table-bordered table-md">
                  <thead>
                    <tr>
                      <th colspan="2" className="text-center">
                        Approval:
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <h4 className="mb-3">Comment & Signature of Unit Head:</h4>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={data?.comment_unit_head?.concat(
                            "\n\n",
                            data.unit_head ? data?.unit_head?.first_name + "(" + data?.unit_head?.username + ")" : ""
                          )}
                          readOnly
                        />
                      </td>
                      <td>
                        <h4 className="mb-3">Comment & Signature of SBU Director:</h4>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={data?.comment_sub_director?.concat(
                            "\n",
                            data.sbu_dir ? data?.sbu_dir?.first_name + "(" + data?.sbu_dir?.username + ")" : ""
                          )}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4 className="mb-3">Comment & Signature of Director Finance:</h4>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={data?.comment_director_finance?.concat(
                            "\n",
                            data.dir_finance ? data?.dir_finance?.first_name + "(" + data?.dir_finance?.username + ")" : ""
                          )}
                          readOnly
                        />
                      </td>
                      <td>
                        <h4 className="mb-3">Comment & Signature of Chief Executive Officer:</h4>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={data?.comment_chief_executive?.concat(
                            "\n",
                            data.dir_finance ? data?.dir_finance?.first_name + "(" + data?.dir_finance?.username + ")" : ""
                          )}
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4 className="mb-3">Comments (Head of HR):</h4>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={data?.comment_hr?.concat(
                            "\n",
                            data.hr ? data?.hr?.first_name + "(" + data?.hr?.username + ")" : ""
                          )}
                          readOnly
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header className="">
            <h2 className="mb-0 text-muted">Requisition Info</h2>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <h5 className="text-secondary mb-1">Requisition Raised By : </h5>
                <h3 className="mb-0"> {data?.created_by?.first_name + ` (${data?.created_by?.username})`}</h3>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <h5 className="text-secondary mb-1">Project : </h5>
                <h3 className="mb-0"> {data?.project?.name} </h3>
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={12} sm={12} md={4}>
                <h5 className="text-secondary mb-1">Project Head: </h5>
                <h3 className="mb-0"> {data?.project_head?.name + ` (${data?.project_head?.employee_id})`} </h3>
              </Col>
              <Col xs={12} sm={12} md={4}>
                <h5 className="text-secondary mb-1">SBU : </h5>
                <h3 className="mb-0"> {data?.sbu?.name}</h3>
              </Col>
              <Col xs={12} sm={12} md={4}>
                <h5 className="text-secondary mb-1">SBU Director : </h5>
                <h3 className="mb-0"> {data?.sbu_director_name?.name} </h3>
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={12} sm={12} md={4}>
                <h5 className="text-secondary mb-1">Quantity of Recruitment : </h5>
                <h3 className="mb-0"> {data?.quantity_requisition}</h3>
              </Col>
              <Col xs={12} sm={12} md={4}>
                <h5 className="text-secondary mb-1">Reason for Recruitment : </h5>
                <h3 className="mb-0"> {data?.reason_for_recruitment} </h3>
              </Col>
              <Col xs={12} sm={12} md={4}>
                <h5 className="text-secondary mb-1">Type of Recruitment : </h5>
                <h3 className="mb-0"> {data?.type_of_recruitment} </h3>
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={12} sm={12} md={4}>
                <h5 className="text-secondary mb-1">No of Resource : </h5>
                <h3 className="mb-0"> {data?.number_of_resource}</h3>
              </Col>
              <Col xs={12} sm={12} md={4}>
                <h5 className="text-secondary mb-1">Salary Range : </h5>
                <h3 className="mb-0"> {data?.salary_range} </h3>
              </Col>
              <Col xs={12} sm={12} md={4}>
                <h5 className="text-secondary mb-1">Source of Fund: </h5>
                <h3 className="mb-0"> {data?.source_of_fund} </h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <h2 className="text-secondary mb-1">Reason for Recruitment </h2>
          </Card.Header>
          <Card.Body>
            <Row>
              <div className="col-sm-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Project Invoice Amount (a)</th>
                      <th>Of Resources involved (b)</th>
                      <th>Total Resource Costing (c = b X total salaries)</th>
                      <th>Project Duration (d)</th>
                      <th>Project Cost (e = c x d)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} /> */}
                    {data_reason_recruitment.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <input
                              type="text"
                              value={data.project_invoice_amount}
                              name="project_invoice_amount"
                              className="form-control"
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={data.resources_involved}
                              name="resources_involved"
                              className="form-control"
                              disabled
                            />{" "}
                          </td>
                          <td>
                            <input
                              type="text"
                              value={data.total_resource_cost}
                              name="total_resource_cost"
                              className="form-control"
                              disabled
                            />{" "}
                          </td>
                          <td>
                            <input
                              type="text"
                              value={data.project_duration}
                              name="project_duration"
                              className="form-control"
                              disabled
                            />{" "}
                          </td>
                          <td>
                            <input
                              type="text"
                              value={data.project_cost}
                              name="project_cost"
                              className="form-control"
                              disabled
                            />{" "}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Row>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <div className="form-group">
              <div className="table-responsive">
                <table className="table table-bordered table-md">
                  <thead>
                    <tr>
                      <th colspan="2" className="text-center">
                        Required skills:
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">a. Minimum Skills</td>
                      <td className="text-center">b. Project special/Required skills</td>
                    </tr>
                    <tr>
                      <td>
                        <textarea className="form-control" value={data.skill} disabled></textarea>
                      </td>
                      <td>
                        <textarea className="form-control" value={data.required_skills} disabled></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <h2 className="text-secondary mb-1">Reason for Recruitment </h2>
          </Card.Header>
          <Card.Body>
            <Row>
              <div className="col-sm-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Employee Name</th>
                      <th>Designation</th>
                      <th>ID No</th>
                      <th>SBU</th>
                      <th>Sub SBU/project</th>
                      <th>Allocated Hour</th>
                      <th>Skill</th>
                      <th>Project Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} /> */}
                    {data_current_skill_matrix.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.employee_name.name}</td>
                          <td>{data.employee_name.designation}</td>
                          <td>{data.employee_name.employee_id}</td>
                          <td>{data.employee_name.sbu.name}</td>
                          <td>{data.employee_name.sub_sbu.name}</td>
                          <td>{data.allocated_hour}</td>
                          <td>{data.skill}</td>
                          <td>{data.project_revenue}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <Layout>
      {showLoading && <Loader />}
      <section className="container-fluid">
        <div className="card">
          <div className="card-body">
            <section className="section">
              <div className="section-header d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <Button className="me-2" variant="light" onClick={() => navigate(-1)} title="Go Back">
                    <HiArrowNarrowLeft />
                  </Button>
                  <h1 className="mb-0">Requisition Details</h1>
                </div>
                <div className="section-header-breadcrumb">
                  <div className="buttons">
                    <a onClick={generatePDF} className="btn btn-primary">
                      Certificate Request
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        {data_body()}
      </section>
    </Layout>
  );
}
