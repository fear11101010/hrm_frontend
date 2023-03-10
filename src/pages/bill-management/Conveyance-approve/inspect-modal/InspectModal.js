import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { FaReply } from "react-icons/fa";
import { error_alert, success_alert } from "../../../../components/alert/Alert";
import Loader from "../../../../components/loader/Loader";
import { API } from "../../../../utils/axios/axiosConfig";
import { BASE_URL_FOR_MEDIA_FILE } from "../../../../utils/CONSTANT";
import { CONVEYANCE_EACH_GET_API } from "../../../../utils/routes/api_routes/BILL_API_ROUTES";

export default function InspectModal({ show, onHide, id }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [msgData, setMsgData] = useState([]);
  const [showMsgBox, setShowMsgBox] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (id !== "") {
      setLoading(true);
      API.get(CONVEYANCE_EACH_GET_API(id))
        .then((res) => {
          if (res.data.statuscode === 200) {
            setData(res?.data);
            let a = res?.data?.conveyance?.map((d) => d?.status);
            setStatus(a[0]);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));

      setLoading(true);
      API.get(`invoice/${id}/bill_message_conveyance/`)
        .then((res) => {
          if (res.data.statuscode === 200) {
            setMsgData(res?.data?.data);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
      setLoading(true);
    }
  }, [id]);

  const submit = (e) => {
    e.preventDefault();
    let payload = {
      conveyance_message: true,
      message: msg,
    };
    setLoading(true);
    API.post(`invoice/${id}/bill_message/`, payload)
      .then((res) => {
        console.log(res.data);
        if (res?.data?.statuscode === 200) {
          success_alert(res?.data?.message);
          onHide();
          setMsg("");
        } else {
          error_alert(res?.data?.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => {
        onHide();
        setShowMsgBox(false);
        setMsg("");
      }}
    >
      {loading && <Loader />}
      <Form onSubmit={submit}>
        <Modal.Header closeButton>
          <Modal.Title className="mb-0">Inspect Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          {status === 2 && (
            <div className="py-2 text-center">
              <h3>This bill has been Approved </h3>
            </div>
          )}
          {status === 4 && (
            <div className="py-2 text-center">
              <h3>This bill has been Rejected </h3>
            </div>
          )}
          {/* Latest MSG */}
          {msgData.length === 0 && (
            <>
              {status === 2 || status === 4 ? (
                ""
              ) : (
                <Card className="border">
                  <Card.Body>
                    <Form.Group>
                      <>
                        <Form.Label className="mb-2">Message</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(e) => setMsg(e.target.value)} value={msg} />
                      </>
                    </Form.Group>
                  </Card.Body>
                </Card>
              )}
            </>
          )}

          {/* Previous MSG */}
          {msgData?.map((d, i) => (
            <Card className="border">
              <Card.Body>
                <div className="mb-3">
                  <Form.Label className="mb-0">From: {d?.sender?.username} </Form.Label>
                </div>
                {/* <div className="mb-3">
                <Form.Label className="mb-0">To: </Form.Label>
              </div> */}
                <div className="mb-3">
                  <Form.Label className="mb-0">Message: </Form.Label>
                  <p className="mb-0">{d?.message}</p>
                </div>
                {i === 0 && (
                  <>
                    <div className="mb-3 text-end">
                      {status !== 2 && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setShowMsgBox(true);
                          }}
                        >
                          <FaReply /> Reply
                        </Button>
                      )}
                    </div>
                    {showMsgBox && (
                      <Form.Group>
                        <Form.Label className="mb-2">Message</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(e) => setMsg(e.target.value)} value={msg} />
                        <Button size="sm" className="mt-2" type="submit">
                          Submit
                        </Button>
                      </Form.Group>
                    )}
                  </>
                )}
              </Card.Body>
            </Card>
          ))}
          {/* Attached Files */}
          <Card className="border">
            <Card.Header>
              <h3 className="mb-0">Attached Files</h3>
            </Card.Header>
            <Card.Body>
              <Row>
                {data?.files?.map((d) => (
                  <Col md={6} className="mb-3">
                    <div className="p-3 border rounded d-flex justify-content-between align-items-center">
                      <h4 className="mb-0"> {d?.main_img?.split("/")[1]} </h4>
                      <a href={BASE_URL_FOR_MEDIA_FILE + d?.main_img} target="_" download>
                        <Button variant="info" size="sm">
                          <i className="fe fe-download"></i> Download
                        </Button>
                      </a>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          {status === 2 || status === 4 || msgData.length !== 0 ? "" : <Button type="submit">Submit</Button>}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
