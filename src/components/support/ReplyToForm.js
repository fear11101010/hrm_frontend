import {
    APPROVE_REQUEST_API,
    FETCH_TICKET_BY_ID_API,
    REQUEST_MESSAGE_REPLY_API
} from "../../utils/routes/api_routes/SP_API_ROUTES";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, Modal, Row, Spinner} from "react-bootstrap";
import {FaCheck, FaDownload, FaReply, FaTrash, FaWindowClose} from "react-icons/fa";
import {API} from "../../utils/axios/axiosConfig";
import {error_alert, success_alert} from "../alert/Alert";
import useRequestTo from "../../hooks/support/useRequestTo";
import useFetch from "../../hooks/useFetch";
import {USER_INFO} from "../../utils/session/token";
import {loadFileInfo} from "../../utils/helper";
import moment from "moment";
import FileDropZone from "../FileDropZone";

function ReplyToForm({id, show, handleClose}) {
    // console.log(USER_INFO())
    const userInfo = USER_INFO();
    const {data} = useFetch(FETCH_TICKET_BY_ID_API(id));
    const [ticketDetail, setTicketDetail] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isApproving, setIsApproving] = useState(false)
    const [showReplyMessageBox, setShowReplyMessageBox] = useState(false)
    const [showForwardMessageBox, setShowForwardMessageBox] = useState(false)
    const [files, setFiles] = useState([])
    const forwardToList = useRequestTo()?.map(status => ({label: status.name, value: status.id}));
    const {register, reset, handleSubmit, formState: {errors}, control} = useForm({
        defaultValues: {
            request_detail: id,
            request_group_message: id,
            query_message: ''
        }
    });
    useEffect(() => {
        async function loadFile() {
            const td = data?.data;
            for (let i = 0; i < td?.message_details?.messages?.length; i++) {
                for (let j = 0; j < td.message_details?.messages[i]?.message_attachment?.length; j++) {
                    const f = td.message_details?.messages[i].message_attachment[j];
                    const file = await loadFileInfo(f);
                    td.message_details.messages[i].message_attachment[j] = {...file}
                }

            }
            console.log(td);
            setTicketDetail(td)
        }

        if (data) {
            console.log(userInfo)
            loadFile();
            reset({
                request_group_message: data.data?.message_details?.message_group?.id,
                request_detail: id
            })
            console.log(ticketDetail)

        }
    }, [data])
    const onDropFile = acceptedFiles => {
        console.log(acceptedFiles)
        setFiles(files => [...files, ...acceptedFiles])
    }
    const removeFile = (e, i) => {
        e.preventDefault();
        e.stopPropagation();
        setFiles(files => {
            const f = [...files];
            f.splice(i, 1)
            return f;
        })
    }

    function submitRequest(data, event) {
        setIsSubmitting(true);
        console.log(data)
        const formData = Object.entries(data).reduce((fd, [key, value]) => {
            fd.append(key, value);
            return fd;
        }, new FormData())
        files.forEach((attachment, i) => {
            formData.append(`msg_attachments`, attachment);
        });
        API.post(REQUEST_MESSAGE_REPLY_API, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(res => {
            success_alert("Message send successfully");
            handleClose('')
        }).catch(err => {
            error_alert(err?.data?.msg ?? 'An error occur while updating status. Please try again later')
        }).finally(() => {
            setIsSubmitting(false)
        })
    }

    function approveRequest(e) {
        e.stopPropagation();
        e.preventDefault();
        setIsApproving(true)
        API.get(APPROVE_REQUEST_API(id)).then(res => {
            success_alert("Request has been approved.")
            handleClose(false)
        }).catch(err => {
            error_alert("An error occur while approving request. Please try again later.")
            handleClose(false)
        }).finally(() => {
            setIsApproving(false)
        })
    }

    return (
        <>
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
                            {ticketDetail?.message_details?.messages?.map((message, i) => {
                                return (
                                    <>
                                        <Card>
                                        <Card.Body>
                                            <div>
                                                <h4 className="mb-1 d-flex justify-content-between">
                                                <span
                                                    className="text text-info">Form: {message.user.name} ({message.user.group})</span>
                                                    {i > 0 && (
                                                        <small className="header-pretitle"
                                                               style={{fontSize: 'x-small'}}>{moment(message.created_at).format('DD MMM, YYYY')}</small>
                                                    )}
                                                </h4>
                                                {i === 0 && (
                                                    <h6 className="header-pretitle mb-4 d-flex justify-content-between">
                                                        to: {ticketDetail?.message_details?.message_group.receiver}
                                                        <span>{moment(message.created_at).format('DD MMM, YYYY')}</span>
                                                    </h6>)}
                                                <div className={`mb-4 ${i > 0 ? 'mt-4' : ''}`}>
                                                    <h6 className="header-pretitle mb-2 text text-primary">Message</h6>
                                                    <p>{message.query_message}</p>
                                                </div>
                                                <h6 className="header-pretitle mb-2 text text-success">Attachments</h6>
                                                <ul style={{margin: 0, padding: 0}}>
                                                    {message?.message_attachment?.length <= 0 && (
                                                        <li className="list-group-item dz-processing">No attachments
                                                            available</li>
                                                    )}
                                                    {message?.message_attachment?.map((file, i) => (
                                                        <li key={i} className="list-group-item dz-processing">
                                                            <div className="row align-items-center">
                                                                <div className="col-auto">{i + 1}.</div>
                                                                <div className="col ms-n3">
                                                                    <h5 className="mb-1"
                                                                        data-dz-name="">{file.fileName}</h5>
                                                                    <small className="text-muted"
                                                                           data-dz-size=""><strong>{file.size}</strong></small>
                                                                </div>
                                                                <div className="col-auto">
                                                                    <a className="btn btn-light btn-sm" href={file.href}
                                                                       download={file.fileName}>
                                                                        <FaDownload/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                {(i === 0 && !ticketDetail?.approve_status) && (
                                                    <div className="d-flex justify-content-end mt-4 mb-4">
                                                        <Button variant="primary" disabled={isApproving || isSubmitting}
                                                                size="sm" onClick={e => setShowReplyMessageBox(true)}>
                                                            <FaReply/> Reply
                                                        </Button>
                                                        {
                                                            userInfo?.group_id?.split(',').map(g => parseInt(g)).indexOf(ticketDetail?.message_details?.message_group?.receiver_group_id) >= 0 && (
                                                                <Button variant="primary"
                                                                        disabled={isApproving || isSubmitting}
                                                                        size="sm" style={{marginLeft: '10px'}}
                                                                        onClick={approveRequest}>
                                                                    {isApproving ? <Spinner size="sm" animation="border"/> :
                                                                        <FaCheck/>} Approve Request
                                                                </Button>
                                                            )
                                                        }

                                                    </div>
                                                )}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                        {showReplyMessageBox && i===0 && <Form onSubmit={handleSubmit(submitRequest)}>
                                            <Card>
                                                <Card.Body>
                                                    <Row className="mb-2">
                                                        <Col sm={12} md={12} lg={12} xl={12} className="m-auto">
                                                            <Form.Group>
                                                                <Form.Label>Messages</Form.Label>
                                                                <Form.Control as="textarea" rows={5} {...register('query_message')}
                                                                              placeholder="Please enter message"/>
                                                                {/*{errors?.heading && (<div className="invalid-feedback">Enter request heading</div>)}*/}
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-2">
                                                        <Col sm={12} md={12} lg={12} xl={12} className="m-auto">
                                                            <Form.Group>
                                                                <Form.Label>Upload Attachment</Form.Label>
                                                                <FileDropZone multiple onFileSelect={onDropFile}/>
                                                                <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush">
                                                                    {files.map((file, i) => (
                                                                        <li key={`pre-${i}`}
                                                                            className="list-group-item dz-processing">
                                                                            <div className="row align-items-center">
                                                                                <div className="col-auto"></div>
                                                                                <div className="col ms-n3">
                                                                                    <h4 className="mb-1"
                                                                                        data-dz-name="">{file.name}</h4>
                                                                                    <small className="text-muted"
                                                                                           data-dz-size=""><strong>{Math.ceil(file.size / 1024)}</strong>KB</small>
                                                                                </div>
                                                                                <div className="col-auto">
                                                                                    <button className="btn btn-light btn-sm"
                                                                                            onClick={e => removeFile(e, i)}>
                                                                                        <FaTrash/>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mt-4">
                                                        <Col sm={12} md={12} lg={12} xl={12} className="m-auto">
                                                            <div className="mt-2 text-end">
                                                                <Button type="submit" name="submit" disabled={isSubmitting}
                                                                        variant="primary"
                                                                        style={{marginRight: "10px", lineHeight: 1}}>
                                                                    {isSubmitting && <Spinner size="sm" animation="border"/>} Send
                                                                </Button>
                                                                <Button disabled={isSubmitting} variant="secondary"
                                                                        onClick={handleClose} style={{lineHeight: 1}}>
                                                                    <FaWindowClose/> Cancel
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Form>}
                                    </>

                                )
                            })}

                        </div>
                    </Modal.Body>
                </Modal>

            </>

        </>
    )
}

export default ReplyToForm