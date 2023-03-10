import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ReactSelect from "react-select";
import { error_alert, success_alert } from "../../../../components/alert/Alert";
import { API } from "../../../../utils/axios/axiosConfig";
import { STATUS_CHANGE_API } from "../../../../utils/routes/api_routes/BILL_API_ROUTES";
import { USER_INFO } from "../../../../utils/session/token";
import { BILL_STATUS } from "../../BILL_STATUS";

export default function UpdateStatusModal({ show, onHide, remarks, id, forwaredTo, status }) {
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);
  const [statusTo, setStatusTo] = useState(status);
  const [employee_list, setEmployee_list] = useState([]);
  const [checker_forward_list, setChecker_forward_list] = useState([]);
  const [employee_name, setEmployee_name] = useState(forwaredTo);
  const [comment, setComment] = useState("");

  console.log(forwaredTo);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const res = await API.get("user_dropdown/");
      let filtered = res?.data?.data?.filter((d) => d?.group.includes("11") || d?.group.includes("13"));
      let checker_filtered = res?.data?.data?.filter((d) => d?.group.includes("6"));
      let formattedEmployeeList = filtered?.map((d) => ({
        label: d?.username,
        value: d?.id,
      }));
      let formattedCheckerList = checker_filtered?.map((d) => ({
        label: d?.username,
        value: d?.id,
      }));
      setEmployee_list(formattedEmployeeList);
      setChecker_forward_list(formattedCheckerList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setStatusTo(status);
    setEmployee_name(forwaredTo);
    setComment(remarks);
  }, [forwaredTo, status, remarks]);

  useEffect(() => {
    if (statusTo === 3 || statusTo === 5) {
      fetchEmployee();
    }
  }, [statusTo === 3, statusTo === 5]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      conveyance_id: id,
      status_id: statusTo === "" ? status : statusTo,
      // comments: comment,
      comments: "",
      convyance_message: comment,
    };
    const forwardPayload = {
      forward_to: employee_name,
    };

    try {
      setLoading(true);
      let res = await API.post(
        STATUS_CHANGE_API,
        statusTo === 3 || statusTo === 5 ? { ...forwardPayload, ...payload } : payload
      );
      if (res?.data?.statuscode === 200) {
        success_alert(res?.data?.message);
        onHide();
        setStatusTo("");
        setEmployee_name("");
        setComment("");
      } else {
        error_alert("ERROR! " + res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        setStatusTo("");
        setEmployee_name("");
        setComment("");
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="mb-0">Update Conveyance Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label>Change Status To</Form.Label>
            <ReactSelect
              options={BILL_STATUS}
              onChange={(e) => {
                setStatusTo(e.value);
                setEmployee_name("");
              }}
              placeholder={BILL_STATUS?.map((d) => d.value === statusTo && d.label)}
            />
          </Form.Group>
          {statusTo === 3 && (
            <Form.Group className="mb-3">
              <Form.Label>Forward To</Form.Label>
              <ReactSelect
                options={
                  user?.user_id === forwaredTo?.id
                    ? [
                        {
                          label: "Approved",
                          value: 2,
                        },
                        {
                          label: "Rejected",
                          value: 4,
                        },
                      ]
                    : employee_list
                }
                onChange={(e) => {
                  setEmployee_name(e.value);
                }}
                placeholder={employee_list?.map((d) => d?.value === employee_name && d?.label)}
              />
            </Form.Group>
          )}
          {statusTo === 5 && (
            <Form.Group className="mb-3">
              <Form.Label>Forward To</Form.Label>
              <ReactSelect
                options={
                  user?.user_id === forwaredTo?.id
                    ? [
                        {
                          label: "Check Approved",
                          value: 6,
                        },
                      ]
                    : checker_forward_list
                }
                onChange={(e) => {
                  setEmployee_name(e.value);
                }}
                placeholder={checker_forward_list?.map((d) => d?.value === employee_name && d?.label)}
              />
            </Form.Group>
          )}
          {/* <Form.Group className="mb-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </Form.Group> */}
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
