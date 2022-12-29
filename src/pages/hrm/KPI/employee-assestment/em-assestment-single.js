import React, { useEffect, useState } from "react";
import Layout from "../../../../layout/Layout";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../../components/header/PageHeader";
import Content from "../../../../components/content/Content";
import {
  EMPLOYEE_ASSESTMENT_SINGLE_GET,
  EMPLOYEE_ASSESTMENT_SINGLE_POST,
} from "../../../../utils/routes/api_routes/API_ROUTES";
import { Col, Form, FormControl, Row } from "react-bootstrap";
import moment from "moment";
import Loader from "../../../../components/loader/Loader";
import useKpiValue from "../../../../hooks/kpi/kpi_value";
import useKpiObjective from "../../../../hooks/kpi/kpi_objective";
import ReactSelect from "react-select";
import useHrRating from "../../../../hooks/kpi/hr_rating";
import useCiritcality from "../../../../hooks/kpi/ciritcality";
import usePotentialForImprovement from "../../../../hooks/kpi/potential_improve";
import useTechnicalImplementationOperational from "../../../../hooks/kpi/technical_implementation_operational";
import useTopAvgBotPerformer from "../../../../hooks/kpi/top_average_bottom_performer";
import useBestPerformerTeam from "../../../../hooks/kpi/best_performer_team";
import useBestInnovatorTeam from "../../../../hooks/kpi/best_innovator_team";
import useBestPerformerOrganization from "../../../../hooks/kpi/best_performer_organization";
import useBestPerformerPm from "../../../../hooks/kpi/best_performer_pm";
import useConfIncNoinc from "../../../../hooks/kpi/confirmation_increment_no_increment";
import { API } from "../../../../utils/axios/axiosConfig";
import { EMPLOYEE_ASSESTMENT_PAGE, UNAUTHORIZED } from "../../../../utils/routes/app_routes/APP_ROUTES";
import { DATE_FORMAT } from "../../../../utils/CONSTANT";
import ConfirmDialog from "../../../../components/confirm-dialog/ConfirmDialog";
import { error_alert, success_alert } from "../../../../components/alert/Alert";
import useDesignation from "../../../../hooks/useDesignation";
import { USER_INFO } from "../../../../utils/session/token";
import { Decrypt } from "../../../../utils/Hash";

