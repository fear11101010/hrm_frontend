import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {Controller, useForm} from "react-hook-form";
import Select from "../select/Select";
import RichTextEditor from "react-rte";
import Datetime from "react-datetime";
import moment from "moment";
import React, {useCallback, useEffect, useState} from "react";
import {API} from "../../utils/axios/axiosConfig";
import {MY_TICKETS_URL} from "../../utils/support/SP_APP_ROUTES";
import {useDropzone} from "react-dropzone";
import useIssueType from "../../hooks/support/useIssueType";
import useRequestType from "../../hooks/support/useRequestType";
import usePriority from "../../hooks/support/usePriority";
import {useNavigate} from "react-router-dom";
import Loader from "../loader/Loader";
import {error_alert, success_alert} from "../alert/Alert";
import {FaTrash} from "react-icons/fa";
import {loadFileInfo} from "../../utils/helper";

function TicketForm({url, data, method}) {
    // console.log(data);
    const [requestDetail, setRequestDetail] = useState(RichTextEditor.createEmptyValue());
    const [uploadedFile, setUploadedFile] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [deletedFile, setDeletedFile] = useState([]);
    const {register, handleSubmit, reset, formState: {errors}, control} = useForm({
        defaultValues: {
            occurring_date: moment().format('YYYY-MM-DD')
        }
    })
    useEffect(() => {
        async function loadFile(files) {
            console.log('files: ', files)
            const ff = [];
            for (let f of files) {
                const file = await loadFileInfo(f.attachment_name);
                console.log('file');
                ff.push({id: f.id, ...file})
            }
            console.log('fffffff: ', ff)
            setUploadedFile(ff)
        }

        if (data) {
            const tDetail = data
            if (typeof tDetail?.priority === 'object') tDetail['priority'] = tDetail?.priority?.id;
            if (typeof tDetail?.request_type === 'object') tDetail['request_type'] = tDetail?.request_type?.id;
            if (typeof tDetail?.issue_type === 'object') tDetail['issue_type'] = tDetail?.issue_type?.id;
            // setAttachments(tDetail?.attachment)
            console.log(tDetail);
            if (tDetail?.detail) {

                setRequestDetail(editorValue => editorValue.setContentFromString(tDetail?.detail, 'html'))
            }
            console.log('load file', tDetail?.attachment)
            loadFile(tDetail?.attachment)
            reset(tDetail);
        }
    }, [data])
    const issueType = useIssueType()?.map(v => ({label: v.name, value: v.id}));
    const requestType = useRequestType()?.map(v => ({label: v.name, value: v.id}));
    // const requestTo = useRequestTo()?.map(v=>({label:v.name,value:v.id}));
    const priority = usePriority()?.map(v => ({
        label: v.name.substring(0, 1).toUpperCase() + v.name.substring(1, v.name.length),
        value: v.id
    }));
    const [files, setFiles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const toolbarConfig = {
        // Optionally specify the groups to display (displayed in the order listed).
        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
        INLINE_STYLE_BUTTONS: [
            {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
            {label: 'Italic', style: 'ITALIC'},
            {label: 'Underline', style: 'UNDERLINE'}
        ],
        BLOCK_TYPE_DROPDOWN: [
            {label: 'Normal', style: 'unstyled'},
            {label: 'Heading Large', style: 'header-one'},
            {label: 'Heading Medium', style: 'header-two'},
            {label: 'Heading Small', style: 'header-three'}
        ],
        BLOCK_TYPE_BUTTONS: [
            {label: 'UL', style: 'unordered-list-item'},
            {label: 'OL', style: 'ordered-list-item'}
        ]
    };

    const submitRequest = (data, event) => {
        // data['attachment_name'] = files;
        delete data['created_by'];
        delete data['message_details'];
        delete data['is_forward'];
        delete data['current_status'];
        delete data['updated_by'];
        delete data['attachment']
        delete data['created_at']
        delete data['updated_at']
        const formData = Object.entries(data).reduce((fd, [key, val]) => {
            fd.append(key, val);
            return fd;
        }, new FormData())
        console.log(files);
        files.forEach((v, i) => {
            formData.append(`attachment_name`, v);
            console.log(v)
        });
        if(deletedFile.length>0) formData.append(`deleted_attachments`, JSON.stringify(deletedFile));
        setIsLoading(true);
        API[method](url, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res.data);
            success_alert(res?.data?.message ?? "Data Submitted Successfully")
            navigate(MY_TICKETS_URL)
        }).catch(err => {
            error_alert(err?.data?.data ?? 'An error while submitting data. Please try again later')
            console.log(err)
        }).finally(() => {
            setIsLoading(false);
        })
    }
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        setFiles(files => [...files, ...acceptedFiles])
    }, [])
    const {getRootProps, getInputProps, isDragActive,inputRef} = useDropzone({onDrop})

    const removeFile = (e, i) => {
        e.preventDefault();
        e.stopPropagation();
        setFiles(files => {
            const f = [...files];
            f.splice(i, 1)
            return f;
        })
    }
    const removeUploadedFile = (e, i) => {
        e.preventDefault();
        e.stopPropagation();
        const f = uploadedFile[i];
        setDeletedFile(df => [...df, f.id])
        setUploadedFile(files => {
            const f = [...files];
            f.splice(i, 1)
            console.log(f)
            return f;
        })
    }

    return (
        <>
            <Form onSubmit={handleSubmit(submitRequest)}>
                <Card>
                    <Card.Body>
                        <Row className="mb-4">
                            <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                <Form.Group>
                                    <Form.Label>Issue Type</Form.Label>
                                    <Controller
                                        name="issue_type"
                                        control={control}
                                        rules={{required: true}}
                                        render={({
                                                     field: {onChange, value},
                                                     fieldState: {error},
                                                     formState,
                                                 }) => (
                                            <>
                                                <Select
                                                    placeholder="--Select a issue type--"
                                                    options={issueType}
                                                    value={issueType?.find(v => v.value === value)}
                                                    size="md"
                                                    className={error ? 'is-invalid' : ''}
                                                    onChange={v => onChange(v.value)}/>

                                                {error && (<div className="invalid-feedback">Select a issue type</div>)}
                                            </>
                                        )}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                <Form.Group>
                                    <Form.Label>Request Type</Form.Label>
                                    <Controller
                                        name="request_type"
                                        control={control}
                                        render={({
                                                     field: {onChange, value},
                                                     fieldState: {error},
                                                     formState,
                                                 }) => (
                                            <Select
                                                placeholder="--Select a request type--"
                                                options={requestType}
                                                value={requestType?.find(v => v.value === value)}
                                                size="md"
                                                onChange={v => onChange(v.value)}/>
                                        )}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                <Form.Group>
                                    <Form.Label>Request Heading</Form.Label>
                                    <Form.Control type={"text"}
                                                  className={errors?.heading ? 'is-invalid' : ''} {...register('heading', {required: true})}/>
                                    {errors?.heading && (<div className="invalid-feedback">Enter request heading</div>)}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                <Form.Group style={{height: '220px'}}>
                                    <Form.Label>Request Heading</Form.Label>
                                    <Controller
                                        name="detail"
                                        control={control}
                                        render={({
                                                     field: {onChange, value},
                                                     fieldState: {error},
                                                     formState,
                                                 }) => (
                                            <RichTextEditor
                                                editorClassName="detail-text-editor"
                                                toolbarConfig={toolbarConfig}
                                                value={requestDetail}
                                                onChange={(v) => {
                                                    setRequestDetail(v);
                                                    onChange(v.toString('html'))
                                                }}/>
                                        )}/>

                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-4  mt-5">
                            <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                <Form.Group>
                                    <Form.Label>Date</Form.Label>
                                    <Controller
                                        name="occurring_date"
                                        control={control}
                                        render={({
                                                     field: {onChange, value},
                                                     fieldState: {error},
                                                     formState,
                                                 }) => (
                                            <Datetime
                                                timeFormat={false}
                                                value={value ? moment(value) : moment().format('YYYY-MM-DD')}
                                                dateFormat="YYYY-MM-DD"
                                                onChange={(e) => {
                                                    console.log(moment(e._d).format('YYYY-MM-DD'))
                                                    onChange(moment(e._d).format('YYYY-MM-DD'));
                                                }}
                                            />
                                        )}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                <Form.Group>
                                    <Form.Label>Priority</Form.Label>
                                    <Controller
                                        name="priority"
                                        control={control}
                                        render={({
                                                     field: {onChange, value},
                                                     fieldState: {error},
                                                     formState,
                                                 }) => (
                                            <Select
                                                placeholder="--Select priority--"
                                                options={priority}
                                                value={priority?.find(v => v.value === value)}
                                                size="md"
                                                onChange={v => onChange(v.value)}/>
                                        )}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                <Form.Group>
                                    <Form.Label>Mail CC</Form.Label>
                                    <Form.Control type="text" {...register('mail_cc')}
                                                  placeholder="Enter mail address. comma(,) separated"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                <Form.Group>
                                    <Form.Label>Upload Attachment</Form.Label>
                                    <div {...getRootProps({className: 'dropzone dropzone-multiple dz-clickable'})}>
                                        <div className="fallback">
                                            <div  {...getInputProps({className: "custom-file"})}>
                                                <input className='form-control' id='customFileUploadMultiple' multiple/>
                                                <label className="form-label"
                                                       htmlFor="customFileUploadMultiple">Choose file</label>
                                            </div>
                                        </div>
                                        <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush">
                                            {files.map((file, i) => (
                                                <li className="list-group-item dz-processing">
                                                    <div className="row align-items-center">
                                                        <div className="col-auto"></div>
                                                        <div className="col ms-n3">
                                                            <h4 className="mb-1" data-dz-name="">{file.name}</h4>
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
                                            {uploadedFile.map((file, i) => (
                                                <li className="list-group-item dz-processing">
                                                    <div className="row align-items-center">
                                                        <div className="col-auto"></div>
                                                        <div className="col ms-n3">
                                                            <h4 className="mb-1" data-dz-name="">{file.fileName}</h4>
                                                            <small className="text-muted"
                                                                   data-dz-size=""><strong>{file.size}</strong></small>
                                                        </div>
                                                        <div className="col-auto">
                                                            <button className="btn btn-light btn-sm"
                                                                    onClick={e => removeUploadedFile(e, i)}>
                                                                <FaTrash/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="dz-default dz-message">
                                            {isDragActive ? <p>Drop the files here ...</p> : (
                                                <button className="dz-button" type="button">Drop files here to
                                                    upload <br/>or <br/>click to open file browser

                                            </button>
                                            )}
                                        </div>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                <div className="mt-2 text-end">
                                    <Button type="submit" name="submit" variant="primary">
                                        Submit
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Form>

            {isLoading && <Loader/>}
        </>
    )
}

export default TicketForm