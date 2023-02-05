import React, { useEffect, useState } from "react";
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
import { API } from "../../../utils/axios/axiosConfig";
import {
  CONVEYANCE_EACH_GET_API,
  CONVEYANCE_EACH_PUT_API,
  CONVEYANCE_POST,
} from "../../../utils/routes/api_routes/BILL_API_ROUTES";
import { error_alert, success_alert } from "../../../components/alert/Alert";
import { useNavigate, useParams } from "react-router-dom";
import useEmployeeDropdown from "../../../hooks/useEmployeeDropdown";
import Loader from "../../../components/loader/Loader";

export default function ConveyanceAdd() {
  const { id } = useParams();
  const user = USER_INFO();
  const projectList = useProjects();
  let { employeeDropdownLoading, employeeDropdownList } = useEmployeeDropdown();

  let navigate = useNavigate();

  //States
  const [loading, setLoading] = useState(false);
  const [selected_date, setSelected_date] = useState(id !== undefined ? "" : moment().format("YYYY-MM-DD"));
  const [project_name, setProject_name] = useState("");
  const [employee_name, setEmployee_name] = useState("");
  const [invoice_code, setInvoice_code] = useState("");
  const [subtotal, setSubTotal] = useState(0);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////// INVOICE ITEMS
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Mapping template which is object. Which will be act as a template
  const useInvoiceTemplate = {
    date: "",
    purposefrom: "",
    purposeto: "",
    purposevisit: "",
    modetransport: "",
    amount: 0,
  };

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
  // FETCH CONVETANCE WHEN EDIT
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const fetchConveyance = async () => {
    setLoading(true);
    try {
      const res = await API.get(CONVEYANCE_EACH_GET_API(id));
      if (res.data.statuscode === 200) {
        setSelected_date(res?.data?.conveyance[0]?.conveyance_date);
        setInvoice_code(res?.data?.conveyance[0]?.invoice_code);
        setProject_name(res?.data?.conveyance[0]?.project?.id);
        setEmployee_name(res?.data?.conveyance[0]?.employee?.id);
        setSubTotal(res?.data?.conveyance[0]?.totalamount);
        setInvoiceItems(res?.data?.conveyance_items);
      } else {
        error_alert("ERROR! please try again later");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id !== undefined) {
      fetchConveyance();
    }
  }, []);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // SUBMIT FUNC
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      invoice_post: {
        conveyance_date: selected_date,
        project: project_name,
        employee: employee_name,
        totalamount: subtotal,
      },
      particulars: invoiceItems,
      files: "",
    };

    let payload_when_update = {
      invoice_post: {
        conveyance_date: selected_date,
        project: project_name,
        employee: employee_name,
        totalamount: subtotal,
        invoice_code: invoice_code,
      },
      particulars: invoiceItems,
      files: "",
    };

    if (project_name === "" || employee_name === "") {
      error_alert("Please select all fields");
    } else {
      // WHILE PUT
      if (id !== undefined) {
        API.put(CONVEYANCE_EACH_PUT_API(id), payload_when_update)
          .then((res) => {
            if (res.data.statuscode === 200) {
              success_alert(res.data.message);
              navigate(-1, { replace: true });
            } else {
              error_alert("Error! please try again");
            }
          })
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      } else {
        setLoading(true);
        API.post(CONVEYANCE_POST, payload)
          .then((res) => {
            if (res.data.statuscode === 200) {
              success_alert(res.data.message);
              navigate(-1, { replace: true });
            } else {
              error_alert("Error! please try again");
            }
          })
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      }
    }
  };
  return (
    <Layout>
      {loading && <Loader />}
      {employeeDropdownLoading && <Loader />}
      <PageHeader title={id === undefined ? "Add New Conveyance " : "Update Conveyance "} onBack />
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
                  placeholder={projectList?.map((d) => d.id === project_name && d?.name)}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="6">
              <Form.Group>
                <Form.Label>Employee Name</Form.Label>
                <ReactSelect
                  options={employeeDropdownList?.map((d) => ({ label: d.name + " (" + d.employee_id + ")", value: d.id }))}
                  onChange={(e) => setEmployee_name(e.value)}
                  placeholder={employeeDropdownList?.map(
                    (d) => d.id === employee_name && d?.name + " (" + d?.employee_id + ")"
                  )}
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
                        required
                      />
                    </td>
                    <td style={{ minWidth: "50px" }}>
                      <Form.Control
                        placeholder="From"
                        name="purposefrom"
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                        value={d.purposefrom}
                        required
                      />
                    </td>
                    <td style={{ minWidth: "50px" }}>
                      <Form.Control
                        placeholder="To"
                        name="purposeto"
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                        value={d.purposeto}
                        required
                      />
                    </td>
                    <td style={{ minWidth: "50px" }}>
                      <Form.Control
                        placeholder="Purpose of Visit"
                        name="purposevisit"
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                        value={d.purposevisit}
                        required
                      />
                    </td>
                    <td style={{ minWidth: "50px" }}>
                      <Form.Control
                        placeholder="Mode of Transport"
                        name="modetransport"
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                        value={d.modetransport}
                        required
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
                        required
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
