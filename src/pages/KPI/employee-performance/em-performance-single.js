import React, { useEffect } from "react";
import Layout from "../../../layout/Layout";
import { Accordion, Button, Card, Col, Form, Row } from "react-bootstrap";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { API } from "../../../utils/axios/axiosConfig";
import { EMPLOYEE_PERFORMANCE_EACH_GET, EMPLOYEE_PERFORMANCE_EACH_PUT } from "../../../utils/API_ROUTES";
import Loader from "../../../components/loader/Loader";
import { EMPLOYEE_PERFORMANCE_PAGE } from "../../../utils/APP_ROUTES";
import { useNavigate, useParams } from "react-router-dom";
import { error_alert, success_alert } from "../../../components/alert/Alert";

export default function EmPerformanceSingle() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  // Submit Func
  const submitKpiPerformanceForm = (data, event) => {
    setLoading(true);
    const type = event.target.attributes["name"].value;
    if (type === "draft") {
      data["draft_save"] = true;
    } else {
      data["submit"] = true;
    }
    API.put(EMPLOYEE_PERFORMANCE_EACH_PUT(id), { ...data, submit: "" })
      .then((res) => {
        if (res.data.statuscode === 200) {
          console.log(res.data);
          setLoading(false);
          navigate(EMPLOYEE_PERFORMANCE_PAGE);
          success_alert(res.data.message);
          // setErrMsg("");
        } else {
          error_alert(res.data.message);
          // setErrMsg(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        error_alert(err.response.data);
        // setErrMsg(err.response.data.non_field_errors[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetching individual user
  useEffect(() => {
    setLoading(true);
    API.get(EMPLOYEE_PERFORMANCE_EACH_GET(id))
      .then((res) => {
        if (res.data.statuscode === 200) {
          setData(res.data.data);
          reset(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      {loading && <Loader />}
      <PageHeader subTitle={""} title={"KPI Performance Form"} onBack />
      <Container fluid>
        <Form onSubmit={(e) => e.preventDefault()}>
          {/* EMPLOYYE INFO */}
          <Card>
            <Card.Header>
              <Card.Title className="card-header-title mt-4 mb-4">
                <Row>
                  <Col xs={12} sm={12} md={6}>
                    <h4 className="mb-1 text-secondary">Name</h4>
                    <h2 className="mb-0">{data?.employee?.name}</h2>
                  </Col>
                  <Col xs={12} sm={12} md={6}>
                    <h4 className="mb-1 text-secondary">Designation: </h4>
                    <h2 className="mb-0">{data?.employee?.designation}</h2>
                  </Col>
                </Row>
              </Card.Title>
            </Card.Header>
          </Card>

          {/* Objective INFO */}
          <Accordion className="mb-4">
            <Accordion.Item className="bg-white">
              <Accordion.Header>
                <h3 className="mb-0">Objective</h3>
              </Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <h4 className="mb-3">OBJECTIVES SET FOR YEAR 2022</h4>
                    <h4 className="mb-1">Please write SMART Objective statements :</h4>
                    <p>
                      Please write SMART Objective statements : Streching, Measurable, Agreed, Realistic, Time-Bound Mark
                      PRIMARY objectives, to which a higher weighting will be given,with a * % .
                    </p>
                  </Col>
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <h4 className="mb-3">REVIEW OF RESULTS ACHIEVED</h4>
                    <h4>Ratings:</h4>
                    <ul className="list-group-numbered p-0 mb-1">
                      <li>Exceeded</li>
                      <li>Achieved all aspects</li>
                      <li>Achieved the essnential requirements</li>
                      <li>Did not achieve</li>
                    </ul>
                  </Col>
                </Row>
                <hr className="mb-4" />

                <Row className="mb-4">
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Form.Group>
                      <Form.Label htmlFor="production-cost-revenue">
                        <h4 className="mb-0">PRODUCTION (Product/Project) (Cost, revenue, quality, quantity)</h4>
                      </Form.Label>
                      <Form.Control
                        as={"textarea"}
                        {...register("production", { required: true })}
                        placeholder="PRODUCTION (Product/ Project) (Cost, revenue, quality, quantity)"
                        id="production-cost-revenue"
                        rows={6}
                        className={errors.production ? "is-invalid" : ""}
                      />
                      {errors.production && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                    <Form.Group className="mt-4">
                      <Form.Label htmlFor="weightage-value">Weightage</Form.Label>
                      <Form.Control
                        type={"text"}
                        {...register("production_weightage", { required: true })}
                        placeholder="Weightage"
                        id="weightage-value"
                        className={errors.production_weightage ? "is-invalid" : ""}
                      />
                      {errors.production_weightage && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Form.Group>
                      <Form.Label htmlFor="rating">Rating</Form.Label>
                      <Form.Select
                        {...register("production_rating", { required: true })}
                        className={errors.production_rating ? "is-invalid" : ""}
                      >
                        <option>------</option>
                        <option value="1">Exceeded</option>
                        <option value="2">Achieved all aspects</option>
                        <option value="3">Achieved the essential requirements</option>
                        <option value="4">Did not achieve</option>
                      </Form.Select>
                      {errors.production_rating && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                  </Col>
                </Row>
                <hr className="mb-4" />

                <Row className="mb-4">
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Form.Group>
                      <Form.Label htmlFor="support">
                        <h4 className="mb-0">
                          SUPPORT (Service, problem resolution, customer perception, business risk & reputation ):
                        </h4>
                      </Form.Label>
                      <Form.Control
                        as={"textarea"}
                        {...register("support", { required: true })}
                        placeholder="SUPPORT (Service, problem resolution, customer perception, business risk & reputation )"
                        id="support"
                        rows={6}
                        className={errors.support ? "is-invalid" : ""}
                      />
                      {errors.support && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                    <Form.Group className="mt-4">
                      <Form.Label htmlFor="weightage-value">Weightage</Form.Label>
                      <Form.Control
                        type={"text"}
                        {...register("support_weightage", { required: true })}
                        className={errors.support_weightage ? "is-invalid" : ""}
                        placeholder="Weightage"
                        id="weightage-value"
                      />
                      {errors.support_weightage && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Form.Group>
                      <Form.Label htmlFor="rating">Rating</Form.Label>
                      <Form.Select
                        {...register("support_rating", { required: true })}
                        className={errors.support_rating ? "is-invalid" : ""}
                      >
                        <option>--------</option>
                        <option value="1">Exceeded</option>
                        <option value="2">Achieved all aspects</option>
                        <option value="3">Achieved the essential requirements</option>
                        <option value="4">Did not achieve</option>
                      </Form.Select>
                      {errors.support_rating && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                  </Col>
                </Row>
                <hr className="mb-4" />

                <Row className="mb-4">
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Form.Group>
                      <Form.Label htmlFor="innovation">
                        <h4 className="mb-0">INNOVATION (New ideas and implementation):</h4>
                      </Form.Label>
                      <Form.Control
                        as={"textarea"}
                        {...register("innovation", { required: true })}
                        placeholder="INNOVATION (New ideas and implementation)"
                        id="innovation"
                        rows={6}
                        className={errors.innovation ? "is-invalid" : ""}
                      />
                      {errors.innovation && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                    <Form.Group className="mt-4">
                      <Form.Label htmlFor="weightage-value">Weightage</Form.Label>
                      <Form.Control
                        type={"text"}
                        {...register("innovation_weightage", { required: true })}
                        className={errors.innovation_weightage ? "is-invalid" : ""}
                        placeholder="Weightage"
                        id="weightage-value"
                      />
                      {errors.innovation_weightage && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Form.Group>
                      <Form.Label htmlFor="rating">Rating</Form.Label>
                      <Form.Select
                        {...register("innovation_rating", { required: true })}
                        className={errors.innovation_rating ? "is-invalid" : ""}
                      >
                        <option>---------</option>
                        <option value="1">Exceeded</option>
                        <option value="2">Achieved all aspects</option>
                        <option value="3">Achieved the essential requirements</option>
                        <option value="4">Did not achieve</option>
                      </Form.Select>
                      {errors.innovation_rating && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                  </Col>
                </Row>
                <hr className="mb-4" />

                <Row className="mb-4">
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Form.Group>
                      <Form.Label htmlFor="people-leadership">
                        <h4 className="mb-0">PEOPLE (Leadership, management, training):</h4>
                      </Form.Label>
                      <Form.Control
                        as={"textarea"}
                        {...register("people", { required: true })}
                        placeholder="PEOPLE (Leadership, management, training)"
                        id="people-leadership"
                        rows={6}
                        className={errors.people ? "is-invalid" : ""}
                      />
                      {errors.people && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                    <Form.Group className="mt-4">
                      <Form.Label htmlFor="weightage-value">Weightage</Form.Label>
                      <Form.Control
                        type={"text"}
                        className={errors.people_weightage ? "is-invalid" : ""}
                        {...register("people_weightage", { required: true })}
                        placeholder="Weightage"
                        id="weightage-value"
                      />
                      {errors.people_weightage && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Form.Group>
                      <Form.Label htmlFor="rating">Rating</Form.Label>
                      <Form.Select
                        className={errors.people_rating ? "is-invalid" : ""}
                        {...register("people_rating", { required: true })}
                      >
                        <option>---------</option>
                        <option value="1">Exceeded</option>
                        <option value="2">Achieved all aspects</option>
                        <option value="3">Achieved the essential requirements</option>
                        <option value="4">Did not achieve</option>
                      </Form.Select>
                      {errors.people_rating && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                  </Col>
                </Row>
                <hr className="mb-4" />

                <Row className="mb-4">
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Form.Group>
                      <Form.Label htmlFor="people-leadership">
                        <h4 className="mb-0">OTHER (Learning & development):</h4>
                      </Form.Label>
                      <Form.Control
                        as={"textarea"}
                        {...register("other", { required: true })}
                        placeholder="OTHER (Learning & development)"
                        id="people-leadership"
                        rows={6}
                        className={errors.other ? "is-invalid" : ""}
                      />
                      {errors.other && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                    <Form.Group className="mt-4">
                      <Form.Label htmlFor="weightage-value">Weightage</Form.Label>
                      <Form.Control
                        type={"text"}
                        {...register("other_weightage", { required: true })}
                        className={errors.other_weightage ? "is-invalid" : ""}
                        placeholder="Weightage"
                        id="weightage-value"
                      />
                      {errors.other_weightage && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Form.Group>
                      <Form.Label htmlFor="rating">Rating</Form.Label>
                      <Form.Select
                        {...register("other_rating", { required: true })}
                        className={errors.other_rating ? "is-invalid" : ""}
                      >
                        <option>---------</option>
                        <option value="1">Exceeded</option>
                        <option value="2">Achieved all aspects</option>
                        <option value="3">Achieved the essential requirements</option>
                        <option value="4">Did not achieve</option>
                      </Form.Select>
                      {errors.other_rating && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Values INFO */}
          <Accordion className="mb-4">
            <Accordion.Item className="bg-white" eventKey="0">
              <Accordion.Header>
                <h3 className="mb-0">Values</h3>
              </Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <h4 className="mb-2">REVIEW OF RESULTS ACHIEVED</h4>
                    <h4 className="mb-1">Ratings:</h4>
                    <ol style={{ listStyleType: "upper-alpha", paddingLeft: "16px", fontSize: "14px" }}>
                      <li>Role Model</li>
                      <li>Very Good</li>
                      <li>Good</li>
                      <li>Improvement Required</li>
                      <li>Unacceptable</li>
                    </ol>
                  </Col>
                </Row>
                <hr className="mb-4" />

                <Row className="mb-4">
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Form.Group>
                      <Form.Label htmlFor="COURAGEOUS">
                        <h4 className="mb-0">COURAGEOUS</h4>
                        <h5 className="mb-0 text-secondary">
                          Moral Strength: faith and belief in oneself, self confidence:
                        </h5>
                      </Form.Label>
                      <Form.Control
                        as={"textarea"}
                        className={errors.courageous ? "is-invalid" : ""}
                        {...register("courageous", { required: true })}
                        placeholder="COURAGEOUS (Moral Strength: faith and belief in oneself, self confidence)"
                        id="COURAGEOUS"
                        rows={6}
                      />
                      {errors.courageous && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Form.Group>
                      <Form.Label htmlFor="rating" className="mb-3">
                        Rating
                      </Form.Label>
                      <Form.Select
                        {...register("courageous_rating", { required: true })}
                        className={errors.courageous_rating ? "is-invalid" : ""}
                      >
                        <option>---------</option>
                        <option value="1">Exceeded</option>
                        <option value="2">Achieved all aspects</option>
                        <option value="3">Achieved the essential requirements</option>
                        <option value="4">Did not achieve</option>
                        <option value="5">Unacceptable</option>
                      </Form.Select>
                      {errors.courageous_rating && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                  </Col>
                </Row>
                <hr className="mb-4" />

                <Row className="mb-4">
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Form.Group>
                      <Form.Label htmlFor="TEAMWORK">
                        <h4 className="mb-0">TEAMWORK</h4>
                        <h5 className="mb-0 text-secondary">
                          Team player, not exclusive: Enjoy sharing and collaborating with relevent parties
                        </h5>
                      </Form.Label>
                      <Form.Control
                        as={"textarea"}
                        {...register("teamwork", { required: true })}
                        placeholder="TEAMWORK (Team player, not exclusive: Enjoy sharing and collaborating with relevent parties):"
                        id="TEAMWORK"
                        rows={6}
                        className={errors.teamwork ? "is-invalid" : ""}
                      />
                      {errors.teamwork && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Form.Group>
                      <Form.Label className="mb-3" htmlFor="rating">
                        Rating
                      </Form.Label>
                      <Form.Select
                        {...register("teamwork_rating", { required: true })}
                        className={errors.teamwork_rating ? "is-invalid" : ""}
                      >
                        <option>---------</option>
                        <option value="1">Exceeded</option>
                        <option value="2">Achieved all aspects</option>
                        <option value="3">Achieved the essential requirements</option>
                        <option value="4">Did not achieve</option>
                        <option value="5">Unacceptable</option>
                      </Form.Select>
                      {errors.teamwork_rating && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                  </Col>
                </Row>
                <hr className="mb-4" />

                <Row className="mb-4">
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Form.Group>
                      <Form.Label htmlFor="RESPONSIVE">
                        <h4 className="mb-0">RESPONSIVE </h4>
                        <h5 className="mb-0 text-secondary">
                          Attentive, Interactive : consider everyone inside & outside as customer ; stakeholder
                        </h5>
                      </Form.Label>
                      <Form.Control
                        as={"textarea"}
                        {...register("responsive", { required: true })}
                        placeholder="RESPONSIVE (Attentive, Interactive : consider everyone inside & outside as customer ; stakeholder)"
                        id="RESPONSIVE"
                        rows={6}
                        className={errors.responsive ? "is-invalid" : ""}
                      />
                      {errors.responsive && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Form.Group>
                      <Form.Label className="mb-4" htmlFor="rating">
                        Rating
                      </Form.Label>
                      <Form.Select
                        {...register("responsive_rating", { required: true })}
                        className={errors.responsive_rating ? "is-invalid" : ""}
                      >
                        <option>---------</option>
                        <option value="1">Exceeded</option>
                        <option value="2">Achieved all aspects</option>
                        <option value="3">Achieved the essential requirements</option>
                        <option value="4">Did not achieve</option>
                        <option value="5">Unacceptable</option>
                      </Form.Select>
                      {errors.responsive_rating && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                  </Col>
                </Row>
                <hr className="mb-4" />

                <Row className="mb-4">
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Row>
                      <Col xs={12} sm={12} md={7}>
                        <Form.Label htmlFor="CREATIVE">
                          <h4 className="mb-0">CREATIVE</h4>
                          <h5 className="mb-0 text-secondary">Business minds: Translates imagination into business:</h5>
                        </Form.Label>
                      </Col>
                      <Col xs={12} sm={12} md={5}>
                        <Form.Label htmlFor="rating1">Rating</Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={7}>
                        <Form.Group>
                          <Form.Control
                            as={"textarea"}
                            {...register("creative", { required: true })}
                            placeholder="CREATIVE (Business minds: Translates imagination into business)"
                            id="CREATIVE"
                            rows={6}
                            className={errors.creative ? "is-invalid" : ""}
                          />
                          {errors.creative && <div className="invalid-feedback">This field is required</div>}
                        </Form.Group>
                      </Col>
                      <Col xs={12} sm={12} md={5}>
                        <Form.Group>
                          <Form.Select
                            {...register("creative_rating", { required: true })}
                            className={errors.creative_rating ? "is-invalid" : ""}
                          >
                            <option>---------</option>
                            <option value="1">Exceeded</option>
                            <option value="2">Achieved all aspects</option>
                            <option value="3">Achieved the essential requirements</option>
                            <option value="4">Did not achieve</option>
                            <option value="5">Unacceptable</option>
                          </Form.Select>
                          {errors.creative_rating && <div className="invalid-feedback">This field is required</div>}
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                    <Row>
                      <Col xs={12} sm={12} md={7}>
                        <Form.Label htmlFor="TRUSTWORTHY">
                          <h4 className="mb-0">TRUSTWORTHY</h4>
                          <h5 className="mb-0 text-secondary">Deserving of trust , confidence , reliable, dependable:</h5>
                        </Form.Label>
                      </Col>
                      <Col xs={12} sm={12} md={5}>
                        <Form.Label htmlFor="rating1">Rating</Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={7}>
                        <Form.Group>
                          <Form.Control
                            as={"textarea"}
                            {...register("trustworthy", { required: true })}
                            placeholder="TRUSTWORTHY (Deserving of trust , confidence , reliable, dependable)"
                            id="TRUSTWORTHY"
                            rows={6}
                            className={errors.trustworthy ? "is-invalid" : ""}
                          />
                          {errors.trustworthy && <div className="invalid-feedback">This field is required</div>}
                        </Form.Group>
                      </Col>
                      <Col xs={12} sm={12} md={5}>
                        <Form.Group>
                          <Form.Select
                            {...register("trustworthy_rating", { required: true })}
                            className={errors.trustworthy_rating ? "is-invalid" : ""}
                          >
                            <option>---------</option>
                            <option value="1">Exceeded</option>
                            <option value="2">Achieved all aspects</option>
                            <option value="3">Achieved the essential requirements</option>
                            <option value="4">Did not achieve</option>
                            <option value="5">Unacceptable</option>
                          </Form.Select>
                          {errors.trustworthy_rating && <div className="invalid-feedback">This field is required</div>}
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <h4 className="mb-5">SIGNATURE TO OBJECTIVES:</h4>
                  <Col xs={12} sm={12} md={6} className="d-flex justify-content-center flex-column">
                    <hr style={{ color: "#000000" }} />
                    <span className="text-center mt-0">Individual Manager Function or SBU Head</span>
                  </Col>
                  <Col xs={12} sm={12} md={6} className="d-flex justify-content-center flex-column align-items-center">
                    <hr style={{ color: "#000000", width: "75%" }} />
                    <span className="text-center mt-0">Manager</span>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Achivements */}
          <Accordion className="mb-4">
            <Accordion.Item className="bg-white" eventKey="0">
              <Accordion.Header>
                <h3 className="mb-0">Achievements</h3>
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column mb-4">
                    <Form.Group>
                      <Form.Label htmlFor="SUBSTANTIAL">
                        <h4 className="mb-0">OTHER SUBSTANTIAL ACHIEVEMENTS:</h4>
                      </Form.Label>
                      <Form.Control
                        as={"textarea"}
                        {...register("other_sustainable_achievement")}
                        placeholder="OTHER SUBSTANTIAL ACHIEVEMENTS"
                        id="SUBSTANTIAL"
                        rows={6}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column mb-4">
                    <Form.Group>
                      <Form.Label htmlFor="ISSUES">SIGNIFICANT ISSUES :</Form.Label>
                      <Form.Control
                        as={"textarea"}
                        {...register("significant_issue")}
                        placeholder="SIGNIFICANT ISSUES"
                        id="ISSUES"
                        rows={6}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column mb-4">
                    <Form.Group>
                      <Form.Label htmlFor="INDIVIDUAL">INDIVIDUAL'S COMMENTS :</Form.Label>
                      <Form.Control
                        as={"textarea"}
                        {...register("individual_comment")}
                        placeholder="INDIVIDUAL'S COMMENTS"
                        id="INDIVIDUAL"
                        rows={6}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column mb-4">
                    <Form.Group>
                      <Form.Label htmlFor="MANAGERS">MANAGERS COMMENTS :</Form.Label>
                      <Form.Control
                        as={"textarea"}
                        {...register("manager_comment")}
                        placeholder="MANAGERS COMMENTS"
                        id="MANAGERS"
                        rows={6}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column mb-4">
                    <Form.Group>
                      <Form.Label htmlFor="FUNCTIONAL">SENIOR MANAGER / FUNCTIONAL HEAD'S COMMENTS :</Form.Label>
                      <Form.Control
                        as={"textarea"}
                        {...register("senior_manager_functional_head_comment")}
                        placeholder="SENIOR MANAGER / FUNCTIONAL HEAD'S COMMENTS"
                        id="FUNCTIONAL"
                        rows={6}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={6} className="d-flex flex-column mb-4">
                    <Form.Group>
                      <Form.Label htmlFor="DIRECTOR">DIRECTOR AND CHIEF OPERATING OFFICER'S COMMENTS :</Form.Label>
                      <Form.Control
                        as={"textarea"}
                        {...register("director_chief_operating_officer_comment")}
                        placeholder="DIRECTOR AND CHIEF OPERATING OFFICER'S COMMENTS :"
                        id="DIRECTOR"
                        rows={6}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} className="d-flex flex-column mb-4">
                    <Form.Group>
                      <Form.Label htmlFor="OVERALL">OVERALL PERFORMANCE BASED ON ALL OF THE ABOVE RATING :</Form.Label>
                      <Form.Control
                        as={"textarea"}
                        {...register("overall_performance")}
                        placeholder="OVERALL PERFORMANCE BASED ON ALL OF THE ABOVE RATING"
                        id="OVERALL"
                        rows={6}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h3 className="mt-4">SIGNATURES TO ASSESSMENT :</h3>
                <Row className="mt-6 justify-content-around">
                  <Col xs={12} sm={12} md={3} className="d-flex justify-content-center flex-column">
                    <hr style={{ color: "#000000" }} />
                    <span className="text-center mt-2">Individual Manager Function or SBU Head</span>
                  </Col>
                  <Col xs={12} sm={12} md={2} className="d-flex justify-content-center flex-column align-items-center">
                    <hr style={{ color: "#000000", width: "100%" }} />
                    <span className="text-center mt-2">Manager</span>
                  </Col>
                  <Col xs={12} sm={12} md={3} className="d-flex justify-content-center flex-column align-items-center">
                    <hr style={{ color: "#000000", width: "100%" }} />
                    <span className="text-center mt-2">Senior</span>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="text-end">
            {/* <div style={{ marginRight: "10px" }}>
                <Button onClick={handleSubmit(submitKpiPerformanceForm)} type="submit" name="draft" variant="primary">
                  Save as draft
                </Button>
              </div> */}
            <Button onClick={handleSubmit(submitKpiPerformanceForm)} type="submit" name="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </Layout>
  );
}

// export default function EmPerformanceSingle()