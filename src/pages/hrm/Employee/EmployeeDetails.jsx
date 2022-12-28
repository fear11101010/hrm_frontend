import moment from "moment";
import React from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import Loader from "../../../components/loader/Loader";
import useFetch from "../../../hooks/useFetch";
import useSupervisor from "../../../hooks/useSupervisor";
import { EMPLOYEE_EACH_GET } from "../../../utils/routes/api_routes/API_ROUTES";
import { DATE_FORMAT } from "../../../utils/CONSTANT";

export default function EmployeeDetails({ rowId }) {
  const id = rowId;
  const { data, isLoading } = useFetch(EMPLOYEE_EACH_GET(id));
  const supervisorList = useSupervisor();
  console.log(supervisorList);

  return (
    <>
      {isLoading && <Loader />}
      <Card>
        <Card.Body className="d-flex justify-content-between align-items-center">
          <div className="w-50">
            <h2 className="mb-1">{data.data?.name}</h2>
            <h3 className="mb-1 text-secondary">{data.data?.employee_id}</h3>
            <h5 className="text-secondary">{data.data?.designation}</h5>
          </div>
          <div className="w-50">
            <Row>
              <Col sm="12" md="4">
                <h4 className="mb-1">SBU</h4>
                <h5 className="text-secondary">{data.data?.sbu?.name}</h5>
              </Col>
              <Col sm="12" md="4">
                <h4 className="mb-1">Sub SBU</h4>
                <h5 className="text-secondary">{data.data?.sub_sbu?.name}</h5>
              </Col>
              <Col sm="12" md="4">
                <h4 className="mb-1"> Date of Joining</h4>
                <h5 className="text-secondary">{moment(data.data?.date_of_joining).format(DATE_FORMAT)}</h5>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>

      {/* Salary And Benifits */}
      <Accordion className="mb-3">
        <Accordion.Item className="bg-white" eventKey="0">
          <Accordion.Header>
            <h4 className="mb-0">Salary and Benifits </h4>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col sm="12" md="3" className="mb-2">
                <h4 className="mb-1">Total Salary and Allowance</h4>
                <h5 className="text-secondary">{data.data?.total_salary_and_allowance?.toLocaleString("en-IN")}</h5>
              </Col>
              <Col sm="12" md="3" className="mb-2">
                <h4 className="mb-1">Gross</h4>
                <h5 className="text-secondary">{data.data?.gross_salary?.toLocaleString("en-IN")}</h5>
              </Col>
              <Col sm="12" md="3" className="mb-2">
                <h4 className="mb-1">Basic</h4>
                <h5 className="text-secondary">{data.data?.basic_salary?.toLocaleString("en-IN")}</h5>
              </Col>
              <Col sm="12" md="3" className="mb-2">
                <h4 className="mb-1">PF Contribution</h4>
                <h5 className="text-secondary">{data.data?.pf_com_contribution?.toLocaleString("en-IN")}</h5>
              </Col>
              <Col sm="12" md="3" className="mb-2">
                <h4 className="mb-1">House Rent</h4>
                <h5 className="text-secondary">{data.data?.house_rent?.toLocaleString("en-IN")}</h5>
              </Col>
              <Col sm="12" md="3" className="mb-2">
                <h4 className="mb-1">Medical Allowance</h4>
                <h5 className="text-secondary">{data.data?.medical_allowance?.toLocaleString("en-IN")}</h5>
              </Col>
              <Col sm="12" md="3" className="mb-2">
                <h4 className="mb-1">Conveyance Allowance</h4>
                <h5 className="text-secondary">{data.data?.conveyance_allowance?.toLocaleString("en-IN")}</h5>
              </Col>
              <Col sm="12" md="3" className="mb-2">
                <h4 className="mb-1">WPPF</h4>
                <h5 className="text-secondary">{data.data?.wppf?.toLocaleString("en-IN")}</h5>
              </Col>
              <Col sm="12" md="3" className="mb-2">
                <h4 className="mb-1">Special Bonus</h4>
                <h5 className="text-secondary">{data.data?.special_bonus?.toLocaleString("en-IN")}</h5>
              </Col>
              <Col sm="12" md="3" className="mb-2">
                <h4 className="mb-1">Mobile and Other Allowance</h4>
                <h5 className="text-secondary">{data.data?.mobile_and_other_allowance?.toLocaleString("en-IN")}</h5>
              </Col>
              <Col sm="12" md="3" className="mb-2">
                <h4 className="mb-1">Increment</h4>
                <h5 className="text-secondary">{data.data?.increment?.toLocaleString("en-IN")}</h5>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Projects and Others */}
      <Accordion className="mb-3">
        <Accordion.Item className="bg-white" eventKey="0">
          <Accordion.Header>
            <h4 className="mb-0">Projects and Others</h4>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col sm="12" md="3" className="mb-2">
                <h4 className="mb-1">Supervisor</h4>
                <h5 className="text-secondary">{supervisorList?.map((d) => d.id === data.data?.supervisor && d.name)}</h5>
              </Col>
              <Col sm="12" md="3" className="mb-2">
                <h4 className="mb-1">Projects</h4>
                <h5 className="text-secondary">{data.data?.project}</h5>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
