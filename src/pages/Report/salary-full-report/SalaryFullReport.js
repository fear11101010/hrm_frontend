import {Accordion, Card, Col, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import useSbu from "../../../hooks/SBU/useSbu";
import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import Select from "react-select";
import Loader from "../../../components/loader/Loader";
import {SALARY_PIVOT_SUMMARY_REPORT_URL} from "../../../utils/APP_ROUTES";
import useFetch from "../../../hooks/useFetch";
import {REPORT_FULL_SUMMERY_API} from "../../../utils/API_ROUTES";
import {API} from "../../../utils/axios/axiosConfig";
import moment from "moment";
import ExcelPdfPrint from "../../../components/excel-pdf-print/ExcelPdfPrint";
import {SALARY_FULL_REPORT} from "../excel-columns";

export default function SalaryFullReport(props) {
    const {data, isLoading} = useSbu();
    const [loading, setLoading] = useState(false);
    const [selectedSbu, setSelectedSbu] = useState("");
    const [summaryData, setSummaryData] = useState("");
    const [selectedSbuName, setSelectedSbuName] = useState("");
    const [lastThreeYearData, setLastThreeYearData] = useState({});
    const [employeeDetail, setEmployeeDetail] = useState({});
    const [allDsId, setAllDsId] = useState({});
    const currentYear = moment().year();
    const lastThreeYear = [currentYear-2,currentYear-1,currentYear];
    const sbuList = data?.map((d) => ({label: d.name, value: d.id}));
    const durations = (date)=>{
        const duration = moment.duration(moment().diff(date));
        return `${duration.years()} years, ${duration.months()} month`
    }
    const loadLastThreeYearData = async (e)=>{
        setLoading(true)
        try{
            const res = await API.get(REPORT_FULL_SUMMERY_API(e.value))

            if(Array.isArray(res.data.data)){
                const em = res.data.data.reduce((c,p)=> {
                    const obj = Object.values(p)[0];
                    const len = Object.values(p)[0]?.length;
                    const emm = Object.values(Object.values(p)[0][len-1])[0].employee;
                    return ({...c, [Object.keys(p)[0]]: emm})
                },{})
                const lty = res.data.data.reduce((c,p)=>{
                    const key = Object.keys(p)[0];
                    const values = Object.values(p)[0].reduce((a,c)=>({...a,...c}),{});
                    return {...c,[key]:values}
                },{});
                setLastThreeYearData({...lty});
                setAllDsId(res.data.data.map(v=>Object.keys(v)[0]));
                setEmployeeDetail(em);
                console.log(lastThreeYearData)
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    return (
        <Layout>
            <PageHeader title={"Salary Full Report"}/>
            <Container fluid>
                <Card>
                    <Card.Body>
                        <div className="w-50 m-auto">
                            <Form >
                                <Form.Group>
                                    <Form.Label>SBU</Form.Label>
                                    <Select
                                        options={sbuList}
                                        placeholder="Select SBU"
                                        onChange={(e) => {
                                            setSelectedSbu(e.value);
                                            setSelectedSbuName(e.label);
                                            loadLastThreeYearData(e);
                                        }}
                                    />
                                </Form.Group>
                            </Form>
                        </div>
                        <hr className="mb-4"/>
                        {lastThreeYearData && <ExcelPdfPrint
                            exportPdf={false}
                            print={false}
                            header={"Salary Full Report"}
                            data={Object.values(lastThreeYearData)}
                            columns={SALARY_FULL_REPORT(lastThreeYear)}/>
                        }
                        {(allDsId && Array.isArray(allDsId) && allDsId.length>0) && allDsId.map((id,i)=>(
                            <Accordion className="mb-3">
                                <Accordion.Item eventKey={i}>
                                    <Accordion.Header as={"div"}  >
                                        <div>
                                            <div className="d-flex flex-row align-items-center">
                                                <h3 className="header-title mb-0" style={{marginRight:'5px'}}>{employeeDetail[id]?.name}</h3>
                                                <h6 className="header-pretitle mb-0">({id})</h6>
                                            </div>
                                            <h6 className="header-pretitle mb-0">{employeeDetail[id]?.designation}</h6>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            <Col sm={6} md={4} lg={3} xl={3}>
                                                <h6 className="header-pretitle">Date of joining</h6>
                                                <p>{employeeDetail[id]?.date_of_joining?moment(employeeDetail[id]?.date_of_joining).format('MMM DD,YYYY'):''}</p>
                                            </Col>
                                            <Col sm={6} md={4} lg={3} xl={3}>
                                                <h6 className="header-pretitle">Durations</h6>
                                                <p>{durations(employeeDetail[id]?.date_of_joining)}</p>
                                            </Col>
                                            <Col sm={6} md={4} lg={3} xl={3}>
                                                <h6 className="header-pretitle">SBU</h6>
                                                <p>{employeeDetail[id]?.sbu?.name}</p>
                                            </Col>
                                            <Col sm={6} md={4} lg={3} xl={3}>
                                                <h6 className="header-pretitle">Sub SBU</h6>
                                                <p>{employeeDetail[id]?.sub_sbu?.name}</p>
                                            </Col>
                                        </Row>
                                        <Accordion>
                                            {lastThreeYear.map((year,i)=>(
                                                <Accordion.Item eventKey={i}>
                                                    <Accordion.Header as={"div"}  >
                                                        <div>
                                                            <h3 className="header-title mb-0">{year}</h3>
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <Row>
                                                            {/*{JSON.stringify(lastThreeYearData[id]?.[year])}*/}
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">KPI Objective {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.kpi_objective?.name}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">KPI-Value {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.kpi_value?.name}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">KPI-HR {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.hr_rating?.name}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">KPI-Overall {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.kpi_overall}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">% of KPI-Objective {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.percentage_kpi_objective}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">% of KPI-HR {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.percentage_kpi_hr}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Weighted Average of KPI % {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.weighted_average_kpi}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Criticality {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.criticality?.name}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Potential for Improvement {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.potential_for_improvement?.name}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Technical/Implementation/Operational {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.technical_implementation_operational?.name}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Top/Average/Bottom Performer {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.top_average_bottom_performer?.name}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Best performer inside team {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.best_performer_team?.name}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Best innovator inside team {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.best_innovator_team?.name}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Best Performer in the organization {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.best_performer_org?.name}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Proposed Designation {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.proposed_designation}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Best Performer among all PM {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.best_performer_pm?.name}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Increment Amount (HR) {year} (A)</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.hr_rating?.name}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">HR New Gross Salary {year} (A)</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.hr_new_gross_salary_a}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">HR % {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.percentage_hr_a}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Fixed Increment (%) {year} (B)</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.fixed_increment_b}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Fixed Increment New Gross Salary B {year} (B)</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.fixed_increment_new_gross_salary_b}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Team Distribution (%) {year} (C)</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.team_distribution_percentage_c}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Difference = New salary A- New salary B {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.difference_new_salary_a_new_salary_b}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Proposed By SBU Director/PM/Self {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.proposed_by_sbu_director_pm_self}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">% of Increment {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.percentage_of_increment}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">New Gross Salary B {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.new_gross_salary_b}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">CAGR 3 years {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.cagr_three_years}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Avarage 3 Years {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.average_three_years}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Average Actual {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.average_actual}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Weighted Average of KPI % {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.weighted_average_kpi}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Increment with KPI % {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.increment_with_kpi_percentage}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">New Gross Salary KPI % % {year}</h6>
                                                                {/*<p>{lastThreeYearData[id]?.[year]?.increment_with_kpi_percentage}</p>*/}
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Increment with KPI % {year}</h6>
                                                                {/*<p>{lastThreeYearData[id]?.[year]?.increment_with_kpi_percentage}</p>*/}
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">New Gross Salary KPI % {year}</h6>
                                                                {/*<p>{lastThreeYearData[id]?.[year]?.increment_with_kpi_percentage}</p>*/}
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Gap Manual vs Formula {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.gap_manual_formula}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Remarks {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.remark}</p>
                                                            </Col>
                                                            <Col sm={6} md={4} lg={4} xl={3}>
                                                                <h6 className="header-pretitle">Remarks 2 {year}</h6>
                                                                <p>{lastThreeYearData[id]?.[year]?.remarks_two}</p>
                                                            </Col>
                                                        </Row>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            ))}
                                        </Accordion>

                                    </Accordion.Body>
                                    {/*<Accordion.Body>
                                        <h6 className="header-pretitle mb-2">Objective</h6>
                                        <p className="fs-5 fw-bold" contentEditable={false} >{data?.production || 'N\\A'}</p>
                                        <Row>
                                            <Col sm={6} xs={12} md={6}>
                                                <h6 className="header-pretitle mb-2">Weightage Value</h6>
                                                <p className="fs-5 fw-bold" contentEditable={false} >{data?.production_weightage || 'N\\A'}</p>
                                            </Col>
                                            <Col sm={6} xs={12} md={6}>
                                                <h6 className="header-pretitle mb-2">Rating</h6>
                                                <p className="fs-5 fw-bold" contentEditable={false} >{production_rating) || 'N\\A'}</p>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>*/}
                                </Accordion.Item>
                                {/*<Accordion.Item eventKey="1">
                                    <Accordion.Header as={"div"}  >
                                        <div>
                                            <h3 className="header-title mb-0">2. SUPPORT</h3>
                                            <h6 className="header-pretitle mb-0">(Service, problem resolution,
                                                customer
                                                perception,
                                                business risk & reputation )</h6>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <h6 className="header-pretitle mb-2">Objective</h6>
                                        <p className="fs-5 fw-bold" contentEditable={false} >{data?.support || 'N\\A'}</p>
                                        <Row>
                                            <Col sm={6} xs={12} md={6}>
                                                <h6 className="header-pretitle mb-2">Weightage Value</h6>
                                                <p className="fs-5 fw-bold" contentEditable={false} >{data?.support_weightage || 'N\\A'}</p>
                                            </Col>
                                            <Col sm={6} xs={12} md={6}>
                                                <h6 className="header-pretitle mb-2">Rating</h6>
                                                <p className="fs-5 fw-bold" contentEditable={false} >{support_rating) || 'N\\A'}</p>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header as={"div"}  >
                                        <div>
                                            <h3 className="header-title mb-0">3. INNOVATION</h3>
                                            <h6 className="header-pretitle mb-0">(New ideas and
                                                implementation)</h6>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <h6 className="header-pretitle mb-2">Objective</h6>
                                        <p className="fs-5 fw-bold" contentEditable={false} >{data?.innovation || 'N\\A'}</p>
                                        <Row>
                                            <Col sm={6} xs={12} md={6}>
                                                <h6 className="header-pretitle mb-2">Weightage Value</h6>
                                                <p className="fs-5 fw-bold" contentEditable={false} >{data?.innovation_weightage || 'N\\A'}</p>
                                            </Col>
                                            <Col sm={6} xs={12} md={6}>
                                                <h6 className="header-pretitle mb-2">Rating</h6>
                                                <p className="fs-5 fw-bold" contentEditable={false} >{innovation_rating) || 'N\\A'}</p>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header as={"div"}  >
                                        <div>
                                            <h3 className="header-title mb-0">4. PEOPLE</h3>
                                            <h6 className="header-pretitle mb-0">(Leadership, management,
                                                training)</h6>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <h6 className="header-pretitle mb-2">Objective</h6>
                                        <p className="fs-5 fw-bold" contentEditable={false} >{data?.people || 'N\\A'}</p>
                                        <Row>
                                            <Col sm={6} xs={12} md={6}>
                                                <h6 className="header-pretitle mb-2">Weightage Value</h6>
                                                <p className="fs-5 fw-bold" contentEditable={false} >{data?.people_weightage || 'N\\A'}</p>
                                            </Col>
                                            <Col sm={6} xs={12} md={6}>
                                                <h6 className="header-pretitle mb-2">Rating</h6>
                                                <p className="fs-5 fw-bold" contentEditable={false} >{people_rating) || 'N\\A'}</p>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header as={"div"}  >
                                        <div>
                                            <h3 className="header-title mb-0">5. OTHER</h3>
                                            <h6 className="header-pretitle mb-0">(Learning &
                                                development)</h6>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <h6 className="header-pretitle mb-2">Objective</h6>
                                        <p className="fs-5 fw-bold" contentEditable={false} >{data?.other || 'N\\A'}</p>
                                        <Row>
                                            <Col sm={6} xs={12} md={6}>
                                                <h6 className="header-pretitle mb-2">Weightage Value</h6>
                                                <p className="fs-5 fw-bold" contentEditable={false} >{data?.other_weightage || 'N\\A'}</p>
                                            </Col>
                                            <Col sm={6} xs={12} md={6}>
                                                <h6 className="header-pretitle mb-2">Rating</h6>
                                                <p className="fs-5 fw-bold" contentEditable={false} >{other_rating) || 'N\\A'}</p>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>*/}
                            </Accordion>
                        ))}
                    </Card.Body>
                </Card>
            </Container>
            {(isLoading || loading) && <Loader/>}
        </Layout>
    )
}