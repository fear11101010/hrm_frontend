import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Image, Row, Table } from "react-bootstrap";

import { API } from "../../../../utils/axios/axiosConfig";
import { BASE_URL_FOR_MEDIA_FILE } from "../../../../utils/CONSTANT";
import { BILL_EACH_GET } from "../../../../utils/routes/api_routes/BILL_API_ROUTES";
import InvoiceTemplate from "../../Bill/invoice/InvoiceTemplate";

export default function BillDetails({ bill_id }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    API.get(BILL_EACH_GET(bill_id))
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
      <InvoiceTemplate invoice_id={bill_id} />
      {/* FILES */}
    </div>
  );
}

{
  /* <Row>
<Col md={6}>
  <Form.Group className="mb-3">
    <Form.Label className="mb-0 text-secondary">Invoice Code</Form.Label>
    <h5 className="mb-0">{data?.invoice?.map((d) => d?.invoice_code)}</h5>
  </Form.Group>
</Col>
<Col md={6}>
  <Form.Group className="mb-3">
    <Form.Label className="mb-0 text-secondary">Invoice Date</Form.Label>
    <h5 className="mb-0">{moment(data?.invoice?.map((d) => d?.invoice_date)).format("DD-MM-YYYY")}</h5>
  </Form.Group>
</Col>
<Col md={6}>
  <Form.Group className="mb-3">
    <Form.Label className="mb-0 text-secondary"> Project Name</Form.Label>
    <h5 className="mb-0">{data?.invoice?.map((d) => d?.project_name)}</h5>
  </Form.Group>
</Col>
<Col md={6}>
  <Form.Group className="mb-3">
    <Form.Label className="mb-0 text-secondary"> Project Name</Form.Label>
    <h5 className="mb-0">{data?.invoice?.map((d) => d?.employee?.name + " (" + d?.employee?.employee_id + ") ")}</h5>
  </Form.Group>
</Col>
</Row>

<Table size="sm" bordered className="mb-5">
<thead>
  <tr>
    <th style={{ width: "15%" }}>Date</th>
    <th className="text-center" style={{ width: "70%" }}>
      Particulars
    </th>
    <th style={{ width: "15%" }} className="text-end">
      Amount
    </th>
  </tr>
</thead>
<tbody>
  {data?.invoice_items?.map((d) => (
    <tr>
      <td>{moment(d?.date).format("DD-MM-YYYY")}</td>
      <td>{d?.description}</td>
      <td className="text-end">{d?.cost}</td>
    </tr>
  ))}
  <tr>
    <td colSpan={2} className="text-end">
      <h4 className="mb-0">Total Amount: </h4>
    </td>
    <td>
      <h4 className="mb-0 text-end">{data?.invoice?.map((d) => d?.totalamount)}</h4>
    </td>
  </tr>
</tbody>
</Table> 
<hr />
      <h3 className="mb-3">Attached Files</h3>
      <Row>
        {data?.files?.map((d) => (
          <Col md={6}>
            <div className="p-3 border d-flex justify-content-between align-items-center">
              <h4 className="mb-0"> {d?.main_img?.split("/")[1]} </h4>
              <a href={BASE_URL_FOR_MEDIA_FILE + d?.main_img} target="_" download>
                <Button size="sm">
                  <i className="fe fe-download"></i> Download
                </Button>
              </a>
            </div>
          </Col>
        ))}
      </Row>
*/
}
