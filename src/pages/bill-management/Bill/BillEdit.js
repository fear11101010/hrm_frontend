import React, { useEffect, useState } from "react";
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
import { BILL_EACH_GET, BILL_POST } from "../../../utils/routes/api_routes/BILL_API_ROUTES";
import Loader from "../../../components/loader/Loader";
import { useParams } from "react-router-dom";
import { error_alert } from "../../../components/alert/Alert";

export default function BillEdit() {
  const { id } = useParams();
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
  const useInvoiceTemplate = { date: "", description: "", qty: "", cost: "", total: 0 };

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
    const x = updateMapping?.map((d, i) => (i === index ? Object.assign(d, { ["total"]: (d.qty * d.cost).toFixed(2) }) : d));
    setInvoiceItems(x);

    const filter_total = x?.map((d, i) => parseFloat(d.total));
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
    const filter_total = filterMapping?.map((d, i) => parseFloat(d.total));
    const st = filter_total.reduce((partialSum, a) => partialSum + a, 0);
    setSubTotal(st);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Fetch Func
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const fetchBill = () => {
    setLoading(true);
    API.get(BILL_EACH_GET(id))
      .then((res) => {
        if (res.data.statuscode === 200) {
          setSelected_date(res?.data?.invoice[0]?.invoice_date);
          setProject_name(res?.data?.invoice[0]?.project);
          setEmployee_name(res?.data?.invoice[0]?.employee);
          setFiles(res?.data?.files);
          setInvoiceItems(res?.data?.invoice_items);
        } else {
          error_alert("Error!!" + res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchBill();
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // File Submit
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const onDropFile = (acceptedFiles) => {
    console.log(acceptedFiles);
    setFiles((files) => [...files, ...acceptedFiles]);
  };
  const removeFile = (e, i) => {
    e.preventDefault();
    e.stopPropagation();
    setFiles((files) => {
      const f = [...files];
      f.splice(i, 1);
      return f;
    });
  };

  const removeUploadedFile = (e, i) => {
    e.preventDefault();
    e.stopPropagation();
    const f = uploadedFile[i];
    setDeletedFile((df) => [...df, f.id]);
    setUploadedFile((files) => {
      const f = [...files];
      f.splice(i, 1);
      console.log(f);
      return f;
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // SUBMIT FUNC
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();
    let invoice_post = {
      invoice_date: selected_date,
      project: project_name,
      employee: employee_name,
      totalamount: subtotal,
    };

    const formData = new FormData();
    formData.append("invoice_post", invoice_post);
    formData.append("particulars", invoiceItems);
    formData.append(`files`, files);

    setLoading(true);
    API.post(BILL_POST, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {})
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      {loading && <Loader />}
      <PageHeader title="Edit Bill" onBack />
      <Content>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm="12" md="3" className="mb-4">
              <Form.Group>
                <Form.Label>Invoice Date</Form.Label>
                <DatePicker
                  placeholder={"Invoice date"}
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
                  placeholder={projectList?.map((d) => d.id === project_name && d?.name)}
                  onChange={(e) => setProject_name(e.value)}
                />
              </Form.Group>
            </Col>
            <Col sm="12" md="6">
              <Form.Group>
                <Form.Label>Employee Name</Form.Label>
                <ReactSelect
                  options={employeeList?.map((d) => ({ label: d.name + " (" + d.employee_id + ")", value: d.id }))}
                  placeholder={employeeList?.map((d) => d.id === employee_name && d?.name)}
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
                <th>Particular</th>
                <th>Unit</th>
                <th>Unit Price</th>
                <th>Total Price</th>
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
                        placeholder="Particular"
                        name="description"
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                        value={d.description}
                      />
                    </td>
                    <td style={{ minWidth: "50px" }}>
                      <Form.Control
                        type="number"
                        placeholder="Unit"
                        name="qty"
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                        value={d.qty}
                      />
                    </td>
                    <td style={{ minWidth: "50px" }}>
                      <Form.Control
                        type="number"
                        placeholder="Unit Price"
                        name="cost"
                        onChange={(e) => {
                          onItemChange(e, i);
                        }}
                        value={d.cost}
                      />
                    </td>
                    <td style={{ minWidth: "50px" }}>
                      <Form.Control placeholder="Total Price" name="total" value={d.total} className="bg-light" disabled />
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

          {/* Upload File */}
          <div>
            <FileDropZone multiple onFileSelect={onDropFile} />
            <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush">
              {files.map((file, i) => (
                <li key={`pre-${i}`} className="list-group-item dz-processing">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      {file?.type === "application/pdf" ? (
                        <FaFilePdf size={32} />
                      ) : file?.name?.split(".")[1] === "docx" || file?.name?.split(".")[1] === "doc" ? (
                        <FaFileWord size={32} />
                      ) : file?.name?.split(".")[1] === "xlsx" || file?.name?.split(".")[1] === "xls" ? (
                        <FaFileExcel size={32} />
                      ) : file?.type?.startsWith("image") ? (
                        <>
                          <a href={URL.createObjectURL(file)} target="#">
                            <Image src={URL.createObjectURL(file)} href={URL.createObjectURL(file)} target="#" height={48} />
                          </a>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col ms-n3">
                      <h4 className="mb-1" data-dz-name="">
                        {file?.name}
                      </h4>
                      <small className="text-muted" data-dz-size="">
                        <strong>{Math.ceil(file?.size / 1024)}</strong>KB
                      </small>
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-light btn-sm" onClick={(e) => removeFile(e, i)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {uploadedFile.map((file, i) => (
                <li key={`pre-del-${i}`} className="list-group-item dz-processing">
                  <div className="row align-items-center">
                    <div className="col-auto"></div>
                    <div className="col ms-n3">
                      <h4 className="mb-1" data-dz-name="">
                        {file.fileName}
                      </h4>
                      <small className="text-muted" data-dz-size="">
                        <strong>{file.size}</strong>
                      </small>
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-light btn-sm" onClick={(e) => removeUploadedFile(e, i)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Button type="submit" className="mt-5">
            Submit
          </Button>
        </Form>
      </Content>
    </Layout>
  );
}
