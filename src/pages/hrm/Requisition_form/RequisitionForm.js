import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/header/PageHeader";
import Layout from "../../../layout/Layout";
import useSbu from "../../../hooks/SBU/useSbu";
import Loader from "../../../components/loader/Loader";
import Select from "react-select";
import TableRows from "./TableRows";
import TableRows1 from "./TableRows1";
import useProject from "../../../hooks/useProject";
import useSbuDirName from "../../../hooks/useSbuDirName";
import useEmployee from "../../../hooks/useEmployee";
import { RESOURCE_REQUISITION_FORM } from "../../../utils/routes/api_routes/API_ROUTES";
import { API } from "../../../utils/axios/axiosConfig";
import { error_alert, success_alert } from "../../../components/alert/Alert";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_PAGE } from "../../../utils/routes/app_routes/APP_ROUTES";

export default function RequisitionForm() {
  const { data } = useSbu();
  const navigate = useNavigate();
  const project = useProject();
  const sbu_dir_name = useSbuDirName();
  const employeelist = useEmployee();
  const [loading, setLoading] = useState(false);
  const [stepwizard, setStepwizard] = useState(1);
  const [sbuId, setSbuId] = useState("");
  const [sbuId_p, setSbuId_p] = useState("");
  const [projectId, setprojectId] = useState("");
  const [projectId_p, setprojectId_p] = useState("");
  const [sbu_dirId, setsbu_dirId] = useState("");
  const [sbu_dirId_p, setsbu_dirId_p] = useState("");
  const [project_headId, setproject_headId] = useState("");
  const [project_headId_p, setproject_headId_p] = useState("");
  const [req_byId, setreq_byId] = useState("");
  const [req_byId_p, setreq_byId_p] = useState("");
  const [quantity_recruitment, setquantity_recruitment] = useState("");

  const [reason_recruitment, setreason_recruitment] = useState("");
  const [type_of_recruitId_p, settype_of_recruitId_p] = useState("");
  const [number_of_resource, setnumber_of_resource] = useState("");
  const [salary_range, setsalary_range] = useState("");
  const [source_of_fund, setsource_of_fund] = useState("");

  const [skill_experience, setskill_experience] = useState(false);
  const [required_skills, setrequired_skills] = useState("");
  const [min_skill, setmin_skill] = useState("");

  const [cost_bene, setcost_bene] = useState(0);

  const finalsubmit = (e) => {
    // e.preventDefault();
    setLoading(true);
    const submit_data = {
      comment_unit_head: "good",
      comment_sub_director: "best",
      comment_director_finance: "avg",
      comment_chief_executive: "well",
      comment_hr: "not bad",
      requisition_raised_by: req_byId,
      quantity_requisition: quantity_recruitment,
      new_recruit: "1",
      replacement: "0",
      internal_fund: "1",
      project_invoice: "done",
      refno: "102030405060",
      date: "2022-06-12",
      approved_by: "",
      status: "1",
      employee: "5",
      project: projectId,
      project_head: project_headId,
      approved_at: "2022-10-26 10:30:18.950196",
      R_and_D: "0",
      allocated_hour: "9",
      brief_work_details: "excellent",
      common: "good",
      cost_benefit_analysis: "20",
      experienced: "1",
      external_fund: "0",
      fresh_graduate: "1",
      maximum_skills: "Python",
      number_of_resource: number_of_resource,
      number_of_resources_involved: "10",
      plan_after_completion: "no plan",
      positive_years_of_experience: "2",
      project_cost: "30000",
      project_duration: "6",
      project_invoice_amount: "100",
      project_revenue: "top",
      required_skills: required_skills,
      resignation: "0",
      salary_range: salary_range,
      sbu: sbuId,
      sbu_director_name: sbu_dirId,
      skill: min_skill,
      source_of_fund: source_of_fund,
      supervisor: "2",
      total_resource_costing: "2000",
      transfer: "0",
      years_of_experience: "1",
      updated_by: "1",
      created_by: "2",
      reason_for_recruitment: reason_recruitment,
      reason_for_recruitment_array: rowsData,
      current_skill_matrix_array: rowsData1,
      type_of_recruitment: type_of_recruitId_p,
    };
    API.post(RESOURCE_REQUISITION_FORM, submit_data)
      .then((res) => {
        success_alert("Message send successfully");
        navigate(DASHBOARD_PAGE);
        // handleClose('')
      })
      .catch((err) => {
        error_alert(err?.data?.msg ?? "An error occur while updating status. Please try again later");
      })
      .finally(() => {
        // setIsSubmitting(false)
        setLoading(false);
      });
  };

  const type_of_reason = [
    { label: "Fresh Graduate" },
    { label: "Experienced (If yes mention number of years)" },
    { label: "Resignation" },
    { label: "Transfer" },
    { label: "Internal Fund" },
    { label: "External Fund (If external then mention fund source)" },
  ];

  const [rowsData, setRowsData] = useState([]);
  const [rowsData1, setRowsData1] = useState([]);

  const addTableRows = () => {
    const rowsInput = {
      project_invoice_amount: 0,
      resources_involved: 0,
      total_resource_cost: 0,
      project_duration: 0,
      project_cost: 0,
    };
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  let project_invoice_amount = 0;
  let project_cost = 0;

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
    if (parseFloat(rowsInput[index]["project_invoice_amount"]) > 0) {
      if (index === 0) {
        project_invoice_amount += rowsInput[index]["project_invoice_amount"];
      } else {
        project_invoice_amount = parseFloat(cost_bene) + parseFloat(rowsInput[index]["project_invoice_amount"]);
      }
      project_cost += rowsInput[index]["total_resource_cost"] * rowsInput[index]["project_duration"];
      setcost_bene(project_invoice_amount - parseFloat(project_cost));
    }
  };

  const addTableRows1 = () => {
    const rowsInput = {
      employee_name: "",
      designation: "",
      id_no: "",
      sbu: "",
      sbu_project: "",
      allocated_hour: "",
      common: "",
      skill: "",
      project_revenue: "",
      emp_name: "",
    };
    setRowsData1([...rowsData1, rowsInput]);
  };

  const deleteTableRows1 = (index) => {
    const rows = [...rowsData1];
    rows.splice(index, 1);
    setRowsData1(rows);
  };

  const handleChange1 = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData1];
    rowsInput[index][name] = value;
    setRowsData1(rowsInput);
  };

  const handleChange2 = (index, name, value) => {
    const rowsInput = [...rowsData1];
    rowsInput[index][name] = value;
    setRowsData1(rowsInput);
  };

  return (
    <Layout>
      {loading && <Loader />}
      <PageHeader title="Resource Requisition" onBack />
      {/* <div className="container-fluid"> */}
      <div className="">
        {/* <div className="card">
                    <div className="card-body">
                        <section className="section">
                            <div className="section-header d-flex justify-content-between">
                                <h1 className='mb-0'>Resource Requisition List</h1>
                                <div className="section-header-breadcrumb">
                                    <div className="buttons">
                                        <a href="#" className="btn btn-primary">Certificate
                                            Request</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div> */}
        <div className="card">
          <div className="card-body">
            <section className="section">
              <div className="stepwizard">
                <div className="stepwizard-row setup-panel">
                  <div className="stepwizard-step col-xs-3">
                    <a
                      type="button"
                      onClick={() => setStepwizard(1)}
                      className={stepwizard === 1 ? "btn btn-info btn-circle" : "btn btn-default btn-circle"}
                    >
                      1
                    </a>
                    <p>
                      <small>Approval</small>
                    </p>
                  </div>
                  <div className="stepwizard-step col-xs-3">
                    <a
                      type="button"
                      onClick={() => setStepwizard(2)}
                      className={stepwizard === 2 ? "btn btn-info btn-circle" : "btn btn-default btn-circle"}
                    >
                      2
                    </a>
                    <p>
                      <small>Reason for Recruitment</small>
                    </p>
                  </div>
                  <div className="stepwizard-step col-xs-3">
                    <a
                      type="button"
                      onClick={() => setStepwizard(3)}
                      className={stepwizard === 3 ? "btn btn-info btn-circle" : "btn btn-default btn-circle"}
                    >
                      3
                    </a>
                    <p>
                      <small>Reason for Recruitment</small>
                    </p>
                  </div>
                  <div className="stepwizard-step col-xs-3">
                    <a
                      type="button"
                      onClick={() => setStepwizard(4)}
                      className={stepwizard === 4 ? "btn btn-info btn-circle" : "btn btn-default btn-circle"}
                    >
                      4
                    </a>
                    <p>
                      <small>Skills and Experience</small>
                    </p>
                  </div>
                  <div className="stepwizard-step col-xs-3">
                    <a
                      type="button"
                      onClick={() => setStepwizard(5)}
                      className={stepwizard === 5 ? "btn btn-info btn-circle" : "btn btn-default btn-circle"}
                    >
                      5
                    </a>
                    <p>
                      <small>Current Skill Matrix </small>
                    </p>
                  </div>
                </div>
              </div>
              {stepwizard === 1 && (
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Name of SBU:</label>
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
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Name of Project/Function: </label>
                      <Select
                        options={project?.map((d) => ({ label: d.name, value: d.id }))}
                        onChange={(e) => {
                          setprojectId(e.value);
                          setprojectId_p(e.label);
                        }}
                        placeholder={projectId === "" ? "Select Project" : projectId_p}
                        styles={{ border: "1px solid red" }}
                        value={projectId_p}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Name of SBU Director: </label>
                      <Select
                        options={sbu_dir_name?.map((d) => ({ label: d.name, value: d.id }))}
                        onChange={(e) => {
                          setsbu_dirId(e.value);
                          setsbu_dirId_p(e.label);
                        }}
                        placeholder={sbu_dirId === "" ? "Select SBU Director" : sbu_dirId_p}
                        styles={{ border: "1px solid red" }}
                        value={sbu_dirId_p}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Name of Project/Function Head:</label>
                      <Select
                        options={employeelist?.map((d) => ({ label: d.name + " (" + d.employee_id + ")", value: d.id }))}
                        onChange={(e) => {
                          setproject_headId(e.value);
                          setproject_headId_p(e.label);
                        }}
                        placeholder={project_headId === "" ? "Select Project" : project_headId_p}
                        styles={{ border: "1px solid red" }}
                        value={project_headId_p}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Requisition Raised By </label>
                      <Select
                        options={employeelist?.map((d) => ({ label: d.name + " (" + d.employee_id + ")", value: d.id }))}
                        onChange={(e) => {
                          setreq_byId(e.value);
                          setreq_byId_p(e.label);
                        }}
                        placeholder={req_byId === "" ? "Select SBU" : req_byId_p}
                        styles={{ border: "1px solid red" }}
                        value={req_byId_p}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>No. of quantity Recruitment:</label>
                      <input
                        type="number"
                        value={quantity_recruitment}
                        onChange={(evnt) => setquantity_recruitment(evnt.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <button
                      className="btn btn-primary nextBtn pull-right mt-4 w-50 "
                      onClick={() => setStepwizard(stepwizard + 1)}
                      type="button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {stepwizard === 2 && (
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Reason for Recruitment: </label>
                      <select className="form-control select2" onChange={(e) => setreason_recruitment(e.target.value)}>
                        <option value="New Recruit">New Recruit</option>
                        <option value="Replacement">Replacement</option>
                        <option value="R & D">R & D</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Type for Recruitment: </label>
                      <Select
                        options={type_of_reason}
                        onChange={(e) => {
                          settype_of_recruitId_p(e.label);
                        }}
                        styles={{ border: "1px solid red" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>No of Resource: </label>
                      <input
                        type="number"
                        onChange={(e) => setnumber_of_resource(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Salary Range: </label>
                      <input type="text" onChange={(e) => setsalary_range(e.target.value)} className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Source of Fund: </label>
                      <input type="text" onChange={(e) => setsource_of_fund(e.target.value)} className="form-control" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <button
                        className="btn btn-primary nextBtn pull-right mt-4 w-50"
                        onClick={() => setStepwizard(stepwizard + 1)}
                        type="button"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {stepwizard === 3 && (
                <div className="row">
                  <div className="row">
                    <div className="col-sm-12">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Project Invoice Amount (a)</th>
                            <th>Of Resources involved (b)</th>
                            <th>Total Resource Costing (c = b X total salaries)</th>
                            <th>Project Duration (d)</th>
                            <th>Project Cost (e = c x d)</th>
                            <th>
                              <button className="btn btn-outline-success" onClick={addTableRows}>
                                +
                              </button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                        </tbody>
                        <tfoot>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Cost-Benefit Analysis (a-e) =</td>
                            <td>{cost_bene}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div className="col-sm-4"></div>
                  </div>
                  <div className="row">
                    <br />
                    <div className="col-md-6 border">
                      <div className="form-group">
                        Are mentioned skillset resources available in a non-revenue earning Project? If yes, please mention
                        it.
                        <br />
                        <br />
                        Are mentioned skillset resources in sister concern? If yes, please mention it.
                      </div>
                    </div>
                    <div className="col-md-6 border">
                      <div className="form-group">
                        Are mentioned skillset resources available in another SBU/Sub SBU? If yes, please mention it.
                        <br />
                        <br />
                        Should we go for hire or not?
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3">
                      <button
                        className="btn btn-primary nextBtn pull-right mt-4 w-50 "
                        onClick={() => setStepwizard(stepwizard + 1)}
                        type="button"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {stepwizard === 4 && (
                <div className="row">
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        onChange={(e) => setskill_experience(true)}
                        name="exampleRadios"
                        id="exampleRadios7"
                        checked={skill_experience ? true : false}
                      />
                      <label className="form-check-label" for="exampleRadios7">
                        Yes
                      </label>
                    </div>
                    <br />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        onChange={(e) => setskill_experience(false)}
                        name="exampleRadios"
                        id="exampleRadios8"
                        checked={skill_experience ? false : true}
                      />
                      <label className="form-check-label" for="exampleRadios8">
                        No (if yes mention the number of years ……………)
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="table-responsive">
                      <table className="table table-bordered table-md">
                        <thead>
                          <tr>
                            <th colspan="2" className="text-center">
                              Required skills:
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-center">a. Minimum Skills</td>
                            <td className="text-center">b. Project special/Required skills</td>
                          </tr>
                          <tr>
                            <td>
                              <textarea onChange={(e) => setmin_skill(e.target.value)} className="form-control"></textarea>
                            </td>
                            <td>
                              <textarea
                                onChange={(e) => setrequired_skills(e.target.value)}
                                className="form-control"
                              ></textarea>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="form-group">
                      <p className="text-danger">
                        {" "}
                        Note: Above this part Need to Fill-up by Requisition request by, Verified by HR and Finance.
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <button
                        className="btn btn-primary nextBtn pull-right mt-4 w-50"
                        onClick={() => setStepwizard(stepwizard + 1)}
                        type="button"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {stepwizard === 5 && (
                <div className="row">
                  <div className="row">
                    <div className="col-sm-12">
                      <table className="table">
                        <thead>
                          <tr>
                            {/* <th>SL</th> */}
                            <th>Employee Name</th>
                            <th>Designation</th>
                            <th>ID No</th>
                            <th>SBU</th>
                            <th>Sub SBU/project</th>
                            <th>Allocated Hour</th>
                            <th>Common</th>
                            <th>Skill</th>
                            <th>Project Revenue</th>
                            <th>
                              <button className="btn btn-outline-success" onClick={addTableRows1}>
                                +
                              </button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <TableRows1
                            employee_data={employeelist}
                            rowsData={rowsData1}
                            deleteTableRows={deleteTableRows1}
                            handleChange={handleChange1}
                            handleChange2={handleChange2}
                          />
                        </tbody>
                      </table>
                    </div>
                    <div className="col-sm-4"></div>
                  </div>
                  <div className="row ">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Brief Work Details</label>
                        <textarea className="form-control"></textarea>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Plan after Completion of Project</label>
                        <textarea className="form-control"></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="form-group">
                      <p className="text-danger">
                        {" "}
                        Note: Above this part Need to Fill-up by Requisition request by, Verified by HR
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <button className="btn btn-success nextBtn pull-right mt-4 w-50 " onClick={finalsubmit} type="submit">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
