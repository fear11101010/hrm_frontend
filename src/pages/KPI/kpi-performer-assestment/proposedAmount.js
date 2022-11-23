import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { error_alert, success_alert } from "../../../components/alert/Alert";
import ConfirmDialog from "../../../components/confirm-dialog/ConfirmDialog";
import Loader from "../../../components/loader/Loader";
import useFetch from "../../../hooks/useFetch";
import { KPI_PERMORMER_ASSESTMENT_INDIVIDUAL_GET, KPI_PERMORMER_ASSESTMENT_INDIVIDUAL_PUT } from "../../../utils/API_ROUTES";
import { API } from "../../../utils/axios/axiosConfig";
import { USER_INFO } from "../../../utils/session/token";

export default function ProposedAmount({ rowId, afterSubmit }) {
  const id = rowId;
  const user = USER_INFO();
  const { data, isLoading } = useFetch(KPI_PERMORMER_ASSESTMENT_INDIVIDUAL_GET(id));

  const [loading, setLoading] = useState(false);

  //Form State
  const [propsed_by_sbuDirPmSelf, setPropsed_by_sbuDirPmSelf] = useState("");
  const [remarks1, setRemarks1] = useState("");
  const [remarks2, setRemarks2] = useState("");
  const [normalSubmit, setNormalSubmit] = useState(false);
  const [finalSubmit, setFinalSubmit] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  // Getting current year
  const currYear = new Date().getFullYear();

  // Submit func
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      proposed_by_sbu_director_pm_self:
        propsed_by_sbuDirPmSelf === "" ? data.data?.proposed_by_sbu_director_pm_self : propsed_by_sbuDirPmSelf,
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
      proposed_designation: data.data?.proposed_designation,
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
      <Form onSubmit={handleConfirm}>
        <Row>
          <Col sm="12" md="12" className="mb-3">
            <Form.Label className="mb-2 text-dark">Proposed By SBU Director/PM/Self {currYear} (C) </Form.Label>
            <Form.Control
              type="text"
              value={propsed_by_sbuDirPmSelf === "" ? data.data?.proposed_by_sbu_director_pm_self : propsed_by_sbuDirPmSelf}
              onChange={(e) => {
                setPropsed_by_sbuDirPmSelf(e.target.value);
              }}
            />
          </Col>
          <Col sm="12" md="12" className="mb-3">
            <Form.Label className="mb-2 text-dark">Remarks </Form.Label>
            <Form.Control
              type="text"
              value={remarks1 === "" ? data.data?.remarks : remarks1}
              onChange={(e) => {
                setRemarks1(e.target.value);
              }}
            />
          </Col>
          <Col sm="12" md="12" className="mb-3">
            <Form.Label className="mb-2 text-dark">Remarks 2</Form.Label>
            <Form.Control
              type="text"
              value={remarks2 === "" ? data.data?.remarks_two : remarks2}
              onChange={(e) => {
                setRemarks2(e.target.value);
              }}
            />
          </Col>

          <Col sm="12" md="12" className="mt-3 text-end">
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
            {user.group_id.split(",").map(
              (d) =>
                d === "1" && (
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
