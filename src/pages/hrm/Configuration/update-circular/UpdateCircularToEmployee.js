import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReactSelect from "react-select";
import Content from "../../../../components/content/Content";
import DatePicker from "../../../../components/date-picker/DatePicker";

import PageHeader from "../../../../components/header/PageHeader";
import Loader from "../../../../components/loader/Loader";
import Layout from "../../../../layout/Layout";

import {
  EMPLOYEE_LIST_GET,
  GET_SBU_API,
  UPDATE_CIRCULAR_EMPLOYEE_POST,
  UPDATE_CIRCULAR_SBU_POST,
} from "../../../../utils/routes/api_routes/API_ROUTES";
import { API } from "../../../../utils/axios/axiosConfig";
import { USER_INFO } from "../../../../utils/session/token";
import { Navigate } from "react-router-dom";
import { UNAUTHORIZED } from "../../../../utils/routes/app_routes/APP_ROUTES";

export default function UpdateCircularToEmployee() {
  const user = USER_INFO();

  //states
  const [loading, setLoading] = useState(false);
  const [isEmployee, setIsEmployee] = useState(true);
  const [isSbu, setIsSbu] = useState(false);
  const [selected_employee, setSelected_employee] = useState("");
  const [selected_sbu, setSelected_sbu] = useState("");
  const [selected_date, setSelected_date] = useState("");

  //fetching data state
  const [employeeList, setEmployeeList] = useState([]);
  const [sbuList, setSbuList] = useState([]);

  const fetchEmployee = () => {
    setLoading(true);
    API.get(EMPLOYEE_LIST_GET)
      .then((res) => {
        let a = res?.data?.data?.map((d) => ({ label: d?.name + " (" + d?.employee_id + ")", value: d?.id }));
        setEmployeeList(a);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const fetchSbu = () => {
    setLoading(true);
    API.get(GET_SBU_API)
      .then((res) => {
        let a = res?.data?.data?.map((d) => ({ label: d?.name, value: d?.id }));
        setSbuList(a);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let payload = {
      review_closedate: selected_date,
    };
    setLoading(true);
    API.post(
      (isEmployee && UPDATE_CIRCULAR_EMPLOYEE_POST(selected_employee)) || (isSbu && UPDATE_CIRCULAR_SBU_POST(selected_sbu))
    )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //   Lifecycle
  useEffect(() => {
    if (isEmployee) {
      fetchEmployee();
    }
    if (isSbu) {
      fetchSbu();
    }
  }, [isEmployee, isSbu]);

  return user?.accessibility?.includes(
    "assessment.update_review_closedate_employee" || "assessment.update_review_closedate_sbu"
  ) ? (
    <Layout>
      {loading && <Loader />}
      <PageHeader title={"Update Circular"} />
      <Content>
        <Form className="w-50 m-auto" onSubmit={onSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Select Type</Form.Label>
            <div>
              <Form.Check
                inline
                type="checkbox"
                label="Employee"
                id={`checkbx-1`}
                checked={isEmployee}
                onChange={() => {
                  setIsSbu(false);
                  setIsEmployee(true);
                }}
                style={{ fontWeight: "500" }}
              />
              <Form.Check
                inline
                type="checkbox"
                label="Sbu"
                id={`checkbx-2`}
                checked={isSbu}
                onChange={() => {
                  setIsSbu(true);
                  setIsEmployee(false);
                }}
                style={{ fontWeight: "500" }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Select {isEmployee ? "Employee" : "SBU"} </Form.Label>
            <ReactSelect
              options={(isEmployee && employeeList) || (isSbu && sbuList)}
              onChange={(e) => {
                if (isEmployee) setSelected_employee(e.value);
                if (isSbu) setSelected_sbu(e.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Select Updated Date </Form.Label>
            <DatePicker
              dateFormat={"dd-mm-yyyy"}
              value={moment(selected_date).format("DD-MM-YYYY")}
              onChange={(e) => setSelected_date(moment(e?._d).format("YYYY-MM-DD"))}
            />
          </Form.Group>
          <div>
            <Button type="submit">Update</Button>
          </div>
        </Form>
      </Content>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
