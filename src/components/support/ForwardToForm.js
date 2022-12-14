import {
    FETCH_TICKET_BY_ID_API,
    REQUEST_MESSAGE_SEND_API,
    REQUEST_STATUS_UPDATE_API
} from "../../utils/support/SP_API_ROUTES";
import {Controller, useForm} from "react-hook-form";
import React, {useCallback, useState} from "react";
import {Button, Card, Col, Form, Modal, Row, Spinner} from "react-bootstrap";
import Select from "../select/Select";
import {FaTrash, FaWindowClose} from "react-icons/fa";
import {API} from "../../utils/axios/axiosConfig";
import {error_alert, success_alert} from "../alert/Alert";
import useRequestTo from "../../hooks/support/useRequestTo";
import {useDropzone} from "react-dropzone";
import useFetch from "../../hooks/useFetch";
import {USER_INFO} from "../../utils/session/token";

function ForwardToForm({id, show, handleClose}) {
    // console.log(USER_INFO())
    const userInfo = USER_INFO();
    const {data} = useFetch(FETCH_TICKET_BY_ID_API(id));
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [files, setFiles] = useState([])
    const forwardToList = useRequestTo()?.map(status => ({label: status?.name, value: status?.auth_user}));
    const {register, reset, handleSubmit, formState: {errors}, control} = useForm({
        defaultValues: {
            request_detail:id,
            sender_group:userInfo?.group_id?.split(',').map(g=>parseInt(g)).find(v=>v===1 || v === 7),
            receiver_group:''
        }
    });
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        setFiles(files => [...files, ...acceptedFiles])
    }, [])
    const removeFile = (e, i) => {
        e.preventDefault();
        e.stopPropagation();
        setFiles(files => {
            const f = [...files];
            f.splice(i, 1)
            return f;
        })
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    function submitRequest(data, event) {
        setIsSubmitting(true);
        console.log(data)
        const formData = Object.entries(data).reduce((fd, [key, val]) => {
            fd.append(key, val);
            return fd;
        }, new FormData())
        formData.append('msg',JSON.stringify({query_message:data?.comments}))
        files.forEach((v, i) => {
            formData.append(`msg_attachments`, v);
            console.log(v)
        });
        console.log(...formData)
        console.log(formData.get('msg'))
        console.log(formData.getAll('msg'))
        API.post(REQUEST_MESSAGE_SEND_API, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(res => {
            success_alert("Request status updated successfully")
            handleClose('')
        }).catch(err => {
            error_alert(err?.data?.msg ?? 'An error occur while updating status. Please try again later')
        }).finally(() => {
            setIsSubmitting(false)
        })
    }

    return (
            <>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{data?.data?.ticket_no}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="w-100 m-auto">
                            <Form onSubmit={handleSubmit(submitRequest)}>
                                <Card>
                                    <Card.Body>
                                        <Row className="mb-2">
                                            <Col sm={12} md={12} lg={12} xl={12} className="m-auto">
                                                <Form.Group>
                                                    <Form.Label>Forward To</Form.Label>
                                                    <Controller
                                                        name="receiver_group"
                                                        control={control}
                                                        rules={{required: true}}
                                                        render={({
                                                                     field: {onChange, value},
                                                                     fieldState: {error},
                                                                     formState,
                                                                 }) => (
                                                            <>
                                                                <Select
                                                                    placeholder="--Select a option--"
                                                                    options={forwardToList}
                                                                    value={forwardToList?.find(v => v.value === value)}
                                                                    size="md"
                                                                    className={error ? 'is-invalid' : ''}
                                                                    onChange={v => onChange(v.value)}/>

                                                                {error && (
                                                                    <div className="invalid-feedback">Select a option</div>)}
                                                            </>
                                                        )}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col sm={12} md={12} lg={12} xl={12} className="m-auto">
                                                <Form.Group>
                                                    <Form.Label>Comments</Form.Label>
                                                    <Form.Control as="textarea" rows={5} {...register('comments')}
                                                                  placeholder="Please enter comments"/>
                                                    {/*{errors?.heading && (<div className="invalid-feedback">Enter request heading</div>)}*/}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col sm={12} md={12} lg={12} xl={12} className="m-auto">
                                                <Form.Group>
                                                    <Form.Label>Upload Attachment</Form.Label>
                                                    <div {...getRootProps({className: 'dropzone dropzone-multiple dz-clickable'})}>
                                                        <div className="fallback">
                                                            <div  {...getInputProps({className: "custom-file"})}>
                                                                <input className='form-control'
                                                                       id='customFileUploadMultiple' multiple/>
                                                                <label className="form-label"
                                                                       htmlFor="customFileUploadMultiple">Choose
                                                                    file</label>
                                                            </div>
                                                        </div>
                                                        <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush">
                                                            {files.map((file, i) => (
                                                                <li className="list-group-item dz-processing">
                                                                    <div className="row align-items-center">
                                                                        <div className="col-auto"></div>
                                                                        <div className="col ms-n3">
                                                                            <h4 className="mb-1"
                                                                                data-dz-name="">{file.name}</h4>
                                                                            <small className="text-muted"
                                                                                   data-dz-size=""><strong>{Math.ceil(file.size / 1024)}</strong> KB</small>
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
                                                        {
                                                            isDragActive ?
                                                                <p>Drop the files here ...</p> :
                                                                (<div className="dz-default dz-message">
                                                                    <button className="dz-button" type="button">Drop
                                                                        files here to
                                                                        upload
                                                                    </button>
                                                                </div>)
                                                        }
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="mt-4">
                                            <Col sm={12} md={12} lg={12} xl={12} className="m-auto">
                                                <div className="mt-2 text-end">
                                                    <Button type="submit" name="submit" disabled={isSubmitting}
                                                            variant="primary"
                                                            style={{marginRight: "10px", lineHeight: 1}}>
                                                        {isSubmitting && <Spinner size="sm" animation="border"/>} Submit
                                                    </Button>
                                                    <Button disabled={isSubmitting} variant="secondary"
                                                            onClick={handleClose} style={{lineHeight: 1}}>
                                                        <FaWindowClose/> Close
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Form>
                        </div>
                    </Modal.Body>
                </Modal>

            </>
    )
}

export default ForwardToForm