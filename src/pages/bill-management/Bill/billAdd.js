import React, { useState } from "react";
import { Button, Col, Form, FormControl, Row, Table } from "react-bootstrap";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Layout from "../../../layout/Layout";
import { USER_INFO } from "../../../utils/session/token";
import DatePicker from "../../../components/date-picker/DatePicker";
import useProjects from "../../../hooks/useProjects";
import ReactSelect from "react-select";
import useEmployee from "../../../hooks/useEmployee";
import "./style.css";
import { RiAddFill, RiDeleteBin5Fill } from "react-icons/ri";
import moment from "moment";

export default function BillAdd() {
  const user = USER_INFO();
  const projectList = useProjects();
  const employeeList = useEmployee();

  //States
  const [invoice_date, setInvoice_date] = useState("");
  const [project_name, setProject_name] = useState("");
  const [employee_name, setEmployee_name] = useState("");
  const [subtotal, setSubTotal] = useState("");

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////// INVOICE ITEMS
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Mapping template which is object. Which will be act as a template
  const useInvoiceTemplate = { date: "", particular: "", unit: "", unit_price: "", total: "" };

  // The mapping template will be state as a array of obj
  const [invoiceItems, setInvoiceItems] = useState([useInvoiceTemplate]);

  //Adding new row logic. Which will hold the previous data and generate a new one, following the 'useMappingTemplate'
  const addItems = () => {
    setInvoiceItems([...invoiceItems, useInvoiceTemplate]);
  };

  // Configuration Table change logic
  const onItemChange = (e, index) => {
    const updateMapping = invoiceItems.map((map, i) =>
      i === index ? Object.assign(map, { [e.target.name]: e.target.value }) : map
    );
    const x = updateMapping?.map((d, i) =>
      i === index ? Object.assign(d, { ["total"]: (d.unit * d.unit_price).toFixed(2) }) : d
    );
    setInvoiceItems(x);

    const filter_total = x?.map((d, i) => parseFloat(d.total));
    const st = filter_total.reduce((partialSum, a) => partialSum + a, 0);
    setSubTotal(st);

    // basic logic
    // e.target.name === "unit_price"
    //           ? { ["unit_price"]: e.target.value, ["total"]: map.unit * map.unit_price }
    //           :
  };

  // Configuration Table individual row delete
  const removeItem = (index) => {
    //############ ORIGINAL ############
    const filterMapping = [...invoiceItems];
    filterMapping.splice(index, 1);
    setInvoiceItems(filterMapping);
  };

  //////////////////////
  // SUBMIT FUNC
  //////////////////////

  const handleSubmit = (e) => {
    e.prevntDefault();
  };
  return (
    <Layout>
      <PageHeader title="Add New Bill" onBack />
      <Content>
        <Form>
          <Row>
            <Col sm="12" md="3" className="mb-4">
              <Form.Group>
                <Form.Label>Invoice Date</Form.Label>
                <DatePicker
                  placeholder={"Invoice date"}
                  onChange={(e) => {
                    console.log(e);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <Form.Group>
                <Form.Label>Project Name</Form.Label>
                <ReactSelect options={projectList?.map((d) => ({ label: d.name, value: d.id }))} />
              </Form.Group>
            </Col>
            <Col sm="12" md="6">
              <Form.Group>
                <Form.Label>Employee Name</Form.Label>
                <ReactSelect
                  options={employeeList?.map((d) => ({ label: d.name + " (" + d.employee_id + ")", value: d.id }))}
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <Table className="bill_table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Particular</th>
                <th>Unit</th>
                <th>Unit Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((d, i) => (
                <tr>
                  <>
                    <td>{i + 1}</td>
                    <td>
                      <FormControl
                        type="date"
                        name="date"
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                        value={d.date}
                      />
                      {/* <DatePicker
                        name="date"
                        onChange={(e) => {
                          console.log(e);
                          onItemChange(e, i);
                        }}
                      /> */}
                    </td>
                    <td>
                      <Form.Control
                        placeholder="Particular"
                        name="particular"
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                        value={d.particular}
                      />
                    </td>
                    <td>
                      <Form.Control
                        placeholder="Unit"
                        name="unit"
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                        value={d.unit}
                      />
                    </td>
                    <td>
                      <Form.Control
                        placeholder="Unit Price"
                        name="unit_price"
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                        value={d.unit_price}
                      />
                    </td>
                    <td>
                      <Form.Control placeholder="Total Price" name="total" value={d.total} className="bg-light" disabled />
                    </td>
                    <td>
                      {invoiceItems?.length > 1 && (
                        <Button size="sm" variant="danger" onClick={() => removeItem(i)}>
                          <RiDeleteBin5Fill fill={"#fff"} />
                        </Button>
                      )}
                    </td>
                  </>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* ADD BUTTON */}
          <div className="d-flex justify-content-between">
            <Button
              size="sm"
              variant="secondary"
              className="d-flex justify-content-center align-items-center"
              title="Add More"
              onClick={addItems}
            >
              <RiAddFill fill={"#fff"} style={{ height: "24px", width: "24px" }} className="mr-0" />
            </Button>
            <div className="d-flex align-items-center bg-light p-2 rounded">
              <h4 className="mb-0">Grand Total: </h4>
              <h4 className="mb-0 ms-1">{subtotal}</h4>
            </div>
          </div>

          <hr />

          <Button type="submit" className="mt-5">
            Submit
          </Button>
        </Form>
      </Content>
    </Layout>
  );
}
