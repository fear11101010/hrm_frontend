import React from "react";
import { Button, Card, Col, Image, Modal, Row } from "react-bootstrap";
import { FaDownload, FaFileExcel, FaFilePdf } from "react-icons/fa";
import { BASE_URL_FOR_MEDIA_FILE } from "../../../utils/CONSTANT";

export default function ViewFileModal({ data, show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} aria-labelledby="file-modal">
      <Modal.Header closeButton>
        <Modal.Title className="mb-0" id="file-modal">
          <h3 className="mb-0">Attached Files</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between mb-5">
          <div>
            <h4 className="mb-1 text-secondary">Employee Name:</h4>
            <h4 className="mb-0">{data?.employee_name}</h4>
          </div>
          <div>
            <h4 className="mb-1 text-secondary">Invoice Code:</h4>
            <h4 className="mb-0">{data?.invoice_code}</h4>
          </div>
        </div>
        {data?.attach_files?.length === 0 && (
          <div className="bg-light px-2 py-4 rounded">
            <h2 className="mb-0 text-center text-muted"> No attachment found </h2>
          </div>
        )}
        {data?.attach_files?.map((d) => (
          <Card className="shadow-sm border mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  {d?.main_img?.split(".")[1] === "pdf" ? (
                    <a href={BASE_URL_FOR_MEDIA_FILE + d?.main_img} target="#">
                      <FaFilePdf size={34} />
                    </a>
                  ) : d?.main_img?.split(".")[1] === "xls" || d?.main_img?.split(".")[1] === "xlsx" ? (
                    <a href={BASE_URL_FOR_MEDIA_FILE + d?.main_img} target="#">
                      <FaFileExcel size={34} />
                    </a>
                  ) : (
                    <a href={BASE_URL_FOR_MEDIA_FILE + d?.main_img} target="#">
                      <Image className="mb-2" src={BASE_URL_FOR_MEDIA_FILE + d?.main_img} height="34px" />
                    </a>
                  )}
                  <h5 className=" mt-1 mb-0">{d?.main_img?.split("/")[1]}</h5>
                </div>
                <div>
                  <a href={BASE_URL_FOR_MEDIA_FILE + d?.main_img} target="#">
                    <Button size="sm" variant="primary" title="Download" className="d-flex mt-2 py-2">
                      <FaDownload style={{ marginRight: "4px" }} /> <h5 className="mb-0">Download</h5>
                    </Button>
                  </a>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Modal.Body>
    </Modal>
  );
}
