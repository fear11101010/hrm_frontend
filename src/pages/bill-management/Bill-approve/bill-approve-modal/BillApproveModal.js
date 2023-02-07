import React from "react";
import { Modal } from "react-bootstrap";

export default function BillApproveModal({ show, onHide, data }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Approve Bill</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
    </Modal>
  );
}
