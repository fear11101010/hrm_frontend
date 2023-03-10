import React, { useEffect, useRef, useState } from "react";
import PageHeader from "../../../../components/header/PageHeader";
import Layout from "../../../../layout/Layout";
import Content from "../../../../components/content/Content";
import useSbu from "../../../../hooks/SBU/useSbu";
import Select from "react-select";
import { API } from "../../../../utils/axios/axiosConfig";
import {
  EMPLOYEE_ASSIGN_POST,
  EMPLOYEE_ASSIGN_RETRIVE_AND_PUT,
  GET_EMPLOYEE_BY_SBU_API,
} from "../../../../utils/routes/api_routes/API_ROUTES";
import { Form } from "react-bootstrap";
import useSupervisor from "../../../../hooks/useSupervisor";
import Loader from "../../../../components/loader/Loader";
import { error_alert, success_alert } from "../../../../components/alert/Alert";
import moment from "moment";
import ConfirmDialog from "../../../../components/confirm-dialog/ConfirmDialog";
import { USER_INFO } from "../../../../utils/session/token";
import { Navigate } from "react-router-dom";
import { UNAUTHORIZED } from "../../../../utils/routes/app_routes/APP_ROUTES";
import DatePicker from "../../../../components/date-picker/DatePicker";
import { DATE_FORMAT } from "../../../../utils/CONSTANT";

export default function KpiEmployeeAssign() {
  const user = USER_INFO();
  const { data } = useSbu();

  const supervisorList = useSupervisor();

  const [loading, setLoading] = useState(false);
  const [sbuId, setSbuId] = useState("");
  const [sbuId_p, setSbuId_p] = useState("");
  const [sbu_employees, setSbu_employees] = useState([]);
  const [emSupervisor, setEmSupervisor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [halfYearly, setHalfYearly] = useState(false);

  // Err States
  const [sbuErr, setSbuErr] = useState("");
  const sbuRef = useRef(null);

  // if already assigned
  const [isExist, setIsExist] = useState(false);

  // handle save button
  const handleSubmit = (e) => {
    e.preventDefault();
    let temp = sbu_employees.map((d) => d.value);
    const payload = {
      employees_id: temp.join(),
      sbu: sbuId.toString(),
      supervisor_id: emSupervisor.toString(),
      duration_startdate: startDate + " 00:00:00",
      duration_enddate: endDate + " 00:00:00",
      type: yearly ? "Yearly" : "Half Yearly",
    };
    if (sbuId === "") {
      setSbuErr("Required");
    } else {
      setLoading(true);
      API.post(EMPLOYEE_ASSIGN_POST, payload)
        .then((res) => {
          if (res.data.statuscode === 200) {
            success_alert(res.data.message);
            setSbuId("");
            setSbuId_p("");
            setSbu_employees("");
            setEmSupervisor("");
            setStartDate("");
            setEndDate("");
            setYearly(false);
            setHalfYearly(false);
            setIsConfirm(false);
          } else {
            error_alert(res.data.message);
          }
        })
        .catch((err) => {
          error_alert(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
          setIsConfirm(false);
        });
    }
  };

  // fetch data of employee under SBU id and check if already assigned or not
  useEffect(() => {
    //reseting
    setSbu_employees([]);
    setStartDate("");
    setEndDate("");

    if (sbuId !== "") {
      // Employee list by SBU
      setLoading(true);
      API.get(GET_EMPLOYEE_BY_SBU_API(sbuId))
        .then((res) => {
          if (res.data.statuscode === 200) {
            setSbu_employees(res.data.data.map((d) => ({ label: d.name, value: d.id })));
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });

      // SBU already assigned of not check
      setLoading(true);
      API.get(EMPLOYEE_ASSIGN_RETRIVE_AND_PUT(sbuId))
        .then((res) => {
          if (res.data.statuscode === 200) {
            setIsExist(true);
            setEmSupervisor(res.data.data.supervisor_id);
            setStartDate(moment(res.data.data.duration_startdate).format("YYYY-MM-DD"));
            setEndDate(moment(res.data.data.duration_enddate).format("YYYY-MM-DD"));
            success_alert("Employee already assigned");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [sbuId]);

  //Handle Confirm Modal
  const handleConfirmModal = (e) => {
    e.preventDefault();
    if (yearly === false && halfYearly === false) {
      error_alert("Please check HALF-YEARLY or YEARLY");
    } else if (sbuId === "") {
      error_alert("Please Select SBU");
    } else {
      setIsConfirm(true);
    }
  };

  return user.accessibility.includes("employee_assign.create") ? (
    <Layout>
      {loading && <Loader />}
      <PageHeader title="Circularte To Employees" />
      <Form
        onSubmit={(e) => {
          handleConfirmModal(e);
        }}
        className="w-50 m-auto"
      >
        <div className="d-flex mb-3">
          <Form.Check
            type="radio"
            id="half-yearly"
            label="Half Yearly"
            className="me-2"
            checked={halfYearly}
            onChange={() => {
              setHalfYearly(true);
              setYearly(false);
            }}
          />
          <Form.Check
            type="radio"
            id="yearly"
            label="Yearly"
            checked={yearly}
            onChange={() => {
              setHalfYearly(false);
              setYearly(true);
            }}
          />
        </div>

        <Form.Group className="mb-3">
          <Form.Label>SBU</Form.Label>
          <Select
            options={data?.map((d) => ({ label: d.name, value: d.id }))}
            onChange={(e) => {
              setSbuId(e.value);
              setSbuId_p(e.label);
            }}
            placeholder={sbuId === "" ? "Select SBU" : sbuId_p}
            styles={{ border: "1px solid red" }}
            value={sbuId_p}
          />
        </Form.Group>

        {sbu_employees.length > 0 && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Employee</Form.Label>
              <Select
                isMulti
                options={sbu_employees}
                defaultValue={sbu_employees.map((d, i) => sbu_employees[i])}
                // onChange={(e) => setUpdated_Sbu_employees(e.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Employee Supervisor</Form.Label>
              <Select
                options={supervisorList.map((d) => ({ label: d.name, value: d.id }))}
                placeholder={supervisorList.map((d) => d.id.toString() === emSupervisor && d.name)}
                onChange={(e) => setEmSupervisor(e.value)}
                isDisabled={sbuId === ""}
              />
            </Form.Group>
          </>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Start Date </Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            required
          />
        </Form.Group>
        <button type="submit" className="btn btn-primary mt-3 mb-4">
          {isExist ? "Update" : "Save"}
        </button>
        {isConfirm && (
          <ConfirmDialog
            message="Are you sure you want to assign employee?"
            onOkButtonClick={handleSubmit}
            onCancelButtonClick={() => {
              setIsConfirm(false);
            }}
          />
        )}
      </Form>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
