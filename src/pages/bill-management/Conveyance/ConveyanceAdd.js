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
import { FaFileExcel, FaFilePdf, FaFileWord, FaTrash } from "react-icons/fa";
import FileDropZone from "../../../components/FileDropZone";
import { BASE_URL_FOR_MEDIA_FILE } from "../../../utils/CONSTANT";

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
  const [files, setFiles] = useState([]);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [existing_files, setExisting_files] = useState([]);
  const [deletedFile, setDeletedFile] = useState([]);

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
        setExisting_files(res?.data?.files);
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // File Submit
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const onDropFile = (acceptedFiles) => {
    console.log("acceptedFiles", acceptedFiles);
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
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      conveyance_date: selected_date,
      project: project_name,
      employee: employee_name,
      totalamount: subtotal,
    };

    const formData = new FormData();
    formData.append("invoice_post", JSON.stringify(payload));
    formData.append("particulars", JSON.stringify(invoiceItems));
    files.forEach((v, i) => {
      formData.append(`main_img`, v);
    });
    if (project_name === "" || employee_name === "") {
      error_alert("Please select all fields");
    } else {
      setLoading(true);
      API.post(CONVEYANCE_POST, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
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
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("handleUpdate");
    let payload_when_update = {
      conveyance_date: selected_date,
      project: project_name,
      employee: employee_name,
      totalamount: subtotal,
      invoice_code: invoice_code,
    };

    const formData = new FormData();
    formData.append("invoice_post", JSON.stringify(payload_when_update));
    formData.append("particulars", JSON.stringify(invoiceItems));
    files.forEach((v, i) => {
      formData.append(`main_img`, v);
    });

    if (project_name === "" || employee_name === "") {
      error_alert("Please select all fields");
    } else {
      API.put(CONVEYANCE_EACH_PUT_API(id), formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
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
  };

  const deleteImg = async (imgId) => {
    try {
      setLoading(true);
      const res = await API.delete(`file_upload/${imgId}/`);
      if (res?.data?.statuscode === 200) {
        success_alert(res?.data?.message);
        fetchConveyance();
      } else {
        error_alert(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
    }
  };
  return (
    <Layout>
      {loading && <Loader />}
      {employeeDropdownLoading && <Loader />}
      <PageHeader title={id === undefined ? "Add New Conveyance " : "Update Conveyance "} onBack />
      <Content>
        <Form onSubmit={id === undefined ? handleSubmit : handleUpdate}>
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

          {/* Upload File */}
          <div>
            <FileDropZone multiple onFileSelect={onDropFile} />
            <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush">
              {/* Existing IMAGE list */}
              {existing_files &&
                existing_files.map((file, i) => (
                  <li key={`pre-${i}`} className="list-group-item dz-processing">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        {file?.main_img.split(".")[1] === "pdf" ? (
                          <FaFilePdf size={32} />
                        ) : file?.main_img?.split(".")[1] === "docx" || file?.main_img?.split(".")[1] === "doc" ? (
                          <FaFileWord size={32} />
                        ) : file?.main_img?.split(".")[1] === "xlsx" || file?.main_img?.split(".")[1] === "xls" ? (
                          <FaFileExcel size={32} />
                        ) : (
                          <>
                            <a href={BASE_URL_FOR_MEDIA_FILE + file?.main_img} target="#" download>
                              <Image src={BASE_URL_FOR_MEDIA_FILE + file?.main_img} target="#" height={48} />
                            </a>
                          </>
                        )}
                      </div>
                      <div className="col ms-n3">
                        <h4 className="mb-1" data-dz-name="">
                          {file?.main_img?.split("/")[1]}
                        </h4>
                      </div>
                      <div className="col-auto">
                        <button className="btn btn-light btn-sm" onClick={(e) => deleteImg(file?.id)}>
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              {files.map((file, i) => (
                <li key={`pre-${i}`} className="list-group-item dz-processing">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      {file?.type === "application/pdf" ? (
                        <FaFilePdf size={32} />
                      ) : file?.name.split(".")[1] === "docx" || file?.name.split(".")[1] === "doc" ? (
                        <FaFileWord size={32} />
                      ) : file?.name.split(".")[1] === "xlsx" || file?.name.split(".")[1] === "xls" ? (
                        <FaFileExcel size={32} />
                      ) : file?.type.startsWith("image") ? (
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
                        {file.name}
                      </h4>
                      <small className="text-muted" data-dz-size="">
                        <strong>{Math.ceil(file.size / 1024)}</strong>KB
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
