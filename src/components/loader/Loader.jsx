import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export default function Loader() {
  const [show, setShow] = useState(true);

  return (
    <Modal show={show} size="sm" centered>
      <Modal.Body className="m-auto">
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
        <h2 className="mb-0 mt-3">Loading...</h2>
      </Modal.Body>
    </Modal>
  );
}
