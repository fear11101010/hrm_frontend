import React from "react";
import { Modal } from "react-bootstrap";
import ConveyanceDetail from "./ConveyanceDetail";

export default function DetailsModal({ show, onHide, id }) {
  return (
    <Modal size="xl" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="mb-0">Conveyance Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ConveyanceDetail id={id} />
      </Modal.Body>
    </Modal>
  );
}
