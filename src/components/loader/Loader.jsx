import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Lottie from "lottie-react";
import loadingFile from "./loading.json";

export default function Loader() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Modal show={show} size="sm" centered>
        <Modal.Body className="m-auto">
          {/* <div className="d-flex justify-content-center">
          <Spinner animation="border" />
          <h2 className="mb-0 mt-3 text-center">Loading...</h2>
          </div> */}
          <Lottie animationData={loadingFile} style={{ width: "200px", margin: "auto" }} />
        </Modal.Body>
      </Modal>
    </>
  );
}
