import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Content from "../../../../components/content/Content";
import PageHeader from "../../../../components/header/PageHeader";
import Loader from "../../../../components/loader/Loader";
import Select from "../../../../components/select/Select";
import useEmployeeDropdown from "../../../../hooks/useEmployeeDropdown";
import useFetch from "../../../../hooks/useFetch";
import Layout from "../../../../layout/Layout";
import {
  LUNCH_ORDER_POST,
  LUNCH_ORDER_RETRIEVE,
  MONTH_MAPPING,
  OFFICE_BRANCH,
  SUBSIDY_LIST_CREATE_API,
} from "../../../../utils/routes/api_routes/LUNCH_ROUTES";
import ReactSelect from "react-select";
import { API } from "../../../../utils/axios/axiosConfig";
import moment from "moment";
import { error_alert, success_alert } from "../../../../components/alert/Alert";
import { USER_INFO } from "../../../../utils/session/token";

export default function SignleLunchOrder() {
  const user = USER_INFO();
  let date_today = moment().format("YYYY-MM-DD");
  let month = new Date().getMonth() + 1; //getMonth() starts from 0
  let year = new Date().getFullYear();
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [ofc_branch, setOfc_branch] = useState([]);
  const [selectedSubSidyType, setSelectedSubsidyType] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedEmployeeName, setSelectedEmployeeName] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [month_map, setMonth_map] = useState([]);
  const [menu_item, setMenu_item] = useState([]);

  const { data } = useFetch(SUBSIDY_LIST_CREATE_API);
  let { employeeDropdownLoading, employeeDropdownList } = useEmployeeDropdown();
  const subSidyTypes = data?.data?.map((ss) => ({ label: ss.name, value: ss.id }));
  const employeeList = employeeDropdownList?.map((d) => ({ label: d.name + " (" + d.employee_id + ")", value: d.id }));

  useEffect(() => {
    setIsLoading(true);
    API.get(OFFICE_BRANCH)
      .then((res) => {
        let x = res.data.data?.map((d) => ({ label: d?.name, value: d?.id }));
        setOfc_branch(x);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let payload = {
      year: year,
      month: month,
      branch: selectedBranch,
    };

    // Month Menu Mapping
    setIsLoading(true);
    API.post(MONTH_MAPPING, payload)
      .then((res) => {
        setIsSearched(true);
        let x = res?.data?.data?.filter((d) => d?.date === date_today);
        setMonth_map(res?.data?.data);
        setMenu_item(x[0]?.menu);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));

    setIsLoading(true);
    API.get(LUNCH_ORDER_RETRIEVE(selectedEmployee, month, year))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      isGuest: selectedSubSidyType.label === "Guest" || selectedSubSidyType.label === "Official Guest" ? true : false,
      date: date_today,
      menu: parseInt(selectedMenu),
      employee: selectedSubSidyType.label === "Official Guest" ? user?.user_id : selectedEmployee,
      subsidy: selectedSubSidyType.value,
      month: month,
    };
    setIsLoading(true);
    API.post(LUNCH_ORDER_POST, [payload])
      .then((res) => {
        if (res.data.statuscode === 200) {
          success_alert(res.data.message);
          setIsSearched(false);
        } else {
          error_alert(res.data.message);
        }
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Layout>
      {isLoading ? <Loader /> : null}
      <PageHeader title={"Single Lunch Order"} />
      <Content>
        <Form onSubmit={handleSearch}>
          <Row className="justify-content-center">
            <Col md={3}>
              <Select
                placeholder="Select Subsidy"
                options={subSidyTypes}
                onChange={(e) => {
                  setSelectedSubsidyType(e);
                  setSelectedEmployee("");
                  setSelectedEmployeeName("");
                  setSelectedMenu("");
                }}
              />
            </Col>
            {selectedSubSidyType?.label === "Employee" || selectedSubSidyType?.label === "Guest" ? (
              <Col md={4}>
                <ReactSelect
                  placeholder={
                    selectedEmployee
                      ? employeeList?.map((d) => d?.value === selectedEmployee && d?.label)
                      : "Select Employee"
                  }
                  options={employeeList}
                  value={selectedEmployee}
                  onChange={(e) => {
                    setSelectedEmployee(e.value);
                    setSelectedEmployeeName(e.label);
                  }}
                />
              </Col>
            ) : (
              ""
            )}
            <Col md={3}>
              <Select
                placeholder="Select Branch"
                options={ofc_branch}
                onChange={(e) => {
                  setSelectedBranch(e.value);
                }}
              />
            </Col>
            <Col md={2}>
              <Button type="submit" disabled={selectedSubSidyType === "" || selectedBranch === ""}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Content>
      {isSearched && month_map.length > 0 && (
        <Content>
          <>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-0">
                {selectedSubSidyType?.label === "Employee" || selectedSubSidyType?.label === "Guest" ? (
                  <Col md={6}>
                    <h3 className="mb-2">
                      <span> Employee:</span> <span>{selectedEmployeeName}</span>
                    </h3>
                  </Col>
                ) : null}
                <Col md={6}>
                  <h3 className="mb-2">
                    Date: <span>{moment(date_today).format("DD-MMM-YYYY")}</span>{" "}
                  </h3>
                </Col>
              </Row>
              <hr />
              <Row className="mb-3">
                <Col md={12}>
                  <h3 className="mb-2">Items</h3>
                  {menu_item?.map((d, i) => (
                    <Form.Check
                      inline
                      type="radio"
                      name="menu-items"
                      id={`single-order-switch-${i + 1}`}
                      label={d?.items}
                      style={{ fontWeight: "500" }}
                      // value={d?.id}
                      value={selectedMenu}
                      onChange={(e) => {
                        setSelectedMenu(e.target.value);
                      }}
                    />
                  ))}
                </Col>
                <Col md={12} className="mt-4">
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </Form>
          </>
        </Content>
      )}
    </Layout>
  );
}
