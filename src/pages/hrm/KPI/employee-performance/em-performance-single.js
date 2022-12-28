import React, { useEffect } from "react";
import Layout from "../../../../layout/Layout";
import { Accordion, Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import PageHeader from "../../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { API } from "../../../../utils/axios/axiosConfig";
import {
  EMPLOYEE_PERFORMANCE_EACH_GET,
  EMPLOYEE_PERFORMANCE_EACH_PUT,
  KPI_PERFORMANCE_FORM_SINGLE,
} from "../../../../utils/routes/api_routes/API_ROUTES";
import Loader from "../../../../components/loader/Loader";
import { EMPLOYEE_PERFORMANCE_PAGE } from "../../../../utils/routes/app_routes/APP_ROUTES";
import { useNavigate, useParams } from "react-router-dom";
import { error_alert, success_alert } from "../../../../components/alert/Alert";
import useKpiValue from "../../../../hooks/kpi/kpi_value";
import useHrRating from "../../../../hooks/kpi/hr_rating";
import { toast } from "react-toastify";
import ConfirmDialog from "../../../../components/confirm-dialog/ConfirmDialog";
import { USER_INFO } from "../../../../utils/session/token";

export default function EmPerformanceSingle() {
  const user = USER_INFO();
  const admin = user.group_id.split(",").includes("7") || user.group_id.split(",").includes("7");
  const supervisor = user.group_id.split(",").includes("6");

  ////////////////////////////////////////////////////////////////
  //////////////////// OLD  VERSION///////////////////////////////
  ////////////////////////////////////////////////////////////////
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
    setIsConfirm(false);
    const type = event.target.attributes["name"].value;
    if (type === "draft") {
      data["draft_save"] = false;
    } else {
      data["submit"] = true;
    }
    API.put(EMPLOYEE_PERFORMANCE_EACH_PUT(id), { ...data })
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

  ////////////////////////////////////////////////////////////////
  //////////////////// NEW  VERSION///////////////////////////////
  ////////////////////////////////////////////////////////////////
  const ratingList = useHrRating();
  const valueList = useKpiValue();
  const currYear = new Date().getFullYear();

  const [prevYearData, setPrevYearData] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get(KPI_PERFORMANCE_FORM_SINGLE(id))
      .then((response) => {
        setData(response.data.data);
        setPrevYearData(response.data?.data_last_year);
      })
      .catch((err) => {
        toast(err.response?.data?.non_field_errors[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const findRatingElem = (id) => {
    if (ratingList && Array.isArray(ratingList) && id) {
      const arr = ratingList.filter((v) => v?.id === parseInt(id));
      return arr.length > 0 ? arr[0].name : null;
    }
    return null;
  };

  const findValueElem = (id) => {
    if (valueList && Array.isArray(valueList) && id) {
      const arr = valueList.filter((v) => v?.id === parseInt(id));
      return arr.length > 0 ? arr[0].name : null;
    }
    return null;
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsConfirm(true);
  };

  return (
    <Layout>
      {loading && <Loader />}
      <PageHeader subTitle={""} title={"KPI Performance Form"} onBack />
      <Container fluid>
        <Form onSubmit={handleConfirm}>
          {/* EMPLOYYE INFO */}
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

          {/* Objective INFO */}
          <Card>
            <Card.Body>
              <Row className="mb-4">
                <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                  <h2 className="mb-4 h3">OBJECTIVES SET FOR YEAR {data?.year}</h2>
                  <h4>Please write SMART Objective statements :</h4>
                  <p>
                    Please write SMART Objective statements : Streching, Measurable, Agreed, Realistic, Time-Bound Mark
                    PRIMARY objectives, to which a higher weighting will be given,with a * % .
                  </p>
                </Col>
                <Col xs={12} sm={12} md={6} className="d-flex flex-column">
                  <h2 className="mb-4 h3">REVIEW OF RESULTS ACHIEVED</h2>
                  <h4>Ratings:</h4>
                  <ul className="list-group-numbered p-0">
                    {ratingList && Array.isArray(ratingList) && ratingList.map((v) => <li>{v?.name}</li>)}
                  </ul>
                </Col>
              </Row>
              <hr className="mb-4" />
              <Row>
                <Col sm="12" md={admin ? "6" : "12"}>
                  <h1 className="text-center mb-2">{currYear + 1}</h1>
                  <Accordion alwaysOpen>
                    <Accordion.Item>
                      <Accordion.Header as={"div"}>
                        <div>
                          <h3 className="header-title mb-0">1. PRODUCTION</h3>
                          <h6 className="header-pretitle mb-0">(Product/ Project) (Cost, revenue, quality, quantity)</h6>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <h6 className="header-pretitle mb-2">Objective</h6>
                        <Form.Control
                          readOnly={data?.flag === true}
                          as={"textarea"}
                          {...register("production", { required: true })}
                          placeholder="PRODUCTION (Product/ Project) (Cost, revenue, quality, quantity)"
                          id="production-cost-revenue"
                          rows={3}
                          className={errors.production ? "is-invalid" : ""}
                        />
                        {errors.production && <div className="invalid-feedback">This field is required</div>}
                        <Row className="mt-2">
                          <Col sm={6} xs={12} md={6}>
                            <h6 className="header-pretitle mb-2">Weightage Value</h6>
                            <Form.Control
                              readOnly={data?.flag === true}
                              type={"text"}
                              {...register("production_weightage", { required: true })}
                              placeholder="Weightage"
                              id="weightage-value"
                              className={errors.production_weightage ? "is-invalid" : ""}
                            />
                            {errors.production_weightage && <div className="invalid-feedback">This field is required</div>}
                          </Col>
                          <Col sm={6} xs={12} md={6}>
                            <h6 className="header-pretitle mb-2">Rating</h6>
                            <Form.Select
                              disabled={data?.flag === true}
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
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Header as={"div"}>
                        <div>
                          <h3 className="header-title mb-0">2. SUPPORT</h3>
                          <h6 className="header-pretitle mb-0">
                            (Service, problem resolution, customer perception, business risk & reputation )
                          </h6>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <h6 className="header-pretitle mb-2">Objective</h6>
                        <Form.Control
                          readOnly={data?.flag === true}
                          as={"textarea"}
                          {...register("support", { required: true })}
                          placeholder="SUPPORT (Service, problem resolution, customer perception, business risk & reputation )"
                          id="support"
                          rows={3}
                          className={errors.support ? "is-invalid" : ""}
                        />
                        {errors.support && <div className="invalid-feedback">This field is required</div>}
                        <Row className="mt-2">
                          <Col sm={6} xs={12} md={6}>
                            <h6 className="header-pretitle mb-2">Weightage Value</h6>
                            <Form.Control
                              readOnly={data?.flag === true}
                              type={"text"}
                              {...register("support_weightage", { required: true })}
                              className={errors.support_weightage ? "is-invalid" : ""}
                              placeholder="Weightage"
                              id="weightage-value"
                            />
                            {errors.support_weightage && <div className="invalid-feedback">This field is required</div>}
                          </Col>
                          <Col sm={6} xs={12} md={6}>
                            <h6 className="header-pretitle mb-2">Rating</h6>
                            <Form.Select
                              disabled={data?.flag === true}
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
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Header as={"div"}>
                        <div>
                          <h3 className="header-title mb-0">3. INNOVATION</h3>
                          <h6 className="header-pretitle mb-0">(New ideas and implementation)</h6>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <h6 className="header-pretitle mb-2">Objective</h6>
                        <Form.Control
                          readOnly={data?.flag === true}
                          as={"textarea"}
                          {...register("innovation", { required: true })}
                          placeholder="INNOVATION (New ideas and implementation)"
                          id="innovation"
                          rows={3}
                          className={errors.innovation ? "is-invalid" : ""}
                        />
                        {errors.innovation && <div className="invalid-feedback">This field is required</div>}
                        <Row className="mt-2">
                          <Col sm={6} xs={12} md={6}>
                            <h6 className="header-pretitle mb-2">Weightage Value</h6>
                            <Form.Control
                              readOnly={data?.flag === true}
                              type={"text"}
                              {...register("innovation_weightage", { required: true })}
                              className={errors.innovation_weightage ? "is-invalid" : ""}
                              placeholder="Weightage"
                              id="weightage-value"
                            />
                            {errors.innovation_weightage && <div className="invalid-feedback">This field is required</div>}
                          </Col>
                          <Col sm={6} xs={12} md={6}>
                            <h6 className="header-pretitle mb-2">Rating</h6>
                            <Form.Select
                              disabled={data?.flag === true}
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
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Header as={"div"}>
                        <div>
                          <h3 className="header-title mb-0">4. PEOPLE</h3>
                          <h6 className="header-pretitle mb-0">(Leadership, management, training)</h6>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <h6 className="header-pretitle mb-2">Objective</h6>
                        <Form.Control
                          readOnly={data?.flag === true}
                          as={"textarea"}
                          {...register("people", { required: true })}
                          placeholder="PEOPLE (Leadership, management, training)"
                          id="people-leadership"
                          rows={3}
                          className={errors.people ? "is-invalid" : ""}
                        />
                        {errors.people && <div className="invalid-feedback">This field is required</div>}
                        <Row className="mt-2">
                          <Col sm={6} xs={12} md={6}>
                            <h6 className="header-pretitle mb-2">Weightage Value</h6>
                            <Form.Control
                              readOnly={data?.flag === true}
                              type={"text"}
                              className={errors.people_weightage ? "is-invalid" : ""}
                              {...register("people_weightage", { required: true })}
                              placeholder="Weightage"
                              id="weightage-value"
                            />
                            {errors.people_weightage && <div className="invalid-feedback">This field is required</div>}
                          </Col>
                          <Col sm={6} xs={12} md={6}>
                            <h6 className="header-pretitle mb-2">Rating</h6>
                            <Form.Select
                              disabled={data?.flag === true}
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
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Header as={"div"}>
                        <div>
                          <h3 className="header-title mb-0">5. OTHER</h3>
                          <h6 className="header-pretitle mb-0">(Learning & development)</h6>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <h6 className="header-pretitle mb-2">Objective</h6>
                        <Form.Control
                          readOnly={data?.flag === true}
                          as={"textarea"}
                          {...register("other", { required: true })}
                          placeholder="OTHER (Learning & development)"
                          id="people-leadership"
                          rows={3}
                          className={errors.other ? "is-invalid" : ""}
                        />
                        {errors.other && <div className="invalid-feedback">This field is required</div>}
                        <Row className="mt-2">
                          <Col sm={6} xs={12} md={6}>
                            <h6 className="header-pretitle mb-2">Weightage Value</h6>
                            <Form.Control
                              readOnly={data?.flag === true}
                              type={"text"}
                              {...register("other_weightage", { required: true })}
                              className={errors.other_weightage ? "is-invalid" : ""}
                              placeholder="Weightage"
                              id="weightage-value"
                            />
                            {errors.other_weightage && <div className="invalid-feedback">This field is required</div>}
                          </Col>
                          <Col sm={6} xs={12} md={6}>
                            <h6 className="header-pretitle mb-2">Rating</h6>
                            <Form.Select
                              disabled={data?.flag === true}
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
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
                {admin && (
                  <Col sm="12" md="6">
                    <h1 className="text-center mb-2">{currYear}</h1>
                    <Accordion>
                      <Accordion.Item>
                        <Accordion.Header as={"div"}>
                          <div>
                            <h3 className="header-title mb-0">1. PRODUCTION</h3>
                            <h6 className="header-pretitle mb-0">(Product/ Project) (Cost, revenue, quality, quantity)</h6>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <h6 className="header-pretitle mb-2">Objective</h6>
                          <p className="fs-5 fw-bold" contentEditable={false}>
                            {prevYearData?.production || "N\\A"}
                          </p>
                          <Row>
                            <Col sm={6} xs={12} md={6}>
                              <h6 className="header-pretitle mb-2">Weightage Value</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.production_weightage || "N\\A"}
                              </p>
                            </Col>
                            <Col sm={6} xs={12} md={6}>
                              <h6 className="header-pretitle mb-2">Rating</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {findRatingElem(prevYearData?.production_rating) || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item>
                        <Accordion.Header as={"div"}>
                          <div>
                            <h3 className="header-title mb-0">2. SUPPORT</h3>
                            <h6 className="header-pretitle mb-0">
                              (Service, problem resolution, customer perception, business risk & reputation )
                            </h6>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <h6 className="header-pretitle mb-2">Objective</h6>
                          <p className="fs-5 fw-bold" contentEditable={false}>
                            {prevYearData?.support || "N\\A"}
                          </p>
                          <Row>
                            <Col sm={6} xs={12} md={6}>
                              <h6 className="header-pretitle mb-2">Weightage Value</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.support_weightage || "N\\A"}
                              </p>
                            </Col>
                            <Col sm={6} xs={12} md={6}>
                              <h6 className="header-pretitle mb-2">Rating</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {findRatingElem(prevYearData?.support_rating) || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item>
                        <Accordion.Header as={"div"}>
                          <div>
                            <h3 className="header-title mb-0">3. INNOVATION</h3>
                            <h6 className="header-pretitle mb-0">(New ideas and implementation)</h6>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <h6 className="header-pretitle mb-2">Objective</h6>
                          <p className="fs-5 fw-bold" contentEditable={false}>
                            {prevYearData?.innovation || "N\\A"}
                          </p>
                          <Row>
                            <Col sm={6} xs={12} md={6}>
                              <h6 className="header-pretitle mb-2">Weightage Value</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.innovation_weightage || "N\\A"}
                              </p>
                            </Col>
                            <Col sm={6} xs={12} md={6}>
                              <h6 className="header-pretitle mb-2">Rating</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {findRatingElem(prevYearData?.innovation_rating) || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item>
                        <Accordion.Header as={"div"}>
                          <div>
                            <h3 className="header-title mb-0">4. PEOPLE</h3>
                            <h6 className="header-pretitle mb-0">(Leadership, management, training)</h6>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <h6 className="header-pretitle mb-2">Objective</h6>
                          <p className="fs-5 fw-bold" contentEditable={false}>
                            {prevYearData?.people || "N\\A"}
                          </p>
                          <Row>
                            <Col sm={6} xs={12} md={6}>
                              <h6 className="header-pretitle mb-2">Weightage Value</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.people_weightage || "N\\A"}
                              </p>
                            </Col>
                            <Col sm={6} xs={12} md={6}>
                              <h6 className="header-pretitle mb-2">Rating</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {findRatingElem(prevYearData?.people_rating) || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item>
                        <Accordion.Header as={"div"}>
                          <div>
                            <h3 className="header-title mb-0">5. OTHER</h3>
                            <h6 className="header-pretitle mb-0">(Learning & development)</h6>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <h6 className="header-pretitle mb-2">Objective</h6>
                          <p className="fs-5 fw-bold" contentEditable={false}>
                            {prevYearData?.other || "N\\A"}
                          </p>
                          <Row>
                            <Col sm={6} xs={12} md={6}>
                              <h6 className="header-pretitle mb-2">Weightage Value</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.other_weightage || "N\\A"}
                              </p>
                            </Col>
                            <Col sm={6} xs={12} md={6}>
                              <h6 className="header-pretitle mb-2">Rating</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {findRatingElem(prevYearData?.other_rating) || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>

          {/* Values INFO */}
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
              <Row>
                <Col sm="12" md={admin ? "6" : "12"}>
                  <h1 className="text-center mb-2">{currYear + 1}</h1>
                  <Accordion>
                    <Accordion.Item>
                      <Accordion.Header as={"div"}>
                        <div>
                          <h3 className="header-title mb-0">1. COURAGEOUS</h3>
                          <h6 className="header-pretitle mb-0">
                            (Moral Strength: faith and belief in oneself, self confidence)
                          </h6>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col sm={12} xs={12} md={12}>
                            <h6 className="header-pretitle mb-2">Value</h6>
                            <Form.Control
                              readOnly={data?.flag === true}
                              as={"textarea"}
                              className={errors.courageous ? "is-invalid" : ""}
                              {...register("courageous", { required: true })}
                              placeholder="COURAGEOUS (Moral Strength: faith and belief in oneself, self confidence)"
                              id="COURAGEOUS"
                              rows={3}
                            />
                            {errors.courageous && <div className="invalid-feedback">This field is required</div>}
                          </Col>
                          <Col sm={12} xs={12} md={12} className="mt-2">
                            <h6 className="header-pretitle mb-2">Rating</h6>
                            <Form.Select
                              disabled={data?.flag === true}
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
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Header as={"div"}>
                        <div>
                          <h3 className="header-title mb-0">2. TEAMWORK</h3>
                          <h6 className="header-pretitle mb-0">
                            (Team player, not exclusive: Enjoy sharing and collaborating with relevent parties)
                          </h6>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col sm={12} xs={12} md={12}>
                            <h6 className="header-pretitle mb-2">Value</h6>
                            <Form.Control
                              readOnly={data?.flag === true}
                              as={"textarea"}
                              {...register("teamwork", { required: true })}
                              placeholder="TEAMWORK (Team player, not exclusive: Enjoy sharing and collaborating with relevent parties):"
                              id="TEAMWORK"
                              rows={3}
                              className={errors.teamwork ? "is-invalid" : ""}
                            />
                            {errors.teamwork && <div className="invalid-feedback">This field is required</div>}
                          </Col>
                          <Col sm={12} xs={12} md={12} className="mt-2">
                            <h6 className="header-pretitle mb-2">Rating</h6>
                            <Form.Select
                              disabled={data?.flag === true}
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
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Header as={"div"}>
                        <div>
                          <h3 className="header-title mb-0">3. RESPONSIVE</h3>
                          <h6 className="header-pretitle mb-0">
                            (Attentive, Interactive : consider everyone inside & outside as customer ; stakeholder)
                          </h6>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col sm={12} xs={12} md={12}>
                            <h6 className="header-pretitle mb-2">Value</h6>
                            <Form.Control
                              readOnly={data?.flag === true}
                              as={"textarea"}
                              {...register("responsive", { required: true })}
                              placeholder="RESPONSIVE (Attentive, Interactive : consider everyone inside & outside as customer ; stakeholder)"
                              id="RESPONSIVE"
                              rows={3}
                              className={errors.responsive ? "is-invalid" : ""}
                            />
                            {errors.responsive && <div className="invalid-feedback">This field is required</div>}
                          </Col>
                          <Col sm={12} xs={12} md={12} className="mt-2">
                            <h6 className="header-pretitle mb-2">Rating</h6>
                            <Form.Select
                              disabled={data?.flag === true}
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
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Header as={"div"}>
                        <div>
                          <h3 className="header-title mb-0">4. CREATIVE</h3>
                          <h6 className="header-pretitle mb-0">(Business minds: Translates imagination into business)</h6>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col sm={12} xs={12} md={12}>
                            <h6 className="header-pretitle mb-2">Value</h6>
                            <Form.Control
                              readOnly={data?.flag === true}
                              as={"textarea"}
                              {...register("creative", { required: true })}
                              placeholder="CREATIVE (Business minds: Translates imagination into business)"
                              id="CREATIVE"
                              rows={3}
                              className={errors.creative ? "is-invalid" : ""}
                            />
                            {errors.creative && <div className="invalid-feedback">This field is required</div>}
                          </Col>
                          <Col sm={12} xs={12} md={12} className="mt-2">
                            <h6 className="header-pretitle mb-2">Rating</h6>
                            <Form.Select
                              disabled={data?.flag === true}
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
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Header as={"div"}>
                        <div>
                          <h3 className="header-title mb-0">5. TRUSTWORTHY</h3>
                          <h6 className="header-pretitle mb-0">(Deserving of trust , confidence , reliable, dependable)</h6>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col sm={12} xs={12} md={12}>
                            <h6 className="header-pretitle mb-2">Value</h6>
                            <Form.Control
                              readOnly={data?.flag === true}
                              as={"textarea"}
                              {...register("trustworthy", { required: true })}
                              placeholder="TRUSTWORTHY (Deserving of trust , confidence , reliable, dependable)"
                              id="TRUSTWORTHY"
                              rows={3}
                              className={errors.trustworthy ? "is-invalid" : ""}
                            />
                            {errors.trustworthy && <div className="invalid-feedback">This field is required</div>}
                          </Col>
                          <Col sm={12} xs={12} md={12}>
                            <h6 className="header-pretitle mb-2">Rating</h6>
                            <Form.Select
                              disabled={data?.flag === true}
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
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
                {admin && (
                  <Col sm="12" md="6">
                    <h1 className="text-center mb-2">{currYear}</h1>
                    <Accordion>
                      <Accordion.Item>
                        <Accordion.Header as={"div"}>
                          <div>
                            <h3 className="header-title mb-0">1. COURAGEOUS</h3>
                            <h6 className="header-pretitle mb-0">
                              (Moral Strength: faith and belief in oneself, self confidence)
                            </h6>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col sm={12} xs={12} md={12}>
                              <h6 className="header-pretitle mb-2">Value</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.courageous || "N\\A"}
                              </p>
                            </Col>
                            <Col sm={12} xs={12} md={12}>
                              <h6 className="header-pretitle mb-2">Rating</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {findValueElem(prevYearData?.courageous_rating) || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item>
                        <Accordion.Header as={"div"}>
                          <div>
                            <h3 className="header-title mb-0">2. TEAMWORK</h3>
                            <h6 className="header-pretitle mb-0">
                              (Team player, not exclusive: Enjoy sharing and collaborating with relevent parties)
                            </h6>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col sm={12} xs={12} md={12}>
                              <h6 className="header-pretitle mb-2">Value</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.teamwork || "N\\A"}
                              </p>
                            </Col>
                            <Col sm={12} xs={12} md={12}>
                              <h6 className="header-pretitle mb-2">Rating</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {findValueElem(prevYearData?.teamwork_rating) || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item>
                        <Accordion.Header as={"div"}>
                          <div>
                            <h3 className="header-title mb-0">3. RESPONSIVE</h3>
                            <h6 className="header-pretitle mb-0">
                              (Attentive, Interactive : consider everyone inside & outside as customer ; stakeholder)
                            </h6>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col sm={12} xs={12} md={12}>
                              <h6 className="header-pretitle mb-2">Value</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.responsive || "N\\A"}
                              </p>
                            </Col>
                            <Col sm={12} xs={12} md={12}>
                              <h6 className="header-pretitle mb-2">Rating</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {findValueElem(prevYearData?.responsive_rating) || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item>
                        <Accordion.Header as={"div"}>
                          <div>
                            <h3 className="header-title mb-0">4. CREATIVE</h3>
                            <h6 className="header-pretitle mb-0">(Business minds: Translates imagination into business)</h6>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col sm={12} xs={12} md={12}>
                              <h6 className="header-pretitle mb-2">Value</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.creative || "N\\A"}
                              </p>
                            </Col>
                            <Col sm={12} xs={12} md={12}>
                              <h6 className="header-pretitle mb-2">Rating</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {findValueElem(prevYearData?.creative_rating) || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item>
                        <Accordion.Header as={"div"}>
                          <div>
                            <h3 className="header-title mb-0">5. TRUSTWORTHY</h3>
                            <h6 className="header-pretitle mb-0">
                              (Deserving of trust , confidence , reliable, dependable)
                            </h6>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col sm={12} xs={12} md={12}>
                              <h6 className="header-pretitle mb-2">Value</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.trustworthy || "N\\A"}
                              </p>
                            </Col>
                            <Col sm={12} xs={12} md={12}>
                              <h6 className="header-pretitle mb-2">Rating</h6>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {findValueElem(prevYearData?.trustworthy_rating) || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>

          {/* Other Substantial Achivement */}
          <Card>
            <Card.Body>
              <Row>
                <Col sm="12" md={admin ? "6" : "12"}>
                  <h1 className="text-center mb-2">{currYear + 1}</h1>
                  <Accordion>
                    <Accordion.Item>
                      <Accordion.Header as={"div"}>
                        <div>
                          <h3 className="header-title mb-0">OTHER SUBSTANTIAL ACHIEVEMENTS</h3>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col sm={12} xs={12} md={12}>
                            <Form.Control
                              readOnly={data?.flag === true}
                              as={"textarea"}
                              {...register("other_sustainable_achievement")}
                              placeholder="OTHER SUBSTANTIAL ACHIEVEMENTS"
                              id="SUBSTANTIAL"
                              rows={6}
                            />
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Header as={"div"}>
                        <div>
                          <h3 className="header-title mb-0">SIGNIFICANT ISSUES</h3>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col sm={12} xs={12} md={12}>
                            <Form.Control
                              readOnly={data?.flag === true}
                              as={"textarea"}
                              {...register("significant_issue")}
                              placeholder="SIGNIFICANT ISSUES"
                              id="ISSUES"
                              rows={6}
                            />
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
                {admin && (
                  <Col sm="12" md="6">
                    <h1 className="text-center mb-2">{currYear}</h1>
                    <Accordion>
                      <Accordion.Item>
                        <Accordion.Header as={"div"}>
                          <div>
                            <h3 className="header-title mb-0">OTHER SUBSTANTIAL ACHIEVEMENTS</h3>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col sm={12} xs={12} md={12}>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.other_sustainable_achievement || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item>
                        <Accordion.Header as={"div"}>
                          <div>
                            <h3 className="header-title mb-0">SIGNIFICANT ISSUES</h3>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col sm={12} xs={12} md={12}>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.significant_issue || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>

          {/* Comments */}
          <Card>
            <Card.Body>
              <h2 className="header-title mb-0">Comments</h2>
              <hr className="mb-4" />
              <Row>
                <Col sm="12" md={admin ? "6" : "12"}>
                  <h1 className="text-center mb-2">{currYear + 1}</h1>
                  <Accordion>
                    <Accordion.Item>
                      <Accordion.Header as={"div"}>
                        <div>
                          <h3 className="header-title mb-0">INDIVIDUAL'S COMMENTS</h3>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col sm={12} xs={12} md={12}>
                            <Form.Control
                              readOnly={data?.flag === true}
                              as={"textarea"}
                              {...register("individual_comment")}
                              placeholder="INDIVIDUAL'S COMMENTS"
                              id="INDIVIDUAL"
                              rows={6}
                            />
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Header as={"div"}>
                        <div>
                          <h3 className="header-title mb-0">MANAGERS COMMENTS</h3>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col sm={12} xs={12} md={12}>
                            <Form.Control
                              readOnly={data?.flag === true}
                              as={"textarea"}
                              {...register("manager_comment")}
                              placeholder="MANAGERS COMMENTS"
                              id="MANAGERS"
                              rows={6}
                            />
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Header as={"div"}>
                        <div>
                          <h3 className="header-title mb-0">SENIOR MANAGER / FUNCTIONAL HEAD'S COMMENTS</h3>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col sm={12} xs={12} md={12}>
                            <Form.Control
                              readOnly={data?.flag === true}
                              as={"textarea"}
                              {...register("senior_manager_functional_head_comment")}
                              placeholder="SENIOR MANAGER / FUNCTIONAL HEAD'S COMMENTS"
                              id="FUNCTIONAL"
                              rows={6}
                            />
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item>
                      <Accordion.Header as={"div"}>
                        <div>
                          <h3 className="header-title mb-0">DIRECTOR AND CHIEF OPERATING OFFICER'S COMMENTS</h3>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col sm={12} xs={12} md={12}>
                            <Form.Control
                              readOnly={data?.flag === true}
                              as={"textarea"}
                              {...register("director_chief_operating_officer_comment")}
                              placeholder="DIRECTOR AND CHIEF OPERATING OFFICER'S COMMENTS :"
                              id="DIRECTOR"
                              rows={6}
                            />
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
                {admin && (
                  <Col sm="12" md="6">
                    <h1 className="text-center mb-2">{currYear}</h1>
                    <Accordion>
                      <Accordion.Item>
                        <Accordion.Header as={"div"}>
                          <div>
                            <h3 className="header-title mb-0">INDIVIDUAL'S COMMENTS</h3>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col sm={12} xs={12} md={12}>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.individual_comment || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item>
                        <Accordion.Header as={"div"}>
                          <div>
                            <h3 className="header-title mb-0">MANAGERS COMMENTS</h3>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col sm={12} xs={12} md={12}>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.manager_comment || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item>
                        <Accordion.Header as={"div"}>
                          <div>
                            <h3 className="header-title mb-0">SENIOR MANAGER / FUNCTIONAL HEAD'S COMMENTS</h3>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col sm={12} xs={12} md={12}>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.senior_manager_functional_head_comment || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item>
                        <Accordion.Header as={"div"}>
                          <div>
                            <h3 className="header-title mb-0">DIRECTOR AND CHIEF OPERATING OFFICER'S COMMENTS</h3>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col sm={12} xs={12} md={12}>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.director_chief_operating_officer_comment || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>

          {/* OVERALL PERFORMANCE BASED ON ALL OF THE ABOVE RATING */}
          <Card>
            <Card.Body>
              <h2 className="header-title mb-0">OVERALL PERFORMANCE BASED ON ALL OF THE ABOVE RATING</h2>
              <hr className="mb-4" />
              <Row>
                <Col sm="12" md={admin ? "6" : "12"}>
                  <h1 className="text-center mb-2">{currYear + 1}</h1>
                  <Accordion>
                    <Accordion.Item>
                      <Accordion.Body className={"show"}>
                        <Row>
                          <Col sm={12} xs={12} md={12}>
                            <Form.Control
                              readOnly={data?.flag === true}
                              as={"textarea"}
                              {...register("overall_performance")}
                              placeholder="OVERALL PERFORMANCE BASED ON ALL OF THE ABOVE RATING"
                              id="OVERALL"
                              rows={6}
                            />
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
                {admin && (
                  <Col sm="12" md="6">
                    <h1 className="text-center mb-2">{currYear}</h1>
                    <Accordion>
                      <Accordion.Item>
                        <Accordion.Body className={"show"}>
                          <Row>
                            <Col sm={12} xs={12} md={12}>
                              <p className="fs-5 fw-bold" contentEditable={false}>
                                {prevYearData?.overall_performance || "N\\A"}
                              </p>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>

          <div className="text-end">
            {/* <div style={{ marginRight: "10px" }}>
                <Button onClick={handleSubmit(submitKpiPerformanceForm)} type="submit" name="draft" variant="primary">
                  Save as draft
                </Button>
              </div> */}

            {data?.flag === false && (
              <Button
                // onClick={handleConfirm}
                type="submit"
                name="submit"
                className="btn btn-primary"
                onClick={handleSubmit(submitKpiPerformanceForm)}
              >
                Submit
              </Button>
            )}
            <Modal
              show={isConfirm}
              onHide={(e) => {
                setIsConfirm(false);
              }}
            >
              {/* MANUAL CONFIRM MODAL */}
              {/* CONFIRM MODAL COMPONENT IS CAUSING SOME ISSUE  */}
              <Modal.Body>
                <div className="text-center">
                  <h2 className="mb-3 text-center text-danger">
                    <span className="fe fe-alert-triangle"></span>&nbsp;Warning
                  </h2>
                  <div className="d-flex justify-content-center text-center">Are you sure you want to submit?</div>
                  <div className={"d-flex justify-content-center align-items-center mt-4"}>
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-primary"
                      onClick={handleSubmit(submitKpiPerformanceForm)}
                      style={{ marginRight: "15px" }}
                    >
                      <span className="fe fe-check"></span>&nbsp;Confirm
                    </button>
                    <button className="btn btn-danger" onClick={(e) => setIsConfirm(false)}>
                      <span className="fe fe-x-circle"></span>&nbsp;Cancel
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </Form>
      </Container>
    </Layout>
  );
}

//  Objective INFO OLD
// <Accordion className="mb-4">
//   <Accordion.Item className="bg-white">
//     <Accordion.Header>
//       <h3 className="mb-0">Objective</h3>
//     </Accordion.Header>
//     <Accordion.Body>
//       <Row className="mb-3">
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <h4 className="mb-3">OBJECTIVES SET FOR YEAR 2022</h4>
//           <h4 className="mb-1">Please write SMART Objective statements :</h4>
//           <p>
//             Please write SMART Objective statements : Streching, Measurable, Agreed, Realistic, Time-Bound Mark
//             PRIMARY objectives, to which a higher weighting will be given,with a * % .
//           </p>
//         </Col>
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <h4 className="mb-3">REVIEW OF RESULTS ACHIEVED</h4>
//           <h4>Ratings:</h4>
//           <ul className="list-group-numbered p-0 mb-1">
//             <li>Exceeded</li>
//             <li>Achieved all aspects</li>
//             <li>Achieved the essnential requirements</li>
//             <li>Did not achieve</li>
//           </ul>
//         </Col>
//       </Row>
//       <hr className="mb-4" />

//       <Row className="mb-4">
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Form.Group>
//             <Form.Label htmlFor="production-cost-revenue">
//               <h4 className="mb-0">PRODUCTION (Product/Project) (Cost, revenue, quality, quantity)</h4>
//             </Form.Label>
//             <Form.Control
// readOnly={data?.flag === true}
//               as={"textarea"}
//               {...register("production", { required: true })}
//               placeholder="PRODUCTION (Product/ Project) (Cost, revenue, quality, quantity)"
//               id="production-cost-revenue"
//               rows={6}
//               className={errors.production ? "is-invalid" : ""}
//             />
//             {errors.production && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//           <Form.Group className="mt-4">
//             <Form.Label htmlFor="weightage-value">Weightage</Form.Label>
//             <Form.Control
// readOnly={data?.flag === true}
//               type={"text"}
//               {...register("production_weightage", { required: true })}
//               placeholder="Weightage"
//               id="weightage-value"
//               className={errors.production_weightage ? "is-invalid" : ""}
//             />
//             {errors.production_weightage && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//         </Col>
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Form.Group>
//             <Form.Label htmlFor="rating">Rating</Form.Label>
//              <Form.Select
// disabled={data?.flag === true}
//               {...register("production_rating", { required: true })}
//               className={errors.production_rating ? "is-invalid" : ""}
//             >
//               <option>------</option>
//               <option value="1">Exceeded</option>
//               <option value="2">Achieved all aspects</option>
//               <option value="3">Achieved the essential requirements</option>
//               <option value="4">Did not achieve</option>
//             </Form.Select>
//             {errors.production_rating && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//         </Col>
//       </Row>
//       <hr className="mb-4" />

//       <Row className="mb-4">
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Form.Group>
//             <Form.Label htmlFor="support">
//               <h4 className="mb-0">
//                 SUPPORT (Service, problem resolution, customer perception, business risk & reputation ):
//               </h4>
//             </Form.Label>
//             <Form.Control
// readOnly={data?.flag === true}
//               as={"textarea"}
//               {...register("support", { required: true })}
//               placeholder="SUPPORT (Service, problem resolution, customer perception, business risk & reputation )"
//               id="support"
//               rows={6}
//               className={errors.support ? "is-invalid" : ""}
//             />
//             {errors.support && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//           <Form.Group className="mt-4">
//             <Form.Label htmlFor="weightage-value">Weightage</Form.Label>
//             <Form.Control
// readOnly={data?.flag === true}
//               type={"text"}
//               {...register("support_weightage", { required: true })}
//               className={errors.support_weightage ? "is-invalid" : ""}
//               placeholder="Weightage"
//               id="weightage-value"
//             />
//             {errors.support_weightage && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//         </Col>
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Form.Group>
//             <Form.Label htmlFor="rating">Rating</Form.Label>
//              <Form.Select
// disabled={data?.flag === true}
//               {...register("support_rating", { required: true })}
//               className={errors.support_rating ? "is-invalid" : ""}
//             >
//               <option>--------</option>
//               <option value="1">Exceeded</option>
//               <option value="2">Achieved all aspects</option>
//               <option value="3">Achieved the essential requirements</option>
//               <option value="4">Did not achieve</option>
//             </Form.Select>
//             {errors.support_rating && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//         </Col>
//       </Row>
//       <hr className="mb-4" />

//       <Row className="mb-4">
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Form.Group>
//             <Form.Label htmlFor="innovation">
//               <h4 className="mb-0">INNOVATION (New ideas and implementation):</h4>
//             </Form.Label>
//             <Form.Control
// readOnly={data?.flag === true}
//               as={"textarea"}
//               {...register("innovation", { required: true })}
//               placeholder="INNOVATION (New ideas and implementation)"
//               id="innovation"
//               rows={6}
//               className={errors.innovation ? "is-invalid" : ""}
//             />
//             {errors.innovation && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//           <Form.Group className="mt-4">
//             <Form.Label htmlFor="weightage-value">Weightage</Form.Label>
//             <Form.Control
// readOnly={data?.flag === true}
//               type={"text"}
//               {...register("innovation_weightage", { required: true })}
//               className={errors.innovation_weightage ? "is-invalid" : ""}
//               placeholder="Weightage"
//               id="weightage-value"
//             />
//             {errors.innovation_weightage && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//         </Col>
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Form.Group>
//             <Form.Label htmlFor="rating">Rating</Form.Label>
//              <Form.Select
// disabled={data?.flag === true}
//               {...register("innovation_rating", { required: true })}
//               className={errors.innovation_rating ? "is-invalid" : ""}
//             >
//               <option>---------</option>
//               <option value="1">Exceeded</option>
//               <option value="2">Achieved all aspects</option>
//               <option value="3">Achieved the essential requirements</option>
//               <option value="4">Did not achieve</option>
//             </Form.Select>
//             {errors.innovation_rating && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//         </Col>
//       </Row>
//       <hr className="mb-4" />

//       <Row className="mb-4">
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Form.Group>
//             <Form.Label htmlFor="people-leadership">
//               <h4 className="mb-0">PEOPLE (Leadership, management, training):</h4>
//             </Form.Label>
//             <Form.Control
// readOnly={data?.flag === true}
//               as={"textarea"}
//               {...register("people", { required: true })}
//               placeholder="PEOPLE (Leadership, management, training)"
//               id="people-leadership"
//               rows={6}
//               className={errors.people ? "is-invalid" : ""}
//             />
//             {errors.people && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//           <Form.Group className="mt-4">
//             <Form.Label htmlFor="weightage-value">Weightage</Form.Label>
//             <Form.Control
// readOnly={data?.flag === true}
//               type={"text"}
//               className={errors.people_weightage ? "is-invalid" : ""}
//               {...register("people_weightage", { required: true })}
//               placeholder="Weightage"
//               id="weightage-value"
//             />
//             {errors.people_weightage && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//         </Col>
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Form.Group>
//             <Form.Label htmlFor="rating">Rating</Form.Label>
//              <Form.Select
// disabled={data?.flag === true}
//               className={errors.people_rating ? "is-invalid" : ""}
//               {...register("people_rating", { required: true })}
//             >
//               <option>---------</option>
//               <option value="1">Exceeded</option>
//               <option value="2">Achieved all aspects</option>
//               <option value="3">Achieved the essential requirements</option>
//               <option value="4">Did not achieve</option>
//             </Form.Select>
//             {errors.people_rating && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//         </Col>
//       </Row>
//       <hr className="mb-4" />

//       <Row className="mb-4">
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Form.Group>
//             <Form.Label htmlFor="people-leadership">
//               <h4 className="mb-0">OTHER (Learning & development):</h4>
//             </Form.Label>
//             <Form.Control
// readOnly={data?.flag === true}
//               as={"textarea"}
//               {...register("other", { required: true })}
//               placeholder="OTHER (Learning & development)"
//               id="people-leadership"
//               rows={6}
//               className={errors.other ? "is-invalid" : ""}
//             />
//             {errors.other && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//           <Form.Group className="mt-4">
//             <Form.Label htmlFor="weightage-value">Weightage</Form.Label>
//             <Form.Control
// readOnly={data?.flag === true}
//               type={"text"}
//               {...register("other_weightage", { required: true })}
//               className={errors.other_weightage ? "is-invalid" : ""}
//               placeholder="Weightage"
//               id="weightage-value"
//             />
//             {errors.other_weightage && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//         </Col>
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Form.Group>
//             <Form.Label htmlFor="rating">Rating</Form.Label>
//              <Form.Select
// disabled={data?.flag === true}
//               {...register("other_rating", { required: true })}
//               className={errors.other_rating ? "is-invalid" : ""}
//             >
//               <option>---------</option>
//               <option value="1">Exceeded</option>
//               <option value="2">Achieved all aspects</option>
//               <option value="3">Achieved the essential requirements</option>
//               <option value="4">Did not achieve</option>
//             </Form.Select>
//             {errors.other_rating && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//         </Col>
//       </Row>
//     </Accordion.Body>
//   </Accordion.Item>
// </Accordion>

///////////////////////////////////////////////////////////////////////////////////////////

//   Values INFO OLD
//   <Accordion className="mb-4">
//   <Accordion.Item className="bg-white" eventKey="0">
//     <Accordion.Header>
//       <h3 className="mb-0">Values</h3>
//     </Accordion.Header>
//     <Accordion.Body>
//       <Row className="mb-3">
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <h4 className="mb-2">REVIEW OF RESULTS ACHIEVED</h4>
//           <h4 className="mb-1">Ratings:</h4>
//           <ol style={{ listStyleType: "upper-alpha", paddingLeft: "16px", fontSize: "14px" }}>
//             <li>Role Model</li>
//             <li>Very Good</li>
//             <li>Good</li>
//             <li>Improvement Required</li>
//             <li>Unacceptable</li>
//           </ol>
//         </Col>
//       </Row>
//       <hr className="mb-4" />

//       <Row className="mb-4">
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Form.Group>
//             <Form.Label htmlFor="COURAGEOUS">
//               <h4 className="mb-0">COURAGEOUS</h4>
//               <h5 className="mb-0 text-secondary">
//                 Moral Strength: faith and belief in oneself, self confidence:
//               </h5>
//             </Form.Label>
//             <Form.Control
// readOnly={data?.flag === true}
//               as={"textarea"}
//               className={errors.courageous ? "is-invalid" : ""}
//               {...register("courageous", { required: true })}
//               placeholder="COURAGEOUS (Moral Strength: faith and belief in oneself, self confidence)"
//               id="COURAGEOUS"
//               rows={6}
//             />
//             {errors.courageous && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//         </Col>
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Form.Group>
//             <Form.Label htmlFor="rating" className="mb-3">
//               Rating
//             </Form.Label>
//              <Form.Select
// disabled={data?.flag === true}
//               {...register("courageous_rating", { required: true })}
//               className={errors.courageous_rating ? "is-invalid" : ""}
//             >
//               <option>---------</option>
//               <option value="1">Exceeded</option>
//               <option value="2">Achieved all aspects</option>
//               <option value="3">Achieved the essential requirements</option>
//               <option value="4">Did not achieve</option>
//               <option value="5">Unacceptable</option>
//             </Form.Select>
//             {errors.courageous_rating && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//         </Col>
//       </Row>
//       <hr className="mb-4" />

//       <Row className="mb-4">
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Form.Group>
//             <Form.Label htmlFor="TEAMWORK">
//               <h4 className="mb-0">TEAMWORK</h4>
//               <h5 className="mb-0 text-secondary">
//                 Team player, not exclusive: Enjoy sharing and collaborating with relevent parties
//               </h5>
//             </Form.Label>
//             <Form.Control
// readOnly={data?.flag === true}
//               as={"textarea"}
//               {...register("teamwork", { required: true })}
//               placeholder="TEAMWORK (Team player, not exclusive: Enjoy sharing and collaborating with relevent parties):"
//               id="TEAMWORK"
//               rows={6}
//               className={errors.teamwork ? "is-invalid" : ""}
//             />
//             {errors.teamwork && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//         </Col>
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Form.Group>
//             <Form.Label className="mb-3" htmlFor="rating">
//               Rating
//             </Form.Label>
//              <Form.Select
// disabled={data?.flag === true}
//               {...register("teamwork_rating", { required: true })}
//               className={errors.teamwork_rating ? "is-invalid" : ""}
//             >
//               <option>---------</option>
//               <option value="1">Exceeded</option>
//               <option value="2">Achieved all aspects</option>
//               <option value="3">Achieved the essential requirements</option>
//               <option value="4">Did not achieve</option>
//               <option value="5">Unacceptable</option>
//             </Form.Select>
//             {errors.teamwork_rating && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//         </Col>
//       </Row>
//       <hr className="mb-4" />

//       <Row className="mb-4">
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Form.Group>
//             <Form.Label htmlFor="RESPONSIVE">
//               <h4 className="mb-0">RESPONSIVE </h4>
//               <h5 className="mb-0 text-secondary">
//                 Attentive, Interactive : consider everyone inside & outside as customer ; stakeholder
//               </h5>
//             </Form.Label>
//             <Form.Control
// readOnly={data?.flag === true}
//               as={"textarea"}
//               {...register("responsive", { required: true })}
//               placeholder="RESPONSIVE (Attentive, Interactive : consider everyone inside & outside as customer ; stakeholder)"
//               id="RESPONSIVE"
//               rows={6}
//               className={errors.responsive ? "is-invalid" : ""}
//             />
//             {errors.responsive && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//         </Col>
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Form.Group>
//             <Form.Label className="mb-4" htmlFor="rating">
//               Rating
//             </Form.Label>
//  <Form.Select
// disabled={data?.flag === true}
//               {...register("responsive_rating", { required: true })}
//               className={errors.responsive_rating ? "is-invalid" : ""}
//             >
//               <option>---------</option>
//               <option value="1">Exceeded</option>
//               <option value="2">Achieved all aspects</option>
//               <option value="3">Achieved the essential requirements</option>
//               <option value="4">Did not achieve</option>
//               <option value="5">Unacceptable</option>
//             </Form.Select>
//             {errors.responsive_rating && <div className="invalid-feedback">This field is required</div>}
//           </Form.Group>
//         </Col>
//       </Row>
//       <hr className="mb-4" />

//       <Row className="mb-4">
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Row>
//             <Col xs={12} sm={12} md={7}>
//               <Form.Label htmlFor="CREATIVE">
//                 <h4 className="mb-0">CREATIVE</h4>
//                 <h5 className="mb-0 text-secondary">Business minds: Translates imagination into business:</h5>
//               </Form.Label>
//             </Col>
//             <Col xs={12} sm={12} md={5}>
//               <Form.Label htmlFor="rating1">Rating</Form.Label>
//             </Col>
//           </Row>
//           <Row>
//             <Col xs={12} sm={12} md={7}>
//               <Form.Group>
//                 <Form.Control
// readOnly={data?.flag === true}
//                   as={"textarea"}
//                   {...register("creative", { required: true })}
//                   placeholder="CREATIVE (Business minds: Translates imagination into business)"
//                   id="CREATIVE"
//                   rows={6}
//                   className={errors.creative ? "is-invalid" : ""}
//                 />
//                 {errors.creative && <div className="invalid-feedback">This field is required</div>}
//               </Form.Group>
//             </Col>
//             <Col xs={12} sm={12} md={5}>
//               <Form.Group>
//                  <Form.Select
// disabled={data?.flag === true}
//                   {...register("creative_rating", { required: true })}
//                   className={errors.creative_rating ? "is-invalid" : ""}
//                 >
//                   <option>---------</option>
//                   <option value="1">Exceeded</option>
//                   <option value="2">Achieved all aspects</option>
//                   <option value="3">Achieved the essential requirements</option>
//                   <option value="4">Did not achieve</option>
//                   <option value="5">Unacceptable</option>
//                 </Form.Select>
//                 {errors.creative_rating && <div className="invalid-feedback">This field is required</div>}
//               </Form.Group>
//             </Col>
//           </Row>
//         </Col>
//         <Col xs={12} sm={12} md={6} className="d-flex flex-column">
//           <Row>
//             <Col xs={12} sm={12} md={7}>
//               <Form.Label htmlFor="TRUSTWORTHY">
//                 <h4 className="mb-0">TRUSTWORTHY</h4>
//                 <h5 className="mb-0 text-secondary">Deserving of trust , confidence , reliable, dependable:</h5>
//               </Form.Label>
//             </Col>
//             <Col xs={12} sm={12} md={5}>
//               <Form.Label htmlFor="rating1">Rating</Form.Label>
//             </Col>
//           </Row>
//           <Row>
//             <Col xs={12} sm={12} md={7}>
//               <Form.Group>
//                 <Form.Control
// readOnly={data?.flag === true}
//                   as={"textarea"}
//                   {...register("trustworthy", { required: true })}
//                   placeholder="TRUSTWORTHY (Deserving of trust , confidence , reliable, dependable)"
//                   id="TRUSTWORTHY"
//                   rows={6}
//                   className={errors.trustworthy ? "is-invalid" : ""}
//                 />
//                 {errors.trustworthy && <div className="invalid-feedback">This field is required</div>}
//               </Form.Group>
//             </Col>
//             <Col xs={12} sm={12} md={5}>
//               <Form.Group>
//                  <Form.Select
// disabled={data?.flag === true}
//                   {...register("trustworthy_rating", { required: true })}
//                   className={errors.trustworthy_rating ? "is-invalid" : ""}
//                 >
//                   <option>---------</option>
//                   <option value="1">Exceeded</option>
//                   <option value="2">Achieved all aspects</option>
//                   <option value="3">Achieved the essential requirements</option>
//                   <option value="4">Did not achieve</option>
//                   <option value="5">Unacceptable</option>
//                 </Form.Select>
//                 {errors.trustworthy_rating && <div className="invalid-feedback">This field is required</div>}
//               </Form.Group>
//             </Col>
//           </Row>
//         </Col>
//       </Row>

//       <Row className="mt-2">
//         <h4 className="mb-5">SIGNATURE TO OBJECTIVES:</h4>
//         <Col xs={12} sm={12} md={6} className="d-flex justify-content-center flex-column">
//           <hr style={{ color: "#000000" }} />
//           <span className="text-center mt-0">Individual Manager Function or SBU Head</span>
//         </Col>
//         <Col xs={12} sm={12} md={6} className="d-flex justify-content-center flex-column align-items-center">
//           <hr style={{ color: "#000000", width: "75%" }} />
//           <span className="text-center mt-0">Manager</span>
//         </Col>
//       </Row>
//     </Accordion.Body>
//   </Accordion.Item>
// </Accordion>

//

// Achivements OLD
//    <Accordion className="mb-4">
//    <Accordion.Item className="bg-white" eventKey="0">
//      <Accordion.Header>
//        <h3 className="mb-0">Achievements</h3>
//      </Accordion.Header>
//      <Accordion.Body>
//        <Row>
//          <Col xs={12} sm={12} md={6} className="d-flex flex-column mb-4">
//            <Form.Group>
//              <Form.Label htmlFor="SUBSTANTIAL">
//                <h4 className="mb-0">OTHER SUBSTANTIAL ACHIEVEMENTS:</h4>
//              </Form.Label>
//              <Form.Control
// readOnly={data?.flag === true}
//                as={"textarea"}
//                {...register("other_sustainable_achievement")}
//                placeholder="OTHER SUBSTANTIAL ACHIEVEMENTS"
//                id="SUBSTANTIAL"
//                rows={6}
//              />
//            </Form.Group>
//          </Col>
//          <Col xs={12} sm={12} md={6} className="d-flex flex-column mb-4">
//            <Form.Group>
//              <Form.Label htmlFor="ISSUES">SIGNIFICANT ISSUES :</Form.Label>
//              <Form.Control
// readOnly={data?.flag === true}
//                as={"textarea"}
//                {...register("significant_issue")}
//                placeholder="SIGNIFICANT ISSUES"
//                id="ISSUES"
//                rows={6}
//              />
//            </Form.Group>
//          </Col>
//          <Col xs={12} sm={12} md={6} className="d-flex flex-column mb-4">
//            <Form.Group>
//              <Form.Label htmlFor="INDIVIDUAL">INDIVIDUAL'S COMMENTS :</Form.Label>
//              <Form.Control
// readOnly={data?.flag === true}
//                as={"textarea"}
//                {...register("individual_comment")}
//                placeholder="INDIVIDUAL'S COMMENTS"
//                id="INDIVIDUAL"
//                rows={6}
//              />
//            </Form.Group>
//          </Col>
//          <Col xs={12} sm={12} md={6} className="d-flex flex-column mb-4">
//            <Form.Group>
//              <Form.Label htmlFor="MANAGERS">MANAGERS COMMENTS :</Form.Label>
//              <Form.Control
// readOnly={data?.flag === true}
//                as={"textarea"}
//                {...register("manager_comment")}
//                placeholder="MANAGERS COMMENTS"
//                id="MANAGERS"
//                rows={6}
//              />
//            </Form.Group>
//          </Col>
//        </Row>
//        <Row className="mt-4">
//          <Col xs={12} sm={12} md={6} className="d-flex flex-column mb-4">
//            <Form.Group>
//              <Form.Label htmlFor="FUNCTIONAL">SENIOR MANAGER / FUNCTIONAL HEAD'S COMMENTS :</Form.Label>
//              <Form.Control
// readOnly={data?.flag === true}
//                as={"textarea"}
//                {...register("senior_manager_functional_head_comment")}
//                placeholder="SENIOR MANAGER / FUNCTIONAL HEAD'S COMMENTS"
//                id="FUNCTIONAL"
//                rows={6}
//              />
//            </Form.Group>
//          </Col>
//          <Col xs={12} sm={12} md={6} className="d-flex flex-column mb-4">
//            <Form.Group>
//              <Form.Label htmlFor="DIRECTOR">DIRECTOR AND CHIEF OPERATING OFFICER'S COMMENTS :</Form.Label>
//              <Form.Control
// readOnly={data?.flag === true}
//                as={"textarea"}
//                {...register("director_chief_operating_officer_comment")}
//                placeholder="DIRECTOR AND CHIEF OPERATING OFFICER'S COMMENTS :"
//                id="DIRECTOR"
//                rows={6}
//              />
//            </Form.Group>
//          </Col>
//        </Row>
//        <Row>
//          <Col xs={12} sm={12} md={12} className="d-flex flex-column mb-4">
//            <Form.Group>
//              <Form.Label htmlFor="OVERALL">OVERALL PERFORMANCE BASED ON ALL OF THE ABOVE RATING :</Form.Label>
//              <Form.Control
// readOnly={data?.flag === true}
//                as={"textarea"}
//                {...register("overall_performance")}
//                placeholder="OVERALL PERFORMANCE BASED ON ALL OF THE ABOVE RATING"
//                id="OVERALL"
//                rows={6}
//              />
//            </Form.Group>
//          </Col>
//        </Row>

//        <h3 className="mt-4">SIGNATURES TO ASSESSMENT :</h3>
//        <Row className="mt-6 justify-content-around">
//          <Col xs={12} sm={12} md={3} className="d-flex justify-content-center flex-column">
//            <hr style={{ color: "#000000" }} />
//            <span className="text-center mt-2">Individual Manager Function or SBU Head</span>
//          </Col>
//          <Col xs={12} sm={12} md={2} className="d-flex justify-content-center flex-column align-items-center">
//            <hr style={{ color: "#000000", width: "100%" }} />
//            <span className="text-center mt-2">Manager</span>
//          </Col>
//          <Col xs={12} sm={12} md={3} className="d-flex justify-content-center flex-column align-items-center">
//            <hr style={{ color: "#000000", width: "100%" }} />
//            <span className="text-center mt-2">Senior</span>
//          </Col>
//        </Row>
//      </Accordion.Body>
//    </Accordion.Item>
//  </Accordion>

// {isConfirm && (
//   <ConfirmDialog
//     message={"Are you sure you want to submit?"}
//     onOkButtonClick={() => {
//       handleSubmit(submitKpiPerformanceForm);
//     }}
//     onCancelButtonClick={(e) => setIsConfirm(false)}
//   />
// )}
