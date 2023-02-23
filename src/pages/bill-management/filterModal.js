import React from "react";
import { Modal } from "react-bootstrap";

export default function FilterModal({ name, show, onHide, children }) {
  return (
    <Modal size="lg" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="mb-0">Filter Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
