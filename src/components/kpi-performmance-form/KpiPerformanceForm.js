import {useOutletContext} from "react-router-dom";
import {useEffect} from "react";
import {Card, Col, Form, Row} from "react-bootstrap";

function KpiPerformanceForm({header}) {
    const {setHeader} = useOutletContext();
    useEffect(() => {
        console.log(header);
        setHeader(header);
    }, [setHeader, header])
    return (

        <Card>
            <Card.Header className="pt-2">
                <Card.Title className="card-header-title">
                    <Row>
                        <Col xs={12} sm={12} md={6} className="d-flex flex-row">
                            <span className="mb-2 h3">Name : </span>
                            <span className="h3">&nbsp;MD. Arafat Hossain</span>
                        </Col>
                        <Col xs={12} sm={12} md={6} className="d-flex flex-row">
                            <span className="mb-2 h3">Designation : </span>
                            <span className="h3">&nbsp;Sr. Software Engineer </span>
                        </Col>
                    </Row>
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <h2 className="mb-4 h3">OBJECTIVES SET FOR YEAR 2022</h2>
                        <h4>Please write SMART Objective statements :</h4>
                        <p>
                            Please write SMART Objective statements :
                            Streching, Measurable, Agreed, Realistic, Time-Bound
                            Mark PRIMARY objectives, to which a higher weighting will be given,with a * % .
                        </p>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <h2 className="mb-4 h3">REVIEW OF RESULTS ACHIEVED</h2>
                        <h4>Ratings:</h4>
                        <ul className="list-group-numbered p-0">
                            <li>Exceeded</li>
                            <li>Achieved all aspects</li>
                            <li>Achieved the essnential requirements</li>
                            <li>Did not achieve</li>
                        </ul>
                    </Col>
                </Row>
                <hr className="mb-4"/>

                <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="production-cost-revenue">1. PRODUCTION (Product/ Project) (Cost,
                                revenue, quality, quantity)</Form.Label>
                            <Form.Control as={"textarea"}
                                          placeholder="PRODUCTION (Product/ Project) (Cost, revenue, quality, quantity)"
                                          id="production-cost-revenue" rows={6}/>
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Form.Label htmlFor="weightage-value">Weightage</Form.Label>
                            <Form.Control type={"text"} placeholder="Weightage" id="weightage-value"/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="rating">Rating</Form.Label>
                            <Form.Select>
                                <option value=""></option>
                                <option value="" selected>---------</option>

                                <option value=""></option>
                                <option value="1">Exceeded</option>

                                <option value=""></option>
                                <option value="2">Achieved all aspects</option>

                                <option value=""></option>
                                <option value="3">Achieved the essential requirements</option>

                                <option value=""></option>
                                <option value="4">Did not achieve</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <hr className="mb-4"/>

                <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="support">2. SUPPORT (Service, problem resolution, customer perception,
                                business risk & reputation ):</Form.Label>
                            <Form.Control as={"textarea"}
                                          placeholder="SUPPORT (Service, problem resolution, customer perception, business risk & reputation )"
                                          id="support" rows={6}/>
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Form.Label htmlFor="weightage-value">Weightage</Form.Label>
                            <Form.Control type={"text"} placeholder="Weightage" id="weightage-value"/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="rating">Rating</Form.Label>
                            <Form.Select>
                                <option value=""></option>
                                <option value="" selected>---------</option>

                                <option value=""></option>
                                <option value="1">Exceeded</option>

                                <option value=""></option>
                                <option value="2">Achieved all aspects</option>

                                <option value=""></option>
                                <option value="3">Achieved the essential requirements</option>

                                <option value=""></option>
                                <option value="4">Did not achieve</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <hr className="mb-4"/>

                <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="innovation">3. INNOVATION (New ideas and implementation):</Form.Label>
                            <Form.Control as={"textarea"}
                                          placeholder="INNOVATION (New ideas and implementation)"
                                          id="innovation" rows={6}/>
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Form.Label htmlFor="weightage-value">Weightage</Form.Label>
                            <Form.Control type={"text"} placeholder="Weightage" id="weightage-value"/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="rating">Rating</Form.Label>
                            <Form.Select>
                                <option value=""></option>
                                <option value="" selected>---------</option>

                                <option value=""></option>
                                <option value="1">Exceeded</option>

                                <option value=""></option>
                                <option value="2">Achieved all aspects</option>

                                <option value=""></option>
                                <option value="3">Achieved the essential requirements</option>

                                <option value=""></option>
                                <option value="4">Did not achieve</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <hr className="mb-4"/>

                <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="people-leadership">4. PEOPLE (Leadership, management,
                                training):</Form.Label>
                            <Form.Control as={"textarea"}
                                          placeholder="PEOPLE (Leadership, management, training)"
                                          id="people-leadership" rows={6}/>
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Form.Label htmlFor="weightage-value">Weightage</Form.Label>
                            <Form.Control type={"text"} placeholder="Weightage" id="weightage-value"/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="rating">Rating</Form.Label>
                            <Form.Select>
                                <option value=""></option>
                                <option value="" selected>---------</option>

                                <option value=""></option>
                                <option value="1">Exceeded</option>

                                <option value=""></option>
                                <option value="2">Achieved all aspects</option>

                                <option value=""></option>
                                <option value="3">Achieved the essential requirements</option>

                                <option value=""></option>
                                <option value="4">Did not achieve</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <hr className="mb-4"/>

                <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="people-leadership">5. OTHER (Learning & development):</Form.Label>
                            <Form.Control as={"textarea"}
                                          placeholder="OTHER (Learning & development)"
                                          id="people-leadership" rows={6}/>
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Form.Label htmlFor="weightage-value">Weightage</Form.Label>
                            <Form.Control type={"text"} placeholder="Weightage" id="weightage-value"/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="rating">Rating</Form.Label>
                            <Form.Select>
                                <option value=""></option>
                                <option value="" selected>---------</option>

                                <option value=""></option>
                                <option value="1">Exceeded</option>

                                <option value=""></option>
                                <option value="2">Achieved all aspects</option>

                                <option value=""></option>
                                <option value="3">Achieved the essential requirements</option>

                                <option value=""></option>
                                <option value="4">Did not achieve</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <hr className="mb-4"/>


                {/* value rating   */}
                <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <h2 className="mb-4 h3">VALUE RATINGS</h2>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <h2 className="mb-4 h3">REVIEW OF RESULTS ACHIEVED</h2>
                        <h4>Ratings:</h4>
                        <ol style={{listStyleType: 'upper-alpha', paddingLeft: '16px'}}>
                            <li>Role Model</li>
                            <li>Very Good</li>
                            <li>Good</li>
                            <li>Improvement Required</li>
                            <li>Unacceptable</li>
                        </ol>
                    </Col>
                </Row>
                <hr className="mb-4"/>

                <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="COURAGEOUS">1. COURAGEOUS (Moral Strength: faith and belief in oneself,
                                self confidence):</Form.Label>
                            <Form.Control as={"textarea"}
                                          placeholder="COURAGEOUS (Moral Strength: faith and belief in oneself, self confidence)"
                                          id="COURAGEOUS" rows={6}/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="rating">Rating</Form.Label>
                            <Form.Select>
                                <option></option>
                                <option value="" selected>---------</option>

                                <option></option>
                                <option value="1">Role Model</option>

                                <option></option>
                                <option value="2">Very Good</option>

                                <option></option>
                                <option value="3">Good</option>

                                <option></option>
                                <option value="4">Improvement Required</option>

                                <option></option>
                                <option value="5">Unacceptable</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <hr className="mb-4"/>

                <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="TEAMWORK">2. TEAMWORK (Team player, not exclusive: Enjoy sharing and
                                collaborating with relevent parties):
                            </Form.Label>
                            <Form.Control as={"textarea"}
                                          placeholder="TEAMWORK (Team player, not exclusive: Enjoy sharing and collaborating with relevent parties):"
                                          id="TEAMWORK" rows={6}/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="rating">Rating</Form.Label>
                            <Form.Select>
                                <option></option>
                                <option value="" selected>---------</option>

                                <option></option>
                                <option value="1">Role Model</option>

                                <option></option>
                                <option value="2">Very Good</option>

                                <option></option>
                                <option value="3">Good</option>

                                <option></option>
                                <option value="4">Improvement Required</option>

                                <option></option>
                                <option value="5">Unacceptable</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <hr className="mb-4"/>

                <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="RESPONSIVE">3. RESPONSIVE (Attentive, Interactive : consider everyone
                                inside & outside as customer ; stakeholder) :
                            </Form.Label>
                            <Form.Control as={"textarea"}
                                          placeholder="RESPONSIVE (Attentive, Interactive : consider everyone inside & outside as customer ; stakeholder)"
                                          id="RESPONSIVE" rows={6}/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="rating">Rating</Form.Label>
                            <Form.Select>
                                <option></option>
                                <option value="" selected>---------</option>

                                <option></option>
                                <option value="1">Role Model</option>

                                <option></option>
                                <option value="2">Very Good</option>

                                <option></option>
                                <option value="3">Good</option>

                                <option></option>
                                <option value="4">Improvement Required</option>

                                <option></option>
                                <option value="5">Unacceptable</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <hr className="mb-4"/>


                <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Row>
                            <Col xs={12} sm={12} md={7}>
                                <Form.Label htmlFor="CREATIVE">4. CREATIVE (Business minds: Translates imagination into
                                    business):
                                </Form.Label>
                            </Col>
                            <Col xs={12} sm={12} md={5}>
                                <Form.Label htmlFor="rating1">Rating
                                </Form.Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={7}>
                                <Form.Group>
                                    <Form.Control as={"textarea"}
                                                  placeholder="CREATIVE (Business minds: Translates imagination into business)"
                                                  id="CREATIVE" rows={6}/>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} md={5}>
                                <Form.Group>
                                    <Form.Select>
                                        <option></option>
                                        <option value="" selected>---------</option>

                                        <option></option>
                                        <option value="1">Role Model</option>

                                        <option></option>
                                        <option value="2">Very Good</option>

                                        <option></option>
                                        <option value="3">Good</option>

                                        <option></option>
                                        <option value="4">Improvement Required</option>

                                        <option></option>
                                        <option value="5">Unacceptable</option>

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <h3 className="mt-4">SIGNATURE TO OBJECTIVES:</h3>
                        <Row className="mt-6">
                            <Col xs={12} sm={12} md={6} className="d-flex justify-content-center flex-column">
                                <hr style={{color:'#000000'}}/>
                                <span className="text-center mt-2">Individual Manager Function or SBU Head</span>
                            </Col>
                            <Col xs={12} sm={12} md={6} className="d-flex justify-content-center flex-column align-items-center">
                                <hr style={{color:'#000000',width:'75%'}}/>
                                <span className="text-center mt-2">Manager</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Row>
                            <Col xs={12} sm={12} md={7}>
                                <Form.Label htmlFor="TRUSTWORTHY">5. TRUSTWORTHY (Deserving of trust , confidence , reliable, dependable):
                                </Form.Label>
                            </Col>
                            <Col xs={12} sm={12} md={5}>
                                <Form.Label htmlFor="rating1">Rating
                                </Form.Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={7}>
                                <Form.Group>
                                    <Form.Control as={"textarea"}
                                                  placeholder="TRUSTWORTHY (Deserving of trust , confidence , reliable, dependable)"
                                                  id="TRUSTWORTHY" rows={6}/>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} md={5}>
                                <Form.Group>
                                    <Form.Select>
                                        <option></option>
                                        <option value="" selected>---------</option>

                                        <option></option>
                                        <option value="1">Role Model</option>

                                        <option></option>
                                        <option value="2">Very Good</option>

                                        <option></option>
                                        <option value="3">Good</option>

                                        <option></option>
                                        <option value="4">Improvement Required</option>

                                        <option></option>
                                        <option value="5">Unacceptable</option>

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="mt-6">
                    <Col xs={12} sm={12} md={3} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="SUBSTANTIAL">OTHER SUBSTANTIAL ACHIEVEMENTS :

                            </Form.Label>
                            <Form.Control as={"textarea"}
                                          placeholder="OTHER SUBSTANTIAL ACHIEVEMENTS"
                                          id="SUBSTANTIAL" rows={6}/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={3} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="ISSUES">SIGNIFICANT ISSUES :
                            </Form.Label>
                            <Form.Control as={"textarea"}
                                          placeholder="SIGNIFICANT ISSUES"
                                          id="ISSUES" rows={6}/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={3} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="INDIVIDUAL">INDIVIDUAL'S COMMENTS :
                            </Form.Label>
                            <Form.Control as={"textarea"}
                                          placeholder="INDIVIDUAL'S COMMENTS"
                                          id="INDIVIDUAL" rows={6}/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={3} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="MANAGERS">MANAGERS COMMENTS :
                            </Form.Label>
                            <Form.Control as={"textarea"}
                                          placeholder="MANAGERS COMMENTS"
                                          id="MANAGERS" rows={6}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="FUNCTIONAL">SENIOR MANAGER / FUNCTIONAL HEAD'S COMMENTS :

                            </Form.Label>
                            <Form.Control as={"textarea"}
                                          placeholder="SENIOR MANAGER / FUNCTIONAL HEAD'S COMMENTS"
                                          id="FUNCTIONAL" rows={6}/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="DIRECTOR">DIRECTOR AND CHIEF OPERATING OFFICER'S COMMENTS :
                            </Form.Label>
                            <Form.Control as={"textarea"}
                                          placeholder="DIRECTOR AND CHIEF OPERATING OFFICER'S COMMENTS :"
                                          id="DIRECTOR" rows={6}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs={12} sm={12} md={12} className="d-flex flex-column">
                        <Form.Group>
                            <Form.Label htmlFor="OVERALL">OVERALL PERFORMANCE BASED ON ALL OF THE ABOVE RATING :

                            </Form.Label>
                            <Form.Control as={"textarea"}
                                          placeholder="OVERALL PERFORMANCE BASED ON ALL OF THE ABOVE RATING"
                                          id="OVERALL" rows={6}/>
                        </Form.Group>
                    </Col>
                </Row>

                <h3 className="mt-4">SIGNATURES TO ASSESSMENT :</h3>
                <Row className="mt-6 justify-content-around">
                    <Col xs={12} sm={12} md={3} className="d-flex justify-content-center flex-column">
                        <hr style={{color:'#000000'}}/>
                        <span className="text-center mt-2">Individual Manager Function or SBU Head</span>
                    </Col>
                    <Col xs={12} sm={12} md={2} className="d-flex justify-content-center flex-column align-items-center">
                        <hr style={{color:'#000000',width:'100%'}}/>
                        <span className="text-center mt-2">Manager</span>
                    </Col>
                    <Col xs={12} sm={12} md={3} className="d-flex justify-content-center flex-column align-items-center">
                        <hr style={{color:'#000000',width:'100%'}}/>
                        <span className="text-center mt-2">Senior</span>
                    </Col>
                </Row>
                <hr className="mb-4"/>


            </Card.Body>
        </Card>
    );
}

export default KpiPerformanceForm;