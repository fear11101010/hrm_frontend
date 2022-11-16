import moment from "moment";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import { error_alert, success_alert } from "../../../components/alert/Alert";
import ConfirmDialog from "../../../components/confirm-dialog/ConfirmDialog";
import Loader from "../../../components/loader/Loader";
import useBestInnovatorTeam from "../../../hooks/kpi/best_innovator_team";
import useBestPerformerOrganization from "../../../hooks/kpi/best_performer_organization";
import useBestPerformerPm from "../../../hooks/kpi/best_performer_pm";
import useBestPerformerTeam from "../../../hooks/kpi/best_performer_team";
import useConfIncNoinc from "../../../hooks/kpi/confirmation_increment_no_increment";
import useHrRating from "../../../hooks/kpi/hr_rating";
import useKpiObjective from "../../../hooks/kpi/kpi_objective";
import useKpiValue from "../../../hooks/kpi/kpi_value";
import usePotentialForImprovement from "../../../hooks/kpi/potential_improve";
import useTechnicalImplementationOperational from "../../../hooks/kpi/technical_implementation_operational";
import useTopAvgBotPerformer from "../../../hooks/kpi/top_average_bottom_performer";
import useFetch from "../../../hooks/useFetch";
import { KPI_PERMORMER_ASSESTMENT_INDIVIDUAL_GET, KPI_PERMORMER_ASSESTMENT_INDIVIDUAL_PUT } from "../../../utils/API_ROUTES";
import { API } from "../../../utils/axios/axiosConfig";
import { DATE_FORMAT } from "../../../utils/CONSTANT";
import { USER_INFO } from "../../../utils/session/token";

export default function EmployeePerformerDetails({ rowId, afterSubmit }) {
  const id = rowId;
  const user = USER_INFO();
  const { data, isLoading } = useFetch(KPI_PERMORMER_ASSESTMENT_INDIVIDUAL_GET(id));

  //
  const [loading, setLoading] = useState(false);

  // Input States
  const [propsed_by_sbuDirPmSelf, setPropsed_by_sbuDirPmSelf] = useState("");
  const [kpi_objective, setKpi_objective] = useState("");
  const [kpi_val, setKpi_val] = useState("");
  const [kpi_hr, setKpi_hr] = useState("");
  const [kpi_crit, setKpi_crit] = useState("");
  const [kpi_pot_improve, setKpi_pot_improve] = useState("");
  const [kpi_tech_impl_op, setKpi_tech_impl_op] = useState("");
  const [kpi_top_avg_bottom_performer, setKpi_top_avg_bottom_performer] = useState("");
  const [kpi_best_performer_team, setKpi_best_performer_team] = useState("");
  const [kpi_best_innovator_team, setKpi_best_innovator_team] = useState("");
  const [kpi_best_performer_org, setKpi_best_performer_org] = useState("");
  const [kpi_best_performer_pm, setKpi_best_performer_pm] = useState("");
  const [kpi_inc_no_inc, setKpi_inc_no_inc] = useState("");
  const [propsed_designation, setProposed_designation] = useState("");

  // Submit type state
  const [normalSubmit, setNormalSubmit] = useState(false);
  const [finalSubmit, setFinalSubmit] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  // CUSTOM HOOKS
  const kpiObjList = useKpiObjective();
  const kpiValList = useKpiValue();
  const kpiHrList = useHrRating();
  const kpiPotImproveList = usePotentialForImprovement();
  const kpiTechImpliOperationalList = useTechnicalImplementationOperational();
  const kpiTopAvgBotPerformerList = useTopAvgBotPerformer();
  const kpiBestPerformerTeamList = useBestPerformerTeam();
  const kpiBestInnovatorTeamList = useBestInnovatorTeam();
  const kpiBestPerformerOrgList = useBestPerformerOrganization();
  const kpiBestPerformerPmList = useBestPerformerPm();
  const conIncNoincList = useConfIncNoinc();

  // Getting current year
  const currYear = new Date().getFullYear();

  // Submit func
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      kpi_objective: kpi_objective === "" ? data.data?.kpi_objective : kpi_objective,
      kpi_value: kpi_val === "" ? data.data?.kpi_value : kpi_val,
      hr_rating: kpi_hr === "" ? data.data?.hr_rating : kpi_hr,
      criticality: kpi_crit === "" ? data.data?.criticality : kpi_crit,
      potential_for_improvement: kpi_pot_improve === "" ? data.data?.potential_for_improvement : kpi_pot_improve,
      technical_implementation_operational:
        kpi_tech_impl_op === "" ? data.data?.technical_implementation_operational : kpi_tech_impl_op,
      top_average_bottom_performer:
        kpi_top_avg_bottom_performer === "" ? data.data?.top_average_bottom_performer : kpi_top_avg_bottom_performer,
      best_performer_team: kpi_best_performer_team === "" ? data.data?.best_performer_team : kpi_best_performer_team,
      best_innovator_team: kpi_best_innovator_team === "" ? data.data?.best_innovator_team : kpi_best_innovator_team,
      best_performer_org: kpi_best_performer_org === "" ? data.data?.best_performer_org : kpi_best_performer_org,
      best_performer_pm: kpi_best_performer_pm === "" ? data.data?.best_performer_pm : kpi_best_performer_pm,
      confirmation_increment_noincrement:
        kpi_inc_no_inc === "" ? data.data?.confirmation_increment_noincrement : kpi_inc_no_inc,
      proposed_designation: propsed_designation === "" ? data.data?.proposed_designation : propsed_designation,
      proposed_by_sbu_director_pm_sel: data.data?.proposed_by_sbu_director_pm_self,
      remarks: data.data?.remarks,
      remarks_two: data.data?.remarks_two,
      detail_save: "",
      report_save: "",
      final: finalSubmit ? true : false,
    };

    setLoading(true);
    API.put(KPI_PERMORMER_ASSESTMENT_INDIVIDUAL_PUT(id), payload)
      .then((res) => {
        if (res.data.statuscode === 200) {
          success_alert(res.data.message);
          afterSubmit();
        } else {
          error_alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsConfirm(true);
  };
  return (
    <div>
      {isLoading && <Loader />}
      {loading && <Loader />}

      <Form onSubmit={handleConfirm}>
        <div className="bg-white p-4 rounded shadow-sm">
          {/* Employee Details */}
          <Row className="mb-4 border-bottom">
            <Col sm="12" md="6">
              <h2 className="mb-1">{data.data?.employee?.name}</h2>
              <h4 className="mb-1 text-secondary">{data.data?.employee?.employee_id}</h4>
              <h4 className="text-secondary">{data.data?.employee?.designation}</h4>
            </Col>
            <Col sm="12" md="6">
              <Row>
                <Col sm="12" md="4">
                  <h5 className="text-secondary mb-0">SBU</h5>
                  <h4 className="text-dark">{data.data?.employee?.sbu?.name}</h4>
                </Col>
                <Col sm="12" md="4">
                  <h5 className="text-secondary mb-0">Sub SBU</h5>
                  <h4 className="text-dark">{data.data?.employee?.sub_sbu?.name}</h4>
                </Col>
                <Col sm="12" md="4">
                  <h5 className="text-secondary mb-0">SBU Director</h5>
                  <h4 className="text-dark">{data.data?.employee?.sbu?.director_name}</h4>
                </Col>
                <Col sm="12" md="4">
                  <h5 className="text-secondary mb-0">Date of Joining</h5>
                  <h4 className="text-dark">{moment(data.data?.employee?.date_of_joining).format(DATE_FORMAT)}</h4>
                </Col>
                <Col sm="12" md="8">
                  <h5 className="text-secondary mb-0">PM Name</h5>
                  <h4 className="text-dark">{data.data?.supervisor?.name}</h4>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* FIXED BAR always open Employee */}
          <Row>
            <Col sm="12" md="3">
              <Form.Label className="mb-2 text-secondary">Team Distribution (%) {currYear} (C) </Form.Label>
              <p>{data.data?.team_distribution_percentage_c}</p>
            </Col>
            <Col sm="12" md="5">
              <Form.Label className="mb-2 text-secondary">
                Difference = New salary A- New salary B {currYear} (C){" "}
              </Form.Label>
              <p>{data.data?.difference_new_salary_a_new_salary_b}</p>
            </Col>
            <Col sm="12" md="4">
              <Form.Label className="mb-2 text-secondary">Proposed By SBU Director/PM/Self {currYear} (C) </Form.Label>
              <p>{data.data?.proposed_by_sbu_director_pm_self}</p>
              {/* <Form.Control
              type="text"
              value={propsed_by_sbuDirPmSelf === "" ? data.data?.proposed_by_sbu_director_pm_self : propsed_by_sbuDirPmSelf}
              onChange={(e) => {
                setPropsed_by_sbuDirPmSelf(e.target.value);
              }}
            /> */}
            </Col>
          </Row>
        </div>

        {/* KPI */}
        <Accordion className="mt-4">
          <Accordion.Item eventKey="0" className="bg-white">
            <Accordion.Header>
              <h3 className="mb-0">KPI</h3>
            </Accordion.Header>
            <Accordion.Body>
              {/* Static part */}
              <Row>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">% of KPI-Objective {currYear} </Form.Label>
                  <p>{data.data?.percentage_kpi_objective}</p>
                </Col>
                <Col sm="12" md="2">
                  <Form.Label className="mb-1 text-secondary">% of KPI-Value {currYear} </Form.Label>
                  <p>{data.data?.percentage_kpi_value}</p>
                </Col>
                <Col sm="12" md="2">
                  <Form.Label className="mb-1 text-secondary">% of KPI-HR {currYear} </Form.Label>
                  <p>{data.data?.percentage_kpi_hr}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">Weighted Average of KPI % {currYear} </Form.Label>
                  <p>{data.data?.weighted_average_kpi}</p>
                </Col>
                <Col sm="12" md="2">
                  <Form.Label className="mb-1 text-secondary"> KPI-Overall {currYear}</Form.Label>
                  <p>{data.data?.kpi_overall}</p>
                </Col>
              </Row>

              {/* Input part */}
              <Row className="mt-3">
                <Col sm="12" md="4" className="mb-3">
                  <Form.Label className="mb-1 text-dark"> KPI Objective {currYear}</Form.Label>
                  <Form.Select
                    value={kpi_objective === "" ? data.data?.kpi_objective : kpi_objective}
                    onChange={(e) => {
                      setKpi_objective(e.target.value);
                    }}
                  >
                    <option>------</option>
                    {kpiObjList?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm="12" md="4" className="mb-3">
                  <Form.Label className="mb-1 text-dark"> KPI Value {currYear}</Form.Label>
                  <Form.Select
                    value={kpi_val === "" ? data.data?.kpi_value : kpi_val}
                    onChange={(e) => {
                      setKpi_val(e.target.value);
                    }}
                  >
                    <option>------</option>
                    {kpiValList?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm="12" md="4" className="mb-3">
                  <Form.Label className="mb-1 text-dark"> KPI HR {currYear}</Form.Label>
                  <Form.Select
                    value={kpi_hr === "" ? data.data?.hr_rating : kpi_hr}
                    onChange={(e) => {
                      setKpi_hr(e.target.value);
                    }}
                  >
                    <option>------</option>
                    {kpiHrList?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm="12" md="4" className="mb-3">
                  <Form.Label className="mb-1 text-dark"> Criticality {currYear}</Form.Label>
                  <Form.Select
                    value={kpi_crit === "" ? data.data?.criticality : kpi_crit}
                    onChange={(e) => {
                      setKpi_crit(e.target.value);
                    }}
                  >
                    <option>------</option>
                    {kpiHrList?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm="12" md="4" className="mb-3">
                  <Form.Label className="mb-1 text-dark"> Potential for Improvement {currYear}</Form.Label>
                  <Form.Select
                    value={kpi_pot_improve === "" ? data.data?.potential_for_improvement : kpi_pot_improve}
                    onChange={(e) => {
                      setKpi_pot_improve(e.target.value);
                    }}
                  >
                    <option>------</option>
                    {kpiPotImproveList?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm="12" md="4" className="mb-3">
                  <Form.Label className="mb-1 text-dark">Technical/Implementation/Operational {currYear}</Form.Label>
                  <Form.Select
                    value={kpi_tech_impl_op === "" ? data.data?.technical_implementation_operational : kpi_tech_impl_op}
                    onChange={(e) => {
                      setKpi_tech_impl_op(e.target.value);
                    }}
                  >
                    <option>------</option>
                    {kpiTechImpliOperationalList?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm="12" md="4" className="mb-3">
                  <Form.Label className="mb-1 text-dark">Top/Average/Bottom Performer {currYear}</Form.Label>
                  <Form.Select
                    value={
                      kpi_top_avg_bottom_performer === ""
                        ? data.data?.top_average_bottom_performer
                        : kpi_top_avg_bottom_performer
                    }
                    onChange={(e) => {
                      setKpi_top_avg_bottom_performer(e.target.value);
                    }}
                  >
                    <option>------</option>
                    {kpiTopAvgBotPerformerList?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm="12" md="4" className="mb-3">
                  <Form.Label className="mb-1 text-dark">Best performer inside team {currYear}</Form.Label>
                  <Form.Select
                    value={kpi_best_performer_team === "" ? data.data?.best_performer_team : kpi_best_performer_team}
                    onChange={(e) => {
                      setKpi_best_innovator_team(e.target.value);
                    }}
                  >
                    <option>------</option>
                    {kpiBestPerformerTeamList?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm="12" md="4" className="mb-3">
                  <Form.Label className="mb-1 text-dark">Best innovator inside team {currYear}</Form.Label>
                  <Form.Select
                    value={kpi_best_innovator_team === "" ? data.data?.best_innovator_team : kpi_best_innovator_team}
                    onChange={(e) => {
                      setKpi_best_innovator_team(e.target.value);
                    }}
                  >
                    <option>------</option>
                    {kpiBestInnovatorTeamList?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm="12" md="4" className="mb-3">
                  <Form.Label className="mb-1 text-dark">Best Performer in the organization {currYear}</Form.Label>
                  <Form.Select
                    value={kpi_best_performer_org === "" ? data.data?.best_performer_org : kpi_best_performer_org}
                    onChange={(e) => {
                      setKpi_best_performer_org(e.target.value);
                    }}
                  >
                    <option>------</option>
                    {kpiBestPerformerOrgList?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm="12" md="4" className="mb-3">
                  <Form.Label className="mb-1 text-dark">Best Performer among all PM {currYear}</Form.Label>
                  <Form.Select
                    value={kpi_best_performer_pm === "" ? data.data?.best_performer_pm : kpi_best_performer_pm}
                    onChange={(e) => {
                      setKpi_best_performer_pm(e.target.value);
                    }}
                  >
                    <option>------</option>
                    {kpiBestPerformerPmList?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm="12" md="4" className="mb-3">
                  <Form.Label className="mb-1 text-dark">Confirmation / Increment / No Increment</Form.Label>
                  <Form.Select
                    value={kpi_inc_no_inc === "" ? data.data?.confirmation_increment_noincrement : kpi_inc_no_inc}
                    onChange={(e) => {
                      setKpi_inc_no_inc(e.target.value);
                    }}
                  >
                    <option>------</option>
                    {conIncNoincList?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm="12" md="4" className="mb-3">
                  <Form.Label className="mb-1 text-dark">Proposed Designation{currYear}</Form.Label>
                  <Form.Control
                    type="text"
                    value={propsed_designation === "" ? data.data?.proposed_designation : propsed_designation}
                    onChange={(e) => {
                      setProposed_designation(e.target.value);
                    }}
                  />
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* Salary and Allowance */}
        <Accordion className="mt-4">
          <Accordion.Item eventKey="0" className="bg-white">
            <Accordion.Header>
              <h3 className="mb-0">Salary and Allowance</h3>
            </Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">Total Salary and Allowance </Form.Label>
                  <p>{data.data?.total_salary_and_allowance}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">Basic</Form.Label>
                  <p>{data.data?.basic_salary}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">House Rent</Form.Label>
                  <p>{data.data?.house_rent}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">Medical Allowance</Form.Label>
                  <p>{data.data?.medical_allowance}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">Conveyance Allowance</Form.Label>
                  <p>{data.data?.conveyance_allowance}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">WPPF</Form.Label>
                  <p>{data.data?.wppf}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">Special Bonus</Form.Label>
                  <p>{data.data?.special_bonus}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">Mobile and Other Allowance</Form.Label>
                  <p>{data.data?.mobile_and_other_allowance}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">Project Expense </Form.Label>
                  <p>{data.data?.project_expense}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary"> Other Benefits</Form.Label>
                  <p>{data.data?.other_benefit}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">Gross Salary </Form.Label>
                  <p>{data.data?.gross_salary}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">PF Com Contribution </Form.Label>
                  <p>{data.data?.pf_com_contribution}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">Year of Assessment Duration 2022 </Form.Label>
                  <p>
                    Grade {data.data?.salary_grade} {currYear} 12 Months
                  </p>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* Increment  */}
        <Accordion className="mt-4">
          <Accordion.Item eventKey="0" className="bg-white">
            <Accordion.Header>
              <h3 className="mb-0">Increment</h3>
            </Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">Salary Grade {currYear} </Form.Label>
                  <p>{data.data?.salary_grade}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary"> Increment Amount (HR) {currYear} (A)</Form.Label>
                  <p>{data.data?.increment_amount_a}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">New Gross Salary {currYear} (A) </Form.Label>
                  <p>{data.data?.hr_new_gross_salary_a}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary"> HR % {currYear}</Form.Label>
                  <p>{data.data?.percentage_hr_a}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">Fixed Increment (%) {currYear} (B) </Form.Label>
                  <p>{data.data?.fixed_increment_b}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary"> Fixed Increment New Gross Salary {currYear} (B)</Form.Label>
                  <p>{data.data?.fixed_increment_new_gross_salary_b}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary"> % of Increment: {currYear}</Form.Label>
                  <p>{data.data?.percentage_of_increment}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary"> New Gross Salary B {currYear}</Form.Label>
                  <p>{data.data?.new_gross_salary_b}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">CAGR 3 years {currYear} </Form.Label>
                  <p>{data.data?.cagr_three_years}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">Avarage 3 Years {currYear} </Form.Label>
                  <p>{data.data?.average_three_years}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary"> Average Actual {currYear}</Form.Label>
                  <p>{data.data?.average_actual}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary"> KPI-Overall {currYear}</Form.Label>
                  <p>{data.data?.kpi_overall}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary"> Weighted Average of KPI % {currYear}</Form.Label>
                  <p>{data.data?.weighted_average_kpi}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary">Increment with KPI % {currYear} </Form.Label>
                  <p>{data.data?.increment_with_kpi_percentage}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary"> New Gross Salary KPI % {currYear}</Form.Label>
                  <p>{data.data?.new_gross_salary_kpi_percentage}</p>
                </Col>
                <Col sm="12" md="3">
                  <Form.Label className="mb-1 text-secondary"> Gap Manual vs Formula {currYear}</Form.Label>
                  <p>{data.data?.gap_manual_formula}</p>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* Buttons */}
        <div className="mt-4 mb-4 text-end">
          <Button
            type="submit"
            variant="info"
            className="ms-0"
            onClick={() => {
              setNormalSubmit(true);
              setFinalSubmit(false);
            }}
          >
            Save Changes
          </Button>
          {user.group_id === "1" && (
            <Button
              type="submit"
              className="ms-2"
              onClick={() => {
                setFinalSubmit(true);
                setNormalSubmit(false);
              }}
            >
              Final Submit
            </Button>
          )}
        </div>

        {isConfirm && (
          <ConfirmDialog
            message={"Are you sure you want to submi?"}
            onOkButtonClick={handleSubmit}
            onCancelButtonClick={(e) => setIsConfirm(false)}
          />
        )}
      </Form>
    </div>
  );
}
