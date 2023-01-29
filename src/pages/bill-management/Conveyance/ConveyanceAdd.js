import React, { useState } from "react";
import { Button, Col, Form, FormControl, Image, Row, Table } from "react-bootstrap";
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
import FileDropZone from "../../../components/FileDropZone";
import { FaFileExcel, FaFilePdf, FaFileWord, FaTrash } from "react-icons/fa";
import { API } from "../../../utils/axios/axiosConfig";
import { BILL_POST } from "../../../utils/routes/api_routes/BILL_API_ROUTES";

export default function ConveyanceAdd() {
  const user = USER_INFO();
  const projectList = useProjects();
  const employeeList = useEmployee();

  //States
  const [loading, setLoading] = useState(false);
  const [selected_date, setSelected_date] = useState("");
  const [invoice_date, setInvoice_date] = useState("");
  const [project_name, setProject_name] = useState("");
  const [employee_name, setEmployee_name] = useState("");
  const [files, setFiles] = useState([]);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [deletedFile, setDeletedFile] = useState([]);
  const [subtotal, setSubTotal] = useState(0);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////// INVOICE ITEMS
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Mapping template which is object. Which will be act as a template
  const useInvoiceTemplate = { date: "", from: "", to: "", purpose_of_visit: "", mode_of_transport: "", amount: 0 };

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

    const filter_total = updateMapping?.map((d, i) => parseFloat(d.amount));
    const st = filter_total.reduce((partialSum, a) => partialSum + a, 0);
    setSubTotal(st);
  };

  // Configuration Table individual row delete
  const removeItem = (index) => {
    //############ ORIGINAL ############
    const filterMapping = [...invoiceItems];
    filterMapping.splice(index, 1);
    setInvoiceItems(filterMapping);

    // Recalculating Subtotal
    const filter_total = filterMapping?.map((d, i) => parseFloat(d.amount));
    const st = filter_total.reduce((partialSum, a) => partialSum + a, 0);
    setSubTotal(st);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // SUBMIT FUNC
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      invoice_post: {
        invoice_date: selected_date,
        project: project_name,
        employee: employee_name,
        totalamount: subtotal,
      },
      particulars: invoiceItems,
      files: files,
    };
    setLoading(true);
    API.post(BILL_POST, payload)
      .then((res) => {})
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <Layout>
      <PageHeader title="Add New Bill" onBack />
      <Content>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm="12" md="3" className="mb-4">
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <DatePicker
                  placeholder={"date"}
                  dateFormat={"dd-mm-yyyy"}
                  value={selected_date && moment(selected_date).format("DD-MM-YYYY")}
                  onChange={(e) => setSelected_date(moment(e?._d).format("YYYY-MM-DD"))}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <Form.Group>
                <Form.Label>Project Name</Form.Label>
                <ReactSelect
                  options={projectList?.map((d) => ({ label: d.name, value: d.id }))}
                  onChange={(e) => setProject_name(e.value)}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="6">
              <Form.Group>
                <Form.Label>Employee Name</Form.Label>
                <ReactSelect
                  options={employeeList?.map((d) => ({ label: d.name + " (" + d.employee_id + ")", value: d.id }))}
                  onChange={(e) => setEmployee_name(e.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Invoice Table */}
          <Table responsive size="sm" className="bill_table mt-5">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Purpose of Visit</th>
                <th>Mode of Transport</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((d, i) => (
                <tr>
                  <>
                    <td>{i + 1}</td>
                    <td style={{ minWidth: "50px" }}>
                      <FormControl
                        placeholder="Date"
                        type="date"
                        name="date"
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                        value={d.date}
                      />
                    </td>
                    <td style={{ minWidth: "50px" }}>
                      <Form.Control
                        placeholder="From"
                        name="from"
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                        value={d.from}
                      />
                    </td>
                    <td style={{ minWidth: "50px" }}>
                      <Form.Control
                        placeholder="To"
                        name="to"
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                        value={d.to}
                      />
                    </td>
                    <td style={{ minWidth: "50px" }}>
                      <Form.Control
                        placeholder="Purpose of Visit"
                        name="purpose_of_visit"
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                        value={d.purpose_of_visit}
                      />
                    </td>
                    <td style={{ minWidth: "50px" }}>
                      <Form.Control
                        placeholder="Mode of Transport"
                        name="mode_of_transport"
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                        value={d.mode_of_transport}
                      />
                    </td>
                    <td style={{ minWidth: "50px" }}>
                      <Form.Control
                        placeholder="amount"
                        name="amount"
                        value={d.amount}
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                      />
                    </td>
                    <td>
                      {invoiceItems?.length > 1 && (
                        <Button size="sm" variant="danger" title="delete" onClick={() => removeItem(i)}>
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
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button
              size="sm"
              variant="secondary"
              className="d-flex justify-content-center align-items-center"
              title="Add More"
              onClick={addItems}
            >
              <RiAddFill fill={"#fff"} size={16} className="mr-0" /> Add Column
            </Button>
            <div className="d-flex" style={{ marginRight: "50px" }}>
              <h3 className="mb-0">Grand Total: </h3>
              <h3 className="mb-0 ms-1">{isNaN(subtotal) ? "0" : subtotal}</h3>
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
