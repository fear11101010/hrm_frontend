import React, { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Layout from "../../../layout/Layout";
import { USER_INFO } from "../../../utils/session/token";
import DatePicker from "../../../components/date-picker/DatePicker";
import useProjects from "../../../hooks/useProjects";
import ReactSelect from "react-select";
import useEmployee from "../../../hooks/useEmployee";
import "./style.css";

export default function BillAdd() {
  const user = USER_INFO();
  const projectList = useProjects();
  const employeeList = useEmployee();

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
    setInvoiceItems(updateMapping);
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
      <PageHeader title="Add New Bill" />
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
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {invoiceItems.map((d, i) => (
                  <>
                    <td>{i + 1}</td>
                    <td>
                      <DatePicker
                        placeholder={"Invoice date"}
                        onChange={(e) => {
                          console.log(e);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control placeholder="Particular" />
                    </td>
                    <td></td>
                  </>
                ))}
              </tr>
            </tbody>
          </Table>
          <Button type="submit" className="mt-5">
            Submit
          </Button>
        </Form>
      </Content>
    </Layout>
  );
}
