import {useParams} from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import {FETCH_TICKET_BY_ID_API, REQUEST_STATUS_LOG_API} from "../../../utils/routes/api_routes/SP_API_ROUTES";
import React, {useEffect, useState} from "react";
import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import {Button, Card, Col, Modal, Row} from "react-bootstrap";
import Loader from "../../../components/loader/Loader";
import DOMPurify from 'dompurify';
import moment from "moment";
import {API, API_MEDIA} from "../../../utils/axios/axiosConfig";
import {BASE_URL_FOR_MEDIA_FILE} from "../../../utils/CONSTANT";
import {FaDownload} from "react-icons/fa";
import {getStatus, loadFileInfo} from "../../../utils/helper";

function ViewTicketDetail({id,show,handleClose}) {
    const {data} = useFetch(FETCH_TICKET_BY_ID_API(id))
    const statusLog = useFetch(REQUEST_STATUS_LOG_API(id))
    const [ticketDetail, setTicketDetail] = useState({});
    useEffect(() => {
        console.log(show)
        async function loadFile() {
            const td = data?.data;
            for(let i=0; i<td.attachment?.length;i++){

                const f = td.attachment[i];
                const file = await loadFileInfo(f.attachment_name);
                td.attachment[i] = {...f,...file}
            }
            console.log(td);
            setTicketDetail(td)
        }
        if (data && data?.data) {
            loadFile();
        }
    }, [data])
    useEffect(()=>{
        if(statusLog?.data?.data){

        }
    },[statusLog])
    const sanitizeHtml = (data) => ({
        __html: DOMPurify.sanitize(data)
    })

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{ticketDetail?.ticket_no}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="w-100 m-auto">
                        <Card>
                            <Card.Body>
                                <Row className="mb-2">
                                    <Col sm="12" md="6" lg="6">
                                        <h6 className="header-pretitle mb-2">Issue Type</h6>
                                        <p>{ticketDetail?.issue_type?.name}</p>
                                    </Col>
                                    <Col sm="12" md="6" lg="6">
                                        <h6 className="header-pretitle mb-2">Request Type</h6>
                                        <p>{ticketDetail?.request_type?.name}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm="12" md="12" lg="12">
                                        <h6 className="header-pretitle mb-2">Request Heading</h6>
                                        <p>{ticketDetail?.heading}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm="12" md="12" lg="12">
                                        <h6 className="header-pretitle mb-2">Request Detail</h6>
                                        <div dangerouslySetInnerHTML={sanitizeHtml(ticketDetail?.detail)}></div>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm="12" md="6" lg="6">
                                        <h6 className="header-pretitle mb-2">Ticket Create Date</h6>
                                        <p>{ticketDetail?.occurring_date ? moment(ticketDetail?.occurring_date).format('DD MMM, YYYY') : ''}</p>
                                    </Col>
                                    <Col sm="12" md="6" lg="6">
                                        <h6 className="header-pretitle mb-2">Request Priority</h6>
                                        <p>{ticketDetail?.priority?.name}</p>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm="12" md="12" lg="12">
                                        <h6 className="header-pretitle mb-2">Attachments</h6>
                                        <ul style={{margin:0,padding:0}}>
                                            {ticketDetail?.attachment?.map((file, i) => (
                                                <li key={i} className="list-group-item dz-processing">
                                                    <div className="row align-items-center">
                                                        <div className="col-auto">{i + 1}.</div>
                                                        <div className="col ms-n3">
                                                            <h5 className="mb-1" data-dz-name="">{file.fileName}</h5>
                                                            <small className="text-muted"
                                                                   data-dz-size=""><strong>{file.size}</strong></small>
                                                        </div>
                                                        <div className="col-auto">
                                                            <a className="btn btn-light btn-sm" href={file.href} download={file.fileName}>
                                                                <FaDownload/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                            {ticketDetail?.attachment?.length<=0 && (
                                                <li key={`status_log_no_available`} className="list-group-item dz-processing">
                                                    <div className="row align-items-center justify-content-center">
                                                        <div className="col-auto">
                                                            No Attachment Available
                                                        </div>
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </Col>
                                </Row>

                                <Row className="mb-2">
                                    <Col sm="12" md="12" lg="12">
                                        <h6 className="header-pretitle mb-2">Status Log</h6>
                                        <ul style={{margin:0,padding:0}}>
                                            {statusLog?.data?.data?.map((log, i) => (
                                                <li key={`status_log_${log?.id}`} className="list-group-item dz-processing">
                                                    <div className="row align-items-center">
                                                        <div className="col-auto">{i + 1}.</div>
                                                        <div className="col ms-n3">
                                                            <h5 className="mb-1" data-dz-name="">
                                                                {log?.from_request_status&&
                                                                    <span className={`badge ${getStatus(log?.from_request_status)} me-3`}>
                                                                        {log?.from_request_status_name}
                                                                    </span>
                                                                }
                                                                to
                                                                {
                                                                    log?.request_status&&<span className={`badge ${getStatus(log?.request_status)} ms-3`}>{log?.request_status_name}</span>
                                                                }
                                                            </h5>
                                                            <small className="text-muted" data-dz-size=""><strong>{log?.comments}</strong></small>

                                                        </div>
                                                        <div className="col-auto">
                                                            <small>Changed by <strong>{log?.user_name}</strong></small>
                                                                <br/>
                                                            <small>at {moment(log?.created_at).format('DD MMM, YYYY')}</small>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                            {statusLog?.data?.data?.length<=0 && (
                                                <li key={`status_log_no_available`} className="list-group-item dz-processing">
                                                    <div className="row align-items-center justify-content-center">
                                                        <div className="col-auto">
                                                            No Log Available For This Ticket
                                                        </div>
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default ViewTicketDetail