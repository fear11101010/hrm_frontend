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

export default function SalaryFullReport(props) {
    const {data, isLoading} = useSbu();
    const [loading, setLoading] = useState(false);
    const [selectedSbu, setSelectedSbu] = useState("");
    const [summaryData, setSummaryData] = useState("");
    const [selectedSbuName, setSelectedSbuName] = useState("");
    const [lastThreeYearData, setLastThreeYearData] = useState([]);
    const [employeeDetail, setEmployeeDetail] = useState({});
    const [allDsId, setAllDsId] = useState({});
    const currentYear = moment().year();
    const lastThreeYear = [currentYear-2,currentYear-1,currentYear];
    const sbuList = data?.map((d) => ({label: d.name, value: d.id}));
    const loadLastThreeYearData = async (e)=>{
        setLoading(true)
        try{
            const res = await API.get(REPORT_FULL_SUMMERY_API(e.value))
            setLastThreeYearData(res.data.data.reduce((c,p)=>{
                console.log(c);
                console.log(p);
                return ({...c,[Object.keys(p)[0]]:Object.values(p)[0]})
            },{}));
            if(Array.isArray(res.data.data)){
                const em = res.data.data.reduce((c,p)=> {
                    const obj = Object.values(p)[0];
                    const len = Object.values(p)[0]?.length;
                    const emm = Object.values(Object.values(p)[0][len-1])[0].employee;
                    return ({...c, [Object.keys(p)[0]]: emm})
                },{})

                setAllDsId(res.data.data.map(v=>Object.keys(v)[0]));
                setEmployeeDetail(em);
            }
            // console.log(lastThreeYearData)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    return (
        <Layout>
            <PageHeader title={"Assessment Full Report"}/>
            <Container>
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
                        {(allDsId && Array.isArray(allDsId) && allDsId.length>0) && allDsId.map((id,i)=>(
                            <Accordion className="mb-3">
                                <Accordion.Item eventKey={i}>
                                    <Accordion.Header as={"div"}  >
                                        <div>
                                            <div className="d-flex flex-row align-items-center">
                                                <h3 className="header-title mb-0" style={{marginRight:'5px'}}>{employeeDetail[id].name}</h3>
                                                <h6 className="header-pretitle mb-0">({id})</h6>
                                            </div>
                                            <h6 className="header-pretitle mb-0">{employeeDetail[id].designation}</h6>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Accordion>
                                            {lastThreeYear.map((year,i)=>(
                                                <Accordion.Item eventKey={i}>
                                                    <Accordion.Header as={"div"}  >
                                                        <div>
                                                            <h3 className="header-title mb-0">{year}</h3>
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body>

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