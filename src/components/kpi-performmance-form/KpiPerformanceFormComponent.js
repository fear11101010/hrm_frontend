import { Accordion, Button, Card, Col, Form, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { API } from "../../utils/axios/axiosConfig";
import { KPI_PERFORMANCE_FORM_DRAFT, KPI_PERFORMANCE_FORM_SUBMIT } from "../../utils/API_ROUTES";
import { toast } from "react-toastify";
import { EMPLOYEE_PERFORMANCE_INDEX_PAGE } from "../../utils/APP_ROUTES";
import { useForm } from "react-hook-form";
import useHrRating from "../../hooks/kpi/hr_rating";
import useKpiValue from "../../hooks/kpi/kpi_value";

function KpiPerformanceFormComponent({ data, updateData, beforeSubmit, afterSubmit, id }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...(data ?? {}),
    },
  });
  const ratingList = useHrRating();
  const valueList = useKpiValue();
  const submitKpiPerformanceForm = (data, event) => {
    if (beforeSubmit) {
      beforeSubmit();
    }
    console.log(data);
    const type = event.target.attributes["name"].value;
    console.log(type);
    if (type === "draft") {
      data["draft_save"] = true;
    } else {
      data["submit"] = true;
    }
    (type === "draft" ? API.post(KPI_PERFORMANCE_FORM_DRAFT, data) : API.put(KPI_PERFORMANCE_FORM_SUBMIT(id), data))
      .then((res) => {
        if (res.data.statuscode === 200) {
          console.log(res.data);
          if (afterSubmit) {
            afterSubmit({
              status: "success",
              message:
                type === "draft"
                  ? "KPI Performance Form Saved successfully as draft"
                  : "KPI Performance Form Submitted successfully",
            });
          }
        } else {
          afterSubmit({ status: "error", message: res.data.message });
        }
      })
      .catch((err) => {
        console.log(err);
        afterSubmit({ status: "error", message: err.response?.data?.non_field_errors[0] });
      })
      .finally(() => {
        afterSubmit({ status: "complete" });
      });
  };
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Card>
        <Card.Body>
          <Row>
            <Col xs={12} sm={12} md={6}>
              <h5 className="header-pretitle mb-1">Name : </h5>
              <h2 className="header-title mb-0">{data?.employee?.name}</h2>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <h5 className="header-pretitle mb-0">Designation : </h5>
              <h2 className="header-title mb-0">{data?.employee?.designation} </h2>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* OBJECTIVES  */}
      <Card>
        <Card.Body>
          <Row className="mb-4">
            <Col xs={12} sm={12} md={6} className="d-flex flex-column">
              <h2 className="mb-4 h3">OBJECTIVES SET FOR YEAR {data?.year}</h2>
              <h4>Please write SMART Objective statements :</h4>
              <p>
                Please write SMART Objective statements : Streching, Measurable, Agreed, Realistic, Time-Bound Mark PRIMARY
                objectives, to which a higher weighting will be given,with a * % .
              </p>
            </Col>
            <Col xs={12} sm={12} md={6} className="d-flex flex-column">
              <h2 className="mb-4 h3">REVIEW OF RESULTS ACHIEVED</h2>
              <h4>Ratings:</h4>
              <ul className="list-group-numbered p-0">
                <li>Top Performer</li>
                <li>Very Good</li>
                <li>Good</li>
                <li>Satisfactory</li>
                <li>Unacceptable</li>
                <li>Fail</li>

                {/* HR word ta remove korte bolse, tai staticaly diye disi */}
                {/* {ratingList && Array.isArray(ratingList) && ratingList.map((v) => <li>{v?.name}</li>)} */}
              </ul>
            </Col>
          </Row>

          <>
            <Accordion className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header as={"div"}>
                  <div>
                    <h3 className="header-title mb-0">1. PRODUCTION</h3>
                    <h6 className="header-pretitle mb-0">(Product/ Project) (Cost, revenue, quality, quantity)</h6>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                      <Form.Group>
                        <Form.Label htmlFor="production-cost-revenue">
                          1. PRODUCTION (Product/ Project) (Cost, revenue, quality, quantity)
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
                          <option value=""></option>
                          <option value="" selected>
                            ---------
                          </option>

                          {ratingList &&
                            Array.isArray(ratingList) &&
                            ratingList.map((v) => (
                              <>
                                <option value=""></option>
                                <option value={v?.id}>{v?.name}</option>
                              </>
                            ))}
                        </Form.Select>
                        {errors.production_rating && <div className="invalid-feedback">This field is required</div>}
                      </Form.Group>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header as={"div"}>
                  <div>
                    <h3 className="header-title mb-0">2. SUPPORT</h3>
                    <h6 className="header-pretitle mb-0">
                      (Service, problem resolution, customer perception, business risk & reputation )
                    </h6>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                      <Form.Group>
                        <Form.Label htmlFor="support">
                          2. SUPPORT (Service, problem resolution, customer perception, business risk & reputation ):
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
                          <option value=""></option>
                          <option value="" selected>
                            ---------
                          </option>

                          {ratingList &&
                            Array.isArray(ratingList) &&
                            ratingList.map((v) => (
                              <>
                                <option value=""></option>
                                <option value={v?.id}>{v?.name}</option>
                              </>
                            ))}
                        </Form.Select>
                        {errors.support_rating && <div className="invalid-feedback">This field is required</div>}
                      </Form.Group>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header as={"div"}>
                  <div>
                    <h3 className="header-title mb-0">3. INNOVATION</h3>
                    <h6 className="header-pretitle mb-0">(New ideas and implementation)</h6>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                      <Form.Group>
                        <Form.Label htmlFor="innovation">3. INNOVATION (New ideas and implementation):</Form.Label>
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
                          <option value=""></option>
                          <option value="" selected>
                            ---------
                          </option>

                          {ratingList &&
                            Array.isArray(ratingList) &&
                            ratingList.map((v) => (
                              <>
                                <option value=""></option>
                                <option value={v?.id}>{v?.name}</option>
                              </>
                            ))}
                        </Form.Select>
                        {errors.innovation_rating && <div className="invalid-feedback">This field is required</div>}
                      </Form.Group>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header as={"div"}>
                  <div>
                    <h3 className="header-title mb-0">4. PEOPLE</h3>
                    <h6 className="header-pretitle mb-0">(Leadership, management, training)</h6>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                      <Form.Group>
                        <Form.Label htmlFor="people-leadership">4. PEOPLE (Leadership, management, training):</Form.Label>
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
                          <option value=""></option>
                          <option value="" selected>
                            ---------
                          </option>

                          {ratingList &&
                            Array.isArray(ratingList) &&
                            ratingList.map((v) => (
                              <>
                                <option value=""></option>
                                <option value={v?.id}>{v?.name}</option>
                              </>
                            ))}
                        </Form.Select>
                        {errors.people_rating && <div className="invalid-feedback">This field is required</div>}
                      </Form.Group>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header as={"div"}>
                  <div>
                    <h3 className="header-title mb-0">5. OTHER</h3>
                    <h6 className="header-pretitle mb-0">(Learning & development)</h6>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                      <Form.Group>
                        <Form.Label htmlFor="people-leadership">5. OTHER (Learning & development):</Form.Label>
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
                          <option value=""></option>
                          <option value="" selected>
                            ---------
                          </option>

                          {ratingList &&
                            Array.isArray(ratingList) &&
                            ratingList.map((v) => (
                              <>
                                <option value=""></option>
                                <option value={v?.id}>{v?.name}</option>
                              </>
                            ))}
                        </Form.Select>
                        {errors.other_rating && <div className="invalid-feedback">This field is required</div>}
                      </Form.Group>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </>
        </Card.Body>
      </Card>

      {/* value rating   */}
      <Card>
        <Card.Body>
          <Row className="mb-4">
            <Col xs={12} sm={12} md={6} className="d-flex flex-column">
              <h2 className="mb-4 h3">VALUE RATINGS</h2>
            </Col>
            <Col xs={12} sm={12} md={6} className="d-flex flex-column">
              <h2 className="mb-4 h3">REVIEW OF RESULTS ACHIEVED</h2>
              <h4>Ratings:</h4>
              <ol style={{ listStyleType: "upper-alpha", paddingLeft: "16px" }}>
                {valueList && Array.isArray(valueList) && valueList.map((v) => <li>{v?.name}</li>)}
              </ol>
            </Col>
          </Row>
          <hr className="mb-4" />
          <>
            <Accordion className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header as={"div"}>
                  <div>
                    <h3 className="header-title mb-0">1. COURAGEOUS</h3>
                    <h6 className="header-pretitle mb-0">(Moral Strength: faith and belief in oneself, self confidence)</h6>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                      <Form.Group>
                        <Form.Label htmlFor="COURAGEOUS">
                          1. COURAGEOUS (Moral Strength: faith and belief in oneself, self confidence):
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
                        <Form.Label htmlFor="rating">Rating</Form.Label>
                        <Form.Select
                          {...register("courageous_rating", { required: true })}
                          className={errors.courageous_rating ? "is-invalid" : ""}
                        >
                          <option></option>
                          <option value="" selected>
                            ---------
                          </option>

                          {valueList &&
                            Array.isArray(valueList) &&
                            valueList.map((v) => (
                              <>
                                <option value=""></option>
                                <option value={v?.id}>{v?.name}</option>
                              </>
                            ))}
                        </Form.Select>
                        {errors.courageous_rating && <div className="invalid-feedback">This field is required</div>}
                      </Form.Group>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header as={"div"}>
                  <div>
                    <h3 className="header-title mb-0">2. TEAMWORK</h3>
                    <h6 className="header-pretitle mb-0">
                      (Team player, not exclusive: Enjoy sharing and collaborating with relevent parties)
                    </h6>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                      <Form.Group>
                        <Form.Label htmlFor="TEAMWORK">
                          2. TEAMWORK (Team player, not exclusive: Enjoy sharing and collaborating with relevent parties):
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
                        <Form.Label htmlFor="rating">Rating</Form.Label>
                        <Form.Select
                          {...register("teamwork_rating", { required: true })}
                          className={errors.teamwork_rating ? "is-invalid" : ""}
                        >
                          <option></option>
                          <option value="" selected>
                            ---------
                          </option>

                          {valueList &&
                            Array.isArray(valueList) &&
                            valueList.map((v) => (
                              <>
                                <option value=""></option>
                                <option value={v?.id}>{v?.name}</option>
                              </>
                            ))}
                        </Form.Select>
                        {errors.teamwork_rating && <div className="invalid-feedback">This field is required</div>}
                      </Form.Group>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header as={"div"}>
                  <div>
                    <h3 className="header-title mb-0">3. RESPONSIVE</h3>
                    <h6 className="header-pretitle mb-0">
                      (Attentive, Interactive : consider everyone inside & outside as customer ; stakeholder)
                    </h6>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-4">
                    <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                      <Form.Group>
                        <Form.Label htmlFor="RESPONSIVE">
                          3. RESPONSIVE (Attentive, Interactive : consider everyone inside & outside as customer ;
                          stakeholder) :
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
                        <Form.Label htmlFor="rating">Rating</Form.Label>
                        <Form.Select
                          {...register("responsive_rating", { required: true })}
                          className={errors.responsive_rating ? "is-invalid" : ""}
                        >
                          <option></option>
                          <option value="" selected>
                            ---------
                          </option>

                          {valueList &&
                            Array.isArray(valueList) &&
                            valueList.map((v) => (
                              <>
                                <option value=""></option>
                                <option value={v?.id}>{v?.name}</option>
                              </>
                            ))}
                        </Form.Select>
                        {errors.responsive_rating && <div className="invalid-feedback">This field is required</div>}
                      </Form.Group>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header as={"div"}>
                  <div>
                    <h3 className="header-title mb-0">4. CREATIVE</h3>
                    <h6 className="header-pretitle mb-0">(Business minds: Translates imagination into business)</h6>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-4">
                    <Col xs={12} sm={12} md={12} className="d-flex flex-column">
                      <Row>
                        <Col xs={12} sm={12} md={7}>
                          <Form.Label htmlFor="CREATIVE">
                            4. CREATIVE (Business minds: Translates imagination into business):
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
                              <option></option>
                              <option value="" selected>
                                ---------
                              </option>

                              {valueList &&
                                Array.isArray(valueList) &&
                                valueList.map((v) => (
                                  <>
                                    <option value=""></option>
                                    <option value={v?.id}>{v?.name}</option>
                                  </>
                                ))}
                            </Form.Select>
                            {errors.creative_rating && <div className="invalid-feedback">This field is required</div>}
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header as={"div"}>
                  <div>
                    <h3 className="header-title mb-0">5. TRUSTWORTHY</h3>
                    <h6 className="header-pretitle mb-0">(Deserving of trust , confidence , reliable, dependable)</h6>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col xs={12} sm={12} md={7}>
                      <Form.Label htmlFor="TRUSTWORTHY">
                        5. TRUSTWORTHY (Deserving of trust , confidence , reliable, dependable):
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
                          <option></option>
                          <option value="" selected>
                            ---------
                          </option>

                          {valueList &&
                            Array.isArray(valueList) &&
                            valueList.map((v) => (
                              <>
                                <option value=""></option>
                                <option value={v?.id}>{v?.name}</option>
                              </>
                            ))}
                        </Form.Select>
                        {errors.trustworthy_rating && <div className="invalid-feedback">This field is required</div>}
                      </Form.Group>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header as={"div"}>
                <div>
                  <h3 className="header-title mb-0">OTHER SUBSTANTIAL ACHIEVEMENTS</h3>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Col xs={12} sm={12} md={12} className="d-flex flex-column">
                  <Form.Group>
                    <Form.Label htmlFor="SUBSTANTIAL">OTHER SUBSTANTIAL ACHIEVEMENTS :</Form.Label>
                    <Form.Control
                      as={"textarea"}
                      {...register("other_sustainable_achievement")}
                      placeholder="OTHER SUBSTANTIAL ACHIEVEMENTS"
                      id="SUBSTANTIAL"
                      rows={6}
                    />
                  </Form.Group>
                </Col>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header as={"div"}>
                <div>
                  <h3 className="header-title mb-0">SIGNIFICANT ISSUES</h3>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Col xs={12} sm={12} md={12} className="d-flex flex-column">
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h2 className="header-title mb-0">Comments</h2>
          <hr className="mb-4" />
          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header as={"div"}>
                <div>
                  <h3 className="header-title mb-0">INDIVIDUAL'S COMMENTS</h3>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Col xs={12} sm={12} md={12} className="d-flex flex-column">
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header as={"div"}>
                <div>
                  <h3 className="header-title mb-0">MANAGERS COMMENTS</h3>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Col xs={12} sm={12} md={3} className="d-flex flex-column">
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header as={"div"}>
                <div>
                  <h3 className="header-title mb-0">SENIOR MANAGER / FUNCTIONAL HEAD'S COMMENTS</h3>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Col xs={12} sm={12} md={6} className="d-flex flex-column">
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header as={"div"}>
                <div>
                  <h3 className="header-title mb-0">DIRECTOR AND CHIEF OPERATING OFFICER'S COMMENTS</h3>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Col xs={12} sm={12} md={6} className="d-flex flex-column">
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header as={"div"}>
                <div>
                  <h3 className="header-title mb-0">OVERALL PERFORMANCE BASED ON ALL OF THE ABOVE RATING :</h3>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Col xs={12} sm={12} md={12} className="d-flex flex-column">
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="mt-4 text-end">
            <Button
              onClick={handleSubmit(submitKpiPerformanceForm)}
              type="submit"
              name="draft"
              variant="primary"
              className="me-2"
            >
              Save as draft
            </Button>
            <Button onClick={handleSubmit(submitKpiPerformanceForm)} type="submit" name="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Row className="mt-4"></Row>
    </Form>
  );
}

export default KpiPerformanceFormComponent;
