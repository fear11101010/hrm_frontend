import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Button, Card, Col, Dropdown, Form, Row } from "react-bootstrap";
import { API } from "../../../utils/axios/axiosConfig";
import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import { CONVEYANCE_APPROVE_LIST_GET, CONVEYANCE_LIST_API } from "../../../utils/routes/api_routes/BILL_API_ROUTES";
import { CONVEYANCE_LIST_TABLE } from "./columns";
import DetailsModal from "./modals/DetailsModal";
import UpdateStatusModal from "./modals/UpdateStatusModal";
import InspectModal from "./inspect-modal/InspectModal";
import { USER_INFO } from "../../../utils/session/token";
import useProjects from "../../../hooks/useProjects";
import useEmployeeDropdown from "../../../hooks/useEmployeeDropdown";
import { error_alert } from "../../../components/alert/Alert";
import { FaFilter } from "react-icons/fa";
import FilterModal from "../filterModal";
import DatePicker from "../../../components/date-picker/DatePicker";
import moment from "moment";
import ReactSelect from "react-select";
import { BILL_STATUS } from "../BILL_STATUS";

export default function ConveyanceApprove() {
  const user = USER_INFO();
  const [isLoading, setIsLoading] = useState(false);
  const [conveyance, setConveyance] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [approve_modal, setApprove_modal] = useState(false);
  const [forwaredTo, setForwardTo] = useState("");
  const [status, setStatus] = useState("");
  const [detail_modal, setDetail_modal] = useState(false);
  const [selected_id, setSelected_id] = useState("");
  const [inspect_modal, setInspect_modal] = useState(false);
  const [remarks, setRemarks] = useState("");

  //Calling Hooks
  const [employee_list, setEmployee_list] = useState([]);
  const [checker_forward_list, setChecker_forward_list] = useState([]);

  const projectList = useProjects();
  let { employeeDropdownLoading, employeeDropdownList } = useEmployeeDropdown();

  //Filter states
  const [filter_modal, setFilterModal] = useState(false);
  const [invoice_code, setInvoice_code] = useState("");
  const [project_id, setProject_id] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [status_id, setStatus_id] = useState("");
  const [forwarded_to_id, setForwarded_to_id] = useState("");
  const [date_from, setDate_from] = useState("");
  const [date_to, setDate_to] = useState("");

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const getData = async (page) => {
    setIsLoading(true);
    setFilterData([]);
    try {
      // const res = await API.get(`/conveyance/$/bill_approve_list/?offset=${page}&limit=${perPage}`);
      const res = await API.get(`conveyance/$/bill_approve_list_for_accnts/?offset=${page}&limit=${perPage}`);
      if (res?.data?.statuscode === 200) {
        setConveyance(res?.data?.data);
        setTotalRows(res?.data?.count);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    getData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    try {
      // const res = await API.get(`/conveyance/$/bill_approve_list/?offset=${page}&limit=${newPerPage}`);
      const res = await API.get(`conveyance/$/bill_approve_list_for_accnts/?offset=${page}&limit=${newPerPage}`);
      if (res?.data?.statuscode === 200) {
        setConveyance(res?.data?.data);
        setPerPage(newPerPage);
        setTotalRows(res.data.count);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmployee = async () => {
    try {
      setIsLoading(true);
      const res = await API.get("user_dropdown/");
      let filtered = res?.data?.data?.filter((d) => d?.group.includes("11") || d?.group.includes("13"));
      let checker_filtered = res?.data?.data?.filter((d) => d?.group.includes("6"));
      let formattedEmployeeList = filtered?.map((d) => ({
        label: d?.username,
        value: d?.id,
      }));
      let formattedCheckerList = checker_filtered?.map((d) => ({
        label: d?.username,
        value: d?.id,
      }));
      setEmployee_list(formattedEmployeeList);
      setChecker_forward_list(formattedCheckerList);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(0);
    fetchEmployee();
  }, []);
  console.log(user);
  const EXTENDED_COLUMN = [
    {
      name: "Approve",
      cell: (row) => (
        <Dropdown drop={conveyance?.length <= 3 && "start"}>
          <Dropdown.Toggle size="sm" variant="light" id="dropdown-Conveyance " className="fw-bold border">
            Actions
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setDetail_modal(true);
                setSelected_id(row?.id);
              }}
            >
              <i className="fe fe-file-text"></i> View Invoice
            </Dropdown.Item>
            {row?.status === 2 || row?.status === 4 || !user?.accessibility?.includes("bill_status.POST") ? (
              ""
            ) : (
              <Dropdown.Item
                onClick={() => {
                  setApprove_modal(true);
                  setSelected_id(row?.id);
                  setForwardTo(row?.forwarded_to?.id);
                  setStatus(row?.status);
                  setRemarks(row?.remark);
                }}
              >
                <i className="fe fe-edit-3"></i> Update Status
              </Dropdown.Item>
            )}
            <Dropdown.Item
              onClick={() => {
                setInspect_modal(true);
                setSelected_id(row?.id);
              }}
            >
              <i className="fe fe-eye"></i> Inspect Conveyance
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      width: "100px",
      wrap: true,
      center: true,
    },
  ];

  // Filtering
  const reset = () => {
    setInvoice_code("");
    setProject_id("");
    setEmployee_id("");
    setStatus_id("");
    setForwarded_to_id("");
    setDate_from("");
    setDate_to("");
  };

  const filterSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      table_name: "bill_conveyance",
      model_name: "conveyance",
      invoice_code,
      data_range: { conveyance_date: [date_from, date_to] },
      project_id,
      employee_id,
      status_id,
      forwarded_to_id,
    };
    try {
      setIsLoading(true);
      const res = await API.post(`global_filtering/`, payload);
      if (res?.data?.statuscode === 200) {
        if (res?.data?.count !== 0) {
          setConveyance([]);
          setFilterData(res?.data?.data);
          setFilterModal(false);
        } else {
          error_alert("No data found!");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      {isLoading && <Loader />}
      <PageHeader title={"Conveyance Approve List"} />
      <Container fluid>
        <Card>
          <Card.Body>
            <div className="text-end">
              {filterData?.length > 0 && (
                <Button
                  size="sm"
                  variant="light"
                  className="fw-bold me-2"
                  onClick={() => {
                    getData(0);
                    reset();
                  }}
                >
                  <FaFilter /> Clear Filter
                </Button>
              )}
              <Button
                size="sm"
                variant="light"
                className="fw-bold"
                onClick={() => {
                  setFilterModal(true);
                }}
              >
                <FaFilter /> Filter
              </Button>
            </div>
            {filterData.length > 0 ? (
              <Table columns={CONVEYANCE_LIST_TABLE.concat(EXTENDED_COLUMN)} data={filterData} />
            ) : (
              <Table
                paginationServer
                paginationTotalRows={totalRows}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}
                data={conveyance}
                columns={CONVEYANCE_LIST_TABLE.concat(EXTENDED_COLUMN)}
              />
            )}
          </Card.Body>
        </Card>

        <DetailsModal
          show={detail_modal}
          onHide={() => {
            setDetail_modal(false);
            setSelected_id("");
          }}
          id={selected_id}
        />

        <UpdateStatusModal
          show={approve_modal}
          onHide={() => {
            setApprove_modal(false);
            setSelected_id("");
            getData(0);
          }}
          id={selected_id}
          forwaredTo={forwaredTo}
          status={status}
          remarks={remarks}
        />

        {/* Inspect Modal */}
        <InspectModal
          show={inspect_modal}
          onHide={() => {
            setInspect_modal(false);
            setSelected_id("");
          }}
          id={selected_id}
        />

        {/* Filter Modal */}
        <FilterModal show={filter_modal} onHide={() => setFilterModal(false)}>
          <Form onSubmit={filterSubmit}>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Group>
                  <Form.Label className="mb-0">Invoice Code</Form.Label>
                  <Form.Control
                    value={invoice_code}
                    onChange={(e) => {
                      setInvoice_code(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group>
                  <Form.Label className="mb-0">Date From</Form.Label>
                  <DatePicker
                    dateFormat={"dd-mm-yyyy"}
                    value={date_from}
                    onChange={(e) => setDate_from(moment(e?._d).format("YYYY-MM-DD"))}
                    required={date_to !== ""}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group>
                  <Form.Label className="mb-0">Date To</Form.Label>
                  <DatePicker
                    dateFormat={"dd-mm-yyyy"}
                    value={date_to}
                    onChange={(e) => setDate_to(moment(e?._d).format("YYYY-MM-DD"))}
                    required={date_from !== ""}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="mb-0">Project</Form.Label>
                  <ReactSelect
                    options={projectList?.map((d) => ({ label: d?.name, value: d?.id }))}
                    onChange={(e) => setProject_id(e.value)}
                    placeholder={projectList?.map((d) => (d?.id === project_id ? d?.name : ""))}
                    value={project_id}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="mb-0">Employee</Form.Label>
                  <ReactSelect
                    options={employeeDropdownList?.map((d) => ({
                      label: d?.name + " (" + d?.employee_id + ")",
                      value: d?.id,
                    }))}
                    onChange={(e) => setEmployee_id(e.value)}
                    placeholder={employeeDropdownList?.map((d) =>
                      d?.id === employee_id ? d?.name + " (" + d?.employee_id + ")" : ""
                    )}
                    value={employee_id}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="mb-0">Status</Form.Label>
                  <ReactSelect
                    options={BILL_STATUS}
                    onChange={(e) => setStatus_id(e.value)}
                    placeholder={BILL_STATUS?.map((d) => (d?.value === status_id ? d?.label : ""))}
                    value={status_id}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="mb-0">Forwarded To</Form.Label>
                  <ReactSelect
                    options={employee_list}
                    onChange={(e) => setForwarded_to_id(e.value)}
                    placeholder={employee_list?.map((d) => (d?.value === forwarded_to_id ? d?.label : ""))}
                    value={forwarded_to_id}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="text-end mt-2">
              <Button variant="light" className="me-2 fw-bold border" onClick={reset}>
                Reset
              </Button>
              <Button
                type={"submit"}
                disabled={
                  invoice_code === "" &&
                  date_from === "" &&
                  date_to === "" &&
                  project_id === "" &&
                  employee_id === "" &&
                  status_id === "" &&
                  forwarded_to_id === ""
                }
              >
                Filter
              </Button>
            </div>
          </Form>
        </FilterModal>
      </Container>
    </Layout>
  );
}
