import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ReactSelect from "react-select";
import { error_alert, success_alert } from "../../../../components/alert/Alert";
import ConfirmDialog from "../../../../components/confirm-dialog/ConfirmDialog";
import Loader from "../../../../components/loader/Loader";
import useDesignation from "../../../../hooks/useDesignation";
import useFetch from "../../../../hooks/useFetch";
import {
  KPI_PERMORMER_ASSESTMENT_INDIVIDUAL_GET,
  KPI_PERMORMER_ASSESTMENT_INDIVIDUAL_PUT,
} from "../../../../utils/routes/api_routes/API_ROUTES";
import { API } from "../../../../utils/axios/axiosConfig";
import { USER_INFO } from "../../../../utils/session/token";
import { _Decode, _Encrypt } from "../../../../utils/Hash";

export default function ProposedAmount({ rowId, afterSubmit }) {
  const id = rowId;
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);

  const { data, isLoading } = useFetch(KPI_PERMORMER_ASSESTMENT_INDIVIDUAL_GET(id));
  const designationList = useDesignation()?.map((d) => ({ label: d.designation, value: d.id }));

  //Form State
  const [propsed_by_sbuDirPmSelf, setPropsed_by_sbuDirPmSelf] = useState("");
  const [propsed_designation, setProposed_designation] = useState("");
  const [propsed_designation_id, setProposed_designation_id] = useState("");
  const [propsed_designation_new, setProposed_designation_new] = useState("");
  const [propsed_designation_new_id, setProposed_designation_new_id] = useState("");
  const [remarks1, setRemarks1] = useState("");
  const [remarks2, setRemarks2] = useState("");
  const [normalSubmit, setNormalSubmit] = useState(false);
  const [finalSubmit, setFinalSubmit] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [designationConfirm, setDesignationConfirm] = useState(false);

  // Getting current year
  const currYear = new Date().getFullYear();

  // FETCH ASSESTMENT DATA

  const getAssestmentData = () => {
    setLoading(true);
    API.get(KPI_PERMORMER_ASSESTMENT_INDIVIDUAL_GET(id))
      .then((res) => {
        if (res.data.statuscode === 200) {
          setPropsed_by_sbuDirPmSelf(_Decode(res.data.data?.proposed_by_sbu_director_pm_self));
          setProposed_designation(res.data.data?.employee?.designation);
          setProposed_designation_id(res.data.data?.employee?.desig_id);
          setProposed_designation_new(res.data.data?.employee?.designation);
          setProposed_designation_new_id(res.data.data?.employee?.desig_id);
          setRemarks1(res.data?.data?.remarks);
          setRemarks2(res.data?.data?.remarks_two);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Submit func
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      proposed_by_sbu_director_pm_self:
        propsed_by_sbuDirPmSelf === ""
          ? _Encrypt(data.data?.proposed_by_sbu_director_pm_self)
          : _Encrypt(propsed_by_sbuDirPmSelf),
      remarks: remarks1 === "" ? data.data?.remarks : remarks1,
      remarks_two: remarks2 === "" ? data.data?.remarks_two : remarks2,
      kpi_objective: data.data?.kpi_objective,
      kpi_value: data.data?.kpi_value,
      hr_rating: data.data?.hr_rating,
      criticality: data.data?.criticality,
      potential_for_improvement: data.data?.potential_for_improvement,
      technical_implementation_operational: data.data?.technical_implementation_operational,
      top_average_bottom_performer: data.data?.top_average_bottom_performer,
      best_performer_team: data.data?.best_performer_team,
      best_innovator_team: data.data?.best_innovator_team,
      best_performer_org: data.data?.best_performer_org,
      best_performer_pm: data.data?.best_performer_pm,
      confirmation_increment_noincrement: data.data?.confirmation_increment_noincrement,
      proposed_designation: designationConfirm ? propsed_designation_new : propsed_designation,
      proposed_designation_id: designationConfirm ? propsed_designation_new_id : propsed_designation_id,
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
        setIsConfirm(false);
      });
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsConfirm(true);
  };

  //Lifecycle
  useEffect(() => {
    getAssestmentData();
  }, []);

  if (!user?.accessibility?.includes("assessment_perf_review.retrieve")) {
    return (
      <>
        <h2 mb="b" className="text-center">
          UNAUTHORIZED
        </h2>
      </>
    );
  }

  return (
    <div>
      {isLoading && <Loader />}
      <Form onSubmit={handleConfirm}>
        <Row>
          <Col sm="12" md="12" className="mb-3">
            <Form.Label className="mb-1 text-dark">Proposed Designation {currYear}</Form.Label>
            <div className="d-flex justify-content-between">
              <div className="me-4" style={{ width: "70%" }}>
                <ReactSelect
                  options={designationList}
                  placeholder={
                    propsed_designation_id !== "" &&
                    designationList?.map((d) => (d.value === propsed_designation_id ? d.label : null))
                  }
                  onChange={(e) => {
                    // setProposed_designation(e.value);
                    setProposed_designation_new(e.label);
                    setProposed_designation_new_id(e.value);
                  }}
                />
              </div>
              <div style={{ width: "30%" }}>
                <Form.Check
                  type={"checkbox"}
                  label={`Confirm`}
                  id={`confirm-designation`}
                  className="fw-bold"
                  onChange={() => {
                    setDesignationConfirm(!designationConfirm);
                  }}
                />
              </div>
            </div>
          </Col>

          <Col sm="12" md="12" className="mb-3">
            <Form.Label className="mb-2 text-dark">Proposed Amount By Director {currYear} (C) </Form.Label>
            <Form.Control
              type="text"
              value={propsed_by_sbuDirPmSelf === "" ? propsed_by_sbuDirPmSelf : propsed_by_sbuDirPmSelf}
              onChange={(e) => {
                setPropsed_by_sbuDirPmSelf(e.target.value);
              }}
            />
          </Col>
          <Col sm="12" md="12" className="mb-3">
            <Form.Label className="mb-2 text-dark">Remarks </Form.Label>
            <Form.Control
              as={"textarea"}
              rows={6}
              type="text"
              value={remarks1 === "" ? data.data?.remarks : remarks1}
              onChange={(e) => {
                setRemarks1(e.target.value);
              }}
            />
          </Col>

          {/* REMARKS2 but it is showing as remarks */}
          {/* <Col sm="12" md="12" className="mb-3">
            <Form.Label className="mb-2 text-dark">Remarks </Form.Label>
            <Form.Control
              type="text"
              value={remarks2 === "" ? remarks2 : remarks2}
              onChange={(e) => {
                setRemarks2(e.target.value);
              }}
            />
          </Col> */}

          <Col sm="12" md="12" className="mt-3 d-flex justify-content-between">
            {/* <Button
              type="submit"
              variant="light"
              className="fw-bold"
              onClick={() => {
                setNormalSubmit(true);
                setFinalSubmit(false);
              }}
            >
              Draft Save
            </Button> */}
            {user.group_id.split(",").map(
              (d) =>
                (d === "11" || d === "7") &&
                user.accessibility.includes("performer_assessment.update") && (
                  <Button
                    type="submit"
                    className="ms-2"
                    onClick={() => {
                      setFinalSubmit(true);
                      setNormalSubmit(false);
                    }}
                  >
                    Confirm Submit
                  </Button>
                )
            )}

            {isConfirm && (
              <ConfirmDialog
                message={"Are you sure you want to submi?"}
                onOkButtonClick={handleSubmit}
                onCancelButtonClick={(e) => setIsConfirm(false)}
              />
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}
