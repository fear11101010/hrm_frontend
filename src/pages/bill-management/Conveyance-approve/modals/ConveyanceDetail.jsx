import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import { API } from "../../../../utils/axios/axiosConfig";
import { CONVEYANCE_EACH_GET_API } from "../../../../utils/routes/api_routes/BILL_API_ROUTES";

export default function ConveyanceDetail({ id }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    API.get(CONVEYANCE_EACH_GET_API(id))
      .then((res) => {
        if (res.data.statuscode === 200) {
          setData(res?.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <Row>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0 text-secondary">Invoice Code</Form.Label>
            <h5 className="mb-0">{data?.conveyance?.map((d) => d?.invoice_code)}</h5>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0 text-secondary">Invoice Date</Form.Label>
            <h5 className="mb-0">{moment(data?.conveyance?.map((d) => d?.conveyance_date)).format("DD-MM-YYYY")}</h5>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0 text-secondary"> Project Name</Form.Label>
            <h5 className="mb-0">{data?.conveyance?.map((d) => d?.project?.name)}</h5>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0 text-secondary"> Employee Name</Form.Label>
            <h5 className="mb-0">
              {data?.conveyance?.map((d) => d?.employee?.name + " (" + d?.employee?.employee_id + ") ")}
            </h5>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="mb-0 text-secondary"> Employee Designation</Form.Label>
            <h5 className="mb-0">{data?.conveyance?.map((d) => d?.employee?.designation)}</h5>
          </Form.Group>
        </Col>
      </Row>

      <div className="bg-white mt-3">
        <Table size="sm" bordered>
          <thead>
            <tr>
              <th style={{ width: "12%" }}>Date</th>
              <th style={{ width: "15%" }}>From</th>
              <th style={{ width: "15%" }}>To</th>
              <th style={{ width: "25%" }}>Purpose of visit</th>
              <th style={{ width: "25%" }}>Mode of Transport</th>
              <th style={{ width: "8%" }} className="text-end">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.conveyance_items?.map((d) => (
              <tr>
                <td>{moment(d?.date).format("DD-MM-YYYY")}</td>
                <td>{d?.purposefrom}</td>
                <td>{d?.purposeto}</td>
                <td>{d?.purposevisit}</td>
                <td>{d?.modetransport}</td>
                <td className="text-end">{d?.amount}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} className="text-end">
                <h4 className="mb-0">Total Amount: </h4>
              </td>
              <td>
                <h4 className="mb-0 text-end">{data?.conveyance?.map((d) => d?.totalamount)}</h4>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
