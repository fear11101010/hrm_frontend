import React, { useEffect, useRef, useState } from "react";
import PageHeader from "../../../components/header/PageHeader";
import Layout from "../../../layout/Layout";
import Content from "../../../components/content/Content";
import useSbu from "../../../hooks/SBU/useSbu";
import Select from "react-select";
import { API } from "../../../utils/axios/axiosConfig";
import { EMPLOYEE_ASSIGN_POST, GET_EMPLOYEE_BY_SBU_API } from "../../../utils/API_ROUTES";
import { Form } from "react-bootstrap";
import useSupervisor from "../../../hooks/useSupervisor";
import Loader from "../../../components/loader/Loader";
import { error_alert, success_alert } from "../../../components/alert/Alert";
import Flatpickr from "react-flatpickr";

export default function KpiEmployeeAssign() {
  const fp = useRef(null);
  const { sbuList } = useSbu();
  const supervisorList = useSupervisor();
  const [loading, setLoading] = useState(false);
  const [sbuId, setSbuId] = useState("");
  const [sbu_employees, setSbu_employees] = useState([]);
  // const [updated_sbu_employees, setUpdated_Sbu_employees] = useState([]);
  const [emSupervisor, setEmSupervisor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
    };
    setLoading(true);
    API.post(EMPLOYEE_ASSIGN_POST, payload)
      .then((res) => {
        if (res.data.statuscode === 200) {
          success_alert(res.data.message);
        } else {
          error_alert(res.data.message);
        }
      })
      .catch((err) => {
        error_alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // fetch data of employee under SBU id
  useEffect(() => {
    setSbu_employees([]); //reseting
    if (sbuId !== "") {
      setLoading(true);
      API.get(GET_EMPLOYEE_BY_SBU_API(sbuId))
        .then((res) => {
          if (res.data.statuscode === 200) {
            setSbu_employees(res.data.data.map((d) => ({ label: d.name, value: d.id })));
            // setUpdated_Sbu_employees(res.data.data.map((d) => ({ label: d.name, value: d.id })));
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

  return (
    <Layout>
      {loading && <Loader />}
      <PageHeader title="Employee Assign" />
      <Content>
        <Form onSubmit={handleSubmit} className="w-50 m-auto">
          <Form.Group className="mb-3">
            <Form.Label>SBU</Form.Label>
            <Select options={sbuList?.map((d) => ({ label: d.name, value: d.id }))} onChange={(e) => setSbuId(e.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Employee</Form.Label>
            {sbu_employees.length > 0 && (
              <Select
                isMulti
                options={sbu_employees}
                defaultValue={sbu_employees.map((d, i) => sbu_employees[i])}
                // onChange={(e) => setUpdated_Sbu_employees(e.value)}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Employee Supervisor</Form.Label>
            <Select
              options={supervisorList.map((d) => ({ label: d.name, value: d.id }))}
              onChange={(e) => setEmSupervisor(e.value)}
              isDisabled={sbuId === ""}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
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
            Save
          </button>
        </Form>
      </Content>
    </Layout>
  );
}