export default function EmAssestmentSingle() {
  const user = USER_INFO();
  const { id } = useParams();

  const navigate = useNavigate();
  // Fetch Hooks
  const kpiValueList = useKpiValue()?.map((d) => ({ label: d.name, value: d.id }));
  const kpiObjectiveList = useKpiObjective()?.map((d) => ({ label: d.name, value: d.id }));
  const hrRatingList = useHrRating()?.map((d) => ({ label: d.name, value: d.id }));
  const criticalityList = useCiritcality()?.map((d) => ({ label: d.name, value: d.id }));
  const potentialImprovementList = usePotentialForImprovement()?.map((d) => ({ label: d.name, value: d.id }));
  const technicalImplementationOperationalList = useTechnicalImplementationOperational()?.map((d) => ({
    label: d.name,
    value: d.id,
  }));
  const topAvgBotPerformerList = useTopAvgBotPerformer()?.map((d) => ({ label: d.name, value: d.id }));
  const bestPerformerTeamList = useBestPerformerTeam()?.map((d) => ({ label: d.name, value: d.id }));
  const bestInnovatorTeamList = useBestInnovatorTeam()?.map((d) => ({ label: d.name, value: d.id }));
  const bestPerformerOrgList = useBestPerformerOrganization()?.map((d) => ({ label: d.name, value: d.id }));
  const bestPerformerPmList = useBestPerformerPm()?.map((d) => ({ label: d.name, value: d.id }));
  const confIncNoIncList = useConfIncNoinc()?.map((d) => ({ label: d.name, value: d.id }));
  const designationList = useDesignation()?.map((d) => ({ label: d.designation, value: d.id }));

  // States
  const [loading, setLoading] = useState(false);
  //Data States
  const [employee_details, setEmployee_details] = useState("");
  const [kpi_obj_curr, setKpi_obj_curr] = useState("");
  const [kpi_val_curr, setKpi_val_curr] = useState("");
  const [kpi_overall_curr, setKpi_overall_curr] = useState("");
  const [hr_rat_curr, setHr_rat_curr] = useState(""); //default 3
  const [criticality_curr, setCriticality_curr] = useState("");
  const [pot_improve_curr, setPot_improve_curr] = useState("");
  const [tech_imple_opera_curr, setTech_imple_opera_curr_curr] = useState("");
  const [top_avg_bot_performer_curr, setTop_avg_bot_performer_curr] = useState("");
  const [best_performer_team_curr, setBest_performer_team_curr] = useState("");
  const [best_innovator_team_curr, setBest_innovator_team_curr] = useState("");
  const [best_performer_org_curr, setBest_performer_org_curr] = useState("");
  const [best_performer_pm_curr, setBest_performer_pm_curr] = useState("");
  const [conf_inc_noInc, setConf_inc_noInc] = useState("");
  const [propose_SBU, setPropose_sbu] = useState("");
  const [proposed_designation, setProposed_designation] = useState("");
  const [proposed_designation_id, setProposed_designation_id] = useState("");
  const [remarks, setRemarks] = useState("");
  const [flag, setFlag] = useState("");
  const [isSupervisor, setIsSupervisor] = useState("");

  const [diffByYear, setdiffByYear] = useState("");
  const [diffByMonths, setdiffByMonths] = useState("");

  const [isConfirm, setIsConfirm] = useState(false);

  const getAssestmentData = () => {
    setLoading(true);
    API.get(EMPLOYEE_ASSESTMENT_SINGLE_GET(id))
      .then((res) => {
        if (res.data.statuscode === 200) {
          setEmployee_details(res.data?.data?.employee);
          setKpi_obj_curr(res.data?.data?.kpi_objective);
          setKpi_val_curr(res.data?.data?.kpi_value);
          setKpi_overall_curr(res.data?.data?.kpi_overall);
          setHr_rat_curr(res.data?.data?.hr_rating);
          setCriticality_curr(res.data?.data?.criticality);
          setPot_improve_curr(res.data?.data?.potential_for_improvement);
          setTech_imple_opera_curr_curr(res.data?.data?.technical_implementation_operational);
          setTop_avg_bot_performer_curr(res.data?.data?.top_average_bottom_performer);

          setBest_performer_team_curr(res.data?.data?.best_performer_team);
          setBest_innovator_team_curr(res.data?.data?.best_innovator_team);
          setBest_performer_org_curr(res.data?.data?.best_performer_org);
          setBest_performer_pm_curr(res.data?.data?.best_performer_pm);
          setConf_inc_noInc(res.data?.data?.confirmation_increment_noincrement);
          setPropose_sbu(res.data?.data?.proposed_by_sbu_director_pm_self);
          // setProposed_designation(res.data?.data?.employee?.designation);
          if (res.data?.data?.proposed_designation === null) {
            setProposed_designation(res.data?.data?.employee?.designation);
            setProposed_designation_id(res.data?.data?.employee?.desig_id);
          } else {
            setProposed_designation(res.data?.data?.proposed_designation);
            setProposed_designation_id(res.data?.data?.employee?.desig_id);
          }
          setRemarks(res.data?.data?.remarks);
          setFlag(res.data?.data?.flag);
          setIsSupervisor(res.data?.data?.is_supervisor);

          // Employee duration formatiing
          let diff = moment().diff(res.data?.data?.employee.date_of_joining, "months", false) / 12;
          setdiffByYear(diff.toFixed(1).toString().split(".")[0]);
          setdiffByMonths(diff.toFixed(1).toString().split(".")[1]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Save Func
  const handleSave = (e) => {
    e.preventDefault();
    if (
      employee_details === "" ||
      employee_details === null ||
      kpi_obj_curr === "" ||
      kpi_obj_curr === null ||
      kpi_val_curr === "" ||
      kpi_val_curr === null ||
      hr_rat_curr === "" ||
      hr_rat_curr === null ||
      criticality_curr === "" ||
      criticality_curr === null ||
      pot_improve_curr === "" ||
      pot_improve_curr === null ||
      tech_imple_opera_curr === "" ||
      tech_imple_opera_curr === null ||
      top_avg_bot_performer_curr === "" ||
      top_avg_bot_performer_curr === null ||
      best_performer_team_curr === "" ||
      best_performer_team_curr === null ||
      best_innovator_team_curr === "" ||
      best_innovator_team_curr === null ||
      best_performer_org_curr === "" ||
      best_performer_org_curr === null ||
      best_performer_pm_curr === "" ||
      best_performer_pm_curr === null ||
      conf_inc_noInc === "" ||
      conf_inc_noInc === null ||
      propose_SBU === "" ||
      propose_SBU === null ||
      proposed_designation === "" ||
      proposed_designation === null
    ) {
      error_alert("please select all feild");
      setIsConfirm(false);
    } else {
      const payload = {
        employee: id,
        kpi_objective: kpi_obj_curr,
        kpi_value: kpi_val_curr,
        hr_rating: hr_rat_curr,
        criticality: criticality_curr,
        potential_for_improvement: pot_improve_curr,
        technical_implementation_operational: tech_imple_opera_curr,
        top_average_bottom_performer: top_avg_bot_performer_curr,
        best_performer_team: best_performer_team_curr,
        best_innovator_team: best_innovator_team_curr,
        best_performer_org: best_performer_org_curr,
        best_performer_pm: best_performer_pm_curr,
        confirmation_increment_noincrement: conf_inc_noInc,
        proposed_by_sbu_director_pm_self: propose_SBU,
        proposed_designation: proposed_designation,
        proposed_designation_id: proposed_designation_id,
        remarks: remarks,
        final: false,
        // approve_by_sbu: user.group_id.split(",").includes("2") && isSupervisor === "False" ? 1 : 0, //when approved by head
        // detail_save:""
      };

      setLoading(true);
      API.put(EMPLOYEE_ASSESTMENT_SINGLE_POST(id), payload)
        .then((res) => {
          if (res.data.statuscode === 200) {
            success_alert(res.data.message);
            navigate(-1);
            getAssestmentData();
          } else {
            error_alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
          setIsConfirm(false);
        });
    }
  };

  //Lifecycle
  useEffect(() => {
    getAssestmentData();
  }, []);

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsConfirm(true);
  };

  if (flag === 1 && user.group_id.split(",").includes("1")) {
    return <Navigate to={UNAUTHORIZED} />;
  }
  return user.accessibility.includes("assessment.list") || user.accessibility.includes("assessment.supervisor_head") ? (
    <Layout>
      {loading && <Loader />}
      <PageHeader title="Assessment Details" onBack />
      <Content>
        {/* Heading */}
        <Row className="d-flex align-items-center">
          <Col sm="12" md="6">
            <div className="mb-0 ">
              <h1 className="mb-2 me-2">{employee_details?.name} </h1>
              <h4 className="mb-0"> {employee_details?.employee_id} </h4>
            </div>
          </Col>
          <Col sm="12" md="6">
            <Row>
              <Col sm="6" md="6">
                <h5 className="mb-1 text-secondary">Date of Joining</h5>
                <h4 className="text-dark">{moment(employee_details?.date_of_joining).format(DATE_FORMAT)}</h4>
              </Col>
              <Col sm="6" md="6">
                <h5 className="mb-1 text-secondary">Duration</h5>
                <h4>
                  {diffByYear} Years {diffByMonths} Months
                </h4>
              </Col>
              <Col sm="6" md="6">
                <h5 className="mb-1 text-secondary">Assessment Duration</h5>
                <h4>12 months</h4>
              </Col>
              <Col sm="6" md="6">
                <h5 className="mb-1 text-secondary">SBU</h5>
                <h4>{employee_details?.sbu?.name}</h4>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />

        {/* FORM BODY */}
        <div className="mt-4">
          <Form onSubmit={handleConfirm}>
            {/* KPI  */}
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0 py-3">KPI</h2>
                <i className="fe fe-bar-chart fs-2 text-muted"></i>
              </div>
              <div className="card-body">
                <Row>
                  <Col sm="6" md="4" className="mb-4">
                    <Form.Group>
                      <h4 className="text-secondary">
                        Objective {new Date().getFullYear()} <span className="text-danger">*</span>{" "}
                      </h4>
                    </Form.Group>
                    <ReactSelect
                      options={kpiObjectiveList}
                      placeholder={
                        kpi_obj_curr !== "" && kpiObjectiveList?.map((d) => (d.value === kpi_obj_curr ? d.label : null))
                      }
                      onChange={(e) => {
                        setKpi_obj_curr(e.value);
                      }}
                      // isDisabled={user.group_id.split(",").includes("2") && isSupervisor === "False"}
                    />
                  </Col>
                  <Col sm="6" md="4" className="mb-4">
                    <Form.Group>
                      <h4 className="text-secondary">
                        Value {new Date().getFullYear()} <span className="text-danger">*</span>{" "}
                      </h4>
                    </Form.Group>
                    <ReactSelect
                      options={kpiValueList}
                      placeholder={
                        kpi_val_curr !== "" && kpiValueList?.map((d) => (d.value === kpi_val_curr ? d.label : null))
                      }
                      onChange={(e) => {
                        setKpi_val_curr(e.value);
                      }}
                      // isDisabled={user.group_id.split(",").includes("2") && isSupervisor === "False"}
                    />
                  </Col>
                  {user.group_id.split(",").includes("7") && (
                    <Col sm="6" md="4" className="mb-4">
                      <Form.Group>
                        <h4 className="text-secondary">
                          HR Rating {new Date().getFullYear()} <span className="text-danger">*</span>
                        </h4>
                      </Form.Group>
                      <ReactSelect
                        options={hrRatingList}
                        placeholder={
                          hr_rat_curr !== "" && hrRatingList?.map((d) => (d.value === hr_rat_curr ? d.label : null))
                        }
                        onChange={(e) => {
                          setHr_rat_curr(e.value);
                        }}
                        // isDisabled={user.group_id.split(",").includes("2") && isSupervisor === "False"}
                      />
                    </Col>
                  )}

                  <Col sm="6" md="4" className="mb-4">
                    <Form.Group>
                      <h4 className="text-secondary">
                        KPI {new Date().getFullYear()} <span className="text-danger">*</span>
                      </h4>
                    </Form.Group>
                    <FormControl value={kpi_overall_curr} disabled className="bg-light" />
                  </Col>

                  <Col sm="6" md="4" className="mb-4">
                    <Form.Group>
                      <h4 className="text-secondary">
                        Criticality {new Date().getFullYear()} <span className="text-danger">*</span>
                      </h4>
                    </Form.Group>
                    <ReactSelect
                      options={criticalityList}
                      placeholder={
                        criticality_curr !== "" &&
                        criticalityList?.map((d) => (d.value === criticality_curr ? d.label : null))
                      }
                      onChange={(e) => {
                        setCriticality_curr(e.value);
                      }}
                      // isDisabled={user.group_id.split(",").includes("2") && isSupervisor === "False"}
                    />
                  </Col>
                </Row>
              </div>
            </div>

            {/* Permormance and outcome */}
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0 py-3">Permormance</h2>
                <i className="fe fe-sliders fs-2 text-muted"></i>
              </div>
              <div className="card-body">
                <Row>
                  <Col sm="6" md="4" className="mb-4">
                    <Form.Group>
                      <h4 className="text-secondary">
                        Top/Average/Bottom Performer {new Date().getFullYear()} <span className="text-danger">*</span>
                      </h4>
                    </Form.Group>
                    <ReactSelect
                      options={topAvgBotPerformerList}
                      // placeholder={top_avg_bot_performer_curr}
                      placeholder={
                        top_avg_bot_performer_curr !== "" &&
                        topAvgBotPerformerList?.map((d) => (d.value === top_avg_bot_performer_curr ? d.label : null))
                      }
                      onChange={(e) => {
                        setTop_avg_bot_performer_curr(e.value);
                      }}
                      // isDisabled={user.group_id.split(",").includes("2") && isSupervisor === "False"}
                    />
                  </Col>
                  <Col sm="6" md="4" className="mb-4">
                    <Form.Group>
                      <h4 className="text-secondary">
                        Best performer inside team {new Date().getFullYear()} <span className="text-danger">*</span>
                      </h4>
                    </Form.Group>
                    <ReactSelect
                      options={bestPerformerTeamList}
                      placeholder={
                        best_performer_team_curr !== "" &&
                        bestPerformerTeamList?.map((d) => (d.value === best_performer_team_curr ? d.label : null))
                      }
                      onChange={(e) => {
                        setBest_performer_team_curr(e.value);
                      }}
                      // isDisabled={user.group_id.split(",").includes("2") && isSupervisor === "False"}
                    />
                  </Col>
                  <Col sm="6" md="4" className="mb-4">
                    <Form.Group>
                      <h4 className="text-secondary">
                        Best performer in the organization {new Date().getFullYear()} <span className="text-danger">*</span>
                      </h4>
                    </Form.Group>
                    <ReactSelect
                      options={bestPerformerOrgList}
                      placeholder={
                        best_performer_org_curr !== "" &&
                        bestPerformerOrgList?.map((d) => (d.value === best_performer_org_curr ? d.label : null))
                      }
                      onChange={(e) => {
                        setBest_performer_org_curr(e.value);
                      }}
                      // isDisabled={user.group_id.split(",").includes("2") && isSupervisor === "False"}
                    />
                  </Col>

                  <Col sm="6" md="4" className="mb-4">
                    <Form.Group>
                      <h4 className="text-secondary">
                        Best performer among all PM {new Date().getFullYear()} <span className="text-danger">*</span>
                      </h4>
                    </Form.Group>
                    <ReactSelect
                      options={bestPerformerPmList}
                      placeholder={
                        best_performer_pm_curr !== "" &&
                        bestPerformerPmList?.map((d) => (d.value === best_performer_pm_curr ? d.label : null))
                      }
                      onChange={(e) => {
                        setBest_performer_pm_curr(e.value);
                      }}
                      // isDisabled={user.group_id.split(",").includes("2") && isSupervisor === "False"}
                    />
                  </Col>

                  <Col sm="6" md="4" className="mb-4">
                    <Form.Group>
                      <h4 className="text-secondary">
                        Best innovator inside team {new Date().getFullYear()} <span className="text-danger">*</span>
                      </h4>
                    </Form.Group>
                    <ReactSelect
                      options={bestInnovatorTeamList}
                      placeholder={
                        best_innovator_team_curr !== "" &&
                        bestInnovatorTeamList?.map((d) => (d.value === best_innovator_team_curr ? d.label : null))
                      }
                      onChange={(e) => {
                        setBest_innovator_team_curr(e.value);
                      }}
                      // isDisabled={user.group_id.split(",").includes("2") && isSupervisor === "False"}
                    />
                  </Col>
                </Row>
              </div>
            </div>

            {/* Outcome */}
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0 py-3">Outcome</h2>
                <i className="fe fe-trending-up fs-2 text-muted "></i>
              </div>
              <div className="card-body">
                <Row>
                  <Col sm="6" md="4" className="mb-4">
                    <Form.Group>
                      <h4 className="text-secondary">
                        Potential for Improvement <br /> {new Date().getFullYear()} <span className="text-danger">*</span>
                      </h4>
                    </Form.Group>
                    <ReactSelect
                      options={potentialImprovementList}
                      placeholder={
                        pot_improve_curr !== "" &&
                        potentialImprovementList?.map((d) => (d.value === pot_improve_curr ? d.label : null))
                      }
                      onChange={(e) => {
                        setPot_improve_curr(e.value);
                      }}
                      // isDisabled={user.group_id.split(",").includes("2") && isSupervisor === "False"}
                    />
                  </Col>
                  <Col sm="6" md="4" className="mb-4">
                    <Form.Group>
                      <h4 className="text-secondary">
                        Technical/Implementation/Operational {new Date().getFullYear()}{" "}
                        <span className="text-danger">*</span>
                      </h4>
                    </Form.Group>
                    <ReactSelect
                      options={technicalImplementationOperationalList}
                      placeholder={
                        tech_imple_opera_curr !== "" &&
                        technicalImplementationOperationalList?.map((d) =>
                          d.value === tech_imple_opera_curr ? d.label : null
                        )
                      }
                      onChange={(e) => {
                        setTech_imple_opera_curr_curr(e.value);
                      }}
                      // isDisabled={user.group_id.split(",").includes("2") && isSupervisor === "False"}
                    />
                  </Col>
                  <Col sm="6" md="4" className="mb-4">
                    <Form.Group>
                      <h4 className="text-secondary">
                        Confirmation/Increment/No Increment {new Date().getFullYear()} <span className="text-danger">*</span>
                      </h4>
                    </Form.Group>
                    <ReactSelect
                      options={confIncNoIncList}
                      placeholder={
                        conf_inc_noInc !== "" && confIncNoIncList?.map((d) => (d.value === conf_inc_noInc ? d.label : null))
                      }
                      onChange={(e) => {
                        setConf_inc_noInc(e.value);
                      }}
                      // isDisabled={user.group_id.split(",").includes("2") && isSupervisor === "False"}
                    />
                  </Col>
                  <Col sm="12" md="4" className="mb-4">
                    <Form.Group>
                      <h4 className="text-secondary">
                        Proposed Designation {new Date().getFullYear()} <span className="text-danger">*</span>
                      </h4>
                    </Form.Group>
                    <ReactSelect
                      options={designationList}
                      placeholder={proposed_designation}
                      // placeholder={
                      //   proposed_designation_id !== "" &&
                      //   designationList?.map((d) => (d.value === proposed_designation_id ? d.label : null))
                      // }
                      onChange={(e) => {
                        setProposed_designation(e.label);
                        setProposed_designation_id(e.value);
                      }}
                      // isDisabled={user.group_id.split(",").includes("2") && isSupervisor === "False"}
                    />
                  </Col>
                  <Col sm="6" md="4" className="mb-4">
                    <Form.Group>
                      <h4 className="text-secondary">
                        Proposed Amount By Supervisor {new Date().getFullYear()} <span className="text-danger">*</span>
                      </h4>
                    </Form.Group>
                    <FormControl
                      type="text"
                      value={propose_SBU}
                      onChange={(e) => {
                        setPropose_sbu(e.target.value.replace(/[^0-9]/g, ""));
                      }}
                      //  disabled={user.group_id.split(",").includes("2") && isSupervisor === "False"}
                    />
                  </Col>
                </Row>
              </div>
            </div>

            {/* Others */}
            <div className="card">
              <div className="card-header">
                <h2 className="mb-0 py-3">Others</h2>
                <i className="fe fe-align-right fs-2 text-muted "></i>
              </div>
              <div className="card-body">
                <Row>
                  <Col sm="12" md="12" className="mb-4">
                    <Form.Group>
                      <h4 className="text-secondary">Remarks {new Date().getFullYear()}</h4>
                    </Form.Group>
                    <FormControl
                      as="textarea"
                      rows={3}
                      value={remarks}
                      onChange={(e) => {
                        setRemarks(e.target.value);
                      }}
                      //  disabled={user.group_id.split(",").includes("2") && isSupervisor === "False"}
                    />
                  </Col>
                </Row>
              </div>
            </div>

            <button className="btn btn-primary px-4" type="submit">
              Save
            </button>

            <button className="btn btn-light px-4 ms-2 fw-bold" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </Form>
        </div>

        {isConfirm && (
          <ConfirmDialog
            message={"Are you sure you want to submit?"}
            onOkButtonClick={handleSave}
            onCancelButtonClick={(e) => setIsConfirm(false)}
          />
        )}
      </Content>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
