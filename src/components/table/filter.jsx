import React, { useState } from "react";
import { Button, Dropdown, Form, Modal, Offcanvas } from "react-bootstrap";

export default function Filter({ children, onClick, show, onHide }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="text-end">
        <Button variant="light" className="fw-bold" onClick={onClick}>
          <i className="fe fe-sliders"></i> Filter
        </Button>
      </div>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <h2 className="mb-0">Filters</h2>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>

      {/* <Offcanvas
        show={isOpen}
        onHide={() => {
          setIsOpen(false);
        }}
        placement={"end"}
        scroll={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="mb-0">
            <h2 className="mb-0 px-3">Filters</h2>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="h-100">{children}</Offcanvas.Body>
      </Offcanvas> */}

      {/* <Dropdown className="text-end" align="end" autoClose={autoClose}>
        <Dropdown.Toggle size="sm" variant="light" id="dropdown-basic" className="fw-bold">
          <i className="fe fe-sliders"></i> Filter
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ minWidth: "300px" }}>
          <div className="">
            <h2 className="mb-0 px-3">Filters</h2>
            <hr className="mt-2" />
          </div>
          <div className="px-3">{children}</div>
        </Dropdown.Menu>
      </Dropdown> */}
    </>
  );
}
