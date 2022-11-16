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

export default function SalaryFullReport(props) {
    const {data, isLoading} = useSbu();
    const [loading, setLoading] = useState(false);
    const [selectedSbu, setSelectedSbu] = useState("");
    const [summaryData, setSummaryData] = useState("");
    const [selectedSbuName, setSelectedSbuName] = useState("");
    const sbuList = data?.map((d) => ({label: d.name, value: d.id}));
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
                                        }}
                                    />
                                </Form.Group>
                            </Form>
                        </div>
                        <hr className="mb-4"/>
                        {/*<Accordion >
                            <Accordion.Item eventKey="0">
                                <Accordion.Header as={"div"}  >
                                    <div>
                                        <h3 className="header-title mb-0">1. PRODUCTION</h3>
                                        <h6 className="header-pretitle mb-0">(Product/
                                            Project)
                                            (Cost,
                                            revenue, quality, quantity)</h6>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <h6 className="header-pretitle mb-2">Objective</h6>
                                    <p className="fs-5 fw-bold" contentEditable={false} >{data?.production || 'N\\A'}</p>
                                    <Row>
                                        <Col sm={6} xs={12} md={6}>
                                            <h6 className="header-pretitle mb-2">Weightage Value</h6>
                                            <p className="fs-5 fw-bold" contentEditable={false} >{data?.production_weightage || 'N\\A'}</p>
                                        </Col>
                                        <Col sm={6} xs={12} md={6}>
                                            <h6 className="header-pretitle mb-2">Rating</h6>
                                            <p className="fs-5 fw-bold" contentEditable={false} >{findRatingElem(data?.production_rating) || 'N\\A'}</p>
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
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
                                            <p className="fs-5 fw-bold" contentEditable={false} >{findRatingElem(data?.support_rating) || 'N\\A'}</p>
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
                                            <p className="fs-5 fw-bold" contentEditable={false} >{findRatingElem(data?.innovation_rating) || 'N\\A'}</p>
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
                                            <p className="fs-5 fw-bold" contentEditable={false} >{findRatingElem(data?.people_rating) || 'N\\A'}</p>
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
                                            <p className="fs-5 fw-bold" contentEditable={false} >{findRatingElem(data?.other_rating) || 'N\\A'}</p>
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>*/}
                    </Card.Body>
                </Card>
            </Container>
            {isLoading && <Loader/>}
        </Layout>
    )
}