import React from "react";
import { Modal } from "react-bootstrap";
import InvoiceTemplate from "./InvoiceTemplate";

export default function Invoice({ onShow, onHide, data }) {
  return (
    <Modal size="xl" show={onShow} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="mb-0">
          <h3 className="mb-0">Invoice</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-white p-0">
        <InvoiceTemplate invoice_id={data} />
      </Modal.Body>
    </Modal>
  );
}
