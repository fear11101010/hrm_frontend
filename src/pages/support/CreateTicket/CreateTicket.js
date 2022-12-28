import {Controller, useForm} from "react-hook-form";
import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import Select from "../../../components/select/Select";
import React, {useCallback, useState} from "react";
import RichTextEditor from "react-rte";
import './create-ticket.css'
import useIssueType from "../../../hooks/support/useIssueType";
import useRequestType from "../../../hooks/support/useRequestType";
import useRequestTo from "../../../hooks/support/useRequestTo";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import usePriority from "../../../hooks/support/usePriority";
import {useDropzone} from "react-dropzone";
import {API} from "../../../utils/axios/axiosConfig";
import {TICKET_LIST_CREATE_API} from "../../../utils/routes/api_routes/SP_API_ROUTES";
import Loader from "../../../components/loader/Loader";
import {useNavigate} from 'react-router-dom'
import {MY_TICKETS_URL} from "../../../utils/routes/app_routes/SP_APP_ROUTES";
import TicketForm from "../../../components/support/TicketForm";

function CreateTicket(props) {
    /*const [requestDetail, setRequestDetail] = useState(RichTextEditor.createEmptyValue());
    const {register, handleSubmit, reset, formState: {errors}, control} = useForm()
    const issueType = useIssueType()?.map(v=>({label:v.name,value:v.id}));
    const requestType = useRequestType()?.map(v=>({label:v.name,value:v.id}));
    const requestTo = useRequestTo()?.map(v=>({label:v.name,value:v.id}));
    const priority = usePriority()?.map(v=>({label:v.name,value:v.id}));
    const [files,setFiles] = useState([])
    const [isLoading,setIsLoading] = useState(false)
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
        console.log(data);
        // data['attachment_name'] = files;
        const formData = Object.entries(data).reduce((fd,[key,val])=>{
            fd.append(key,val);
            return fd;
        },new FormData())
        console.log(files);
        files.forEach((v,i)=> {
            formData.append(`attachment_name[${i}]`, v);
            console.log(v)
        });
        setIsLoading(true);
        API.post(TICKET_LIST_CREATE_API,formData,{
            headers:{
               'content-type':'multipart/form-data'
            }}).then(res=>{
            console.log(res.data);
            navigate(MY_TICKET_URL)
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            setIsLoading(false);
        })
    }
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        setFiles(files=>[...files,...acceptedFiles])
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})*/
    return (
        <Layout>
            <PageHeader title={"Create request"} onBack/>
            <Container fluid>
                {/*<Form onSubmit={handleSubmit(submitRequest)}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                    <Form.Group>
                                        <Form.Label>Issue Type</Form.Label>
                                        <Controller
                                            name="issue_type"
                                            defaultValue=""
                                            control={control}
                                            rules={{required:true}}
                                            render={({
                                                         field: {onChange, value},
                                                         fieldState: { error},
                                                         formState,
                                                     }) => (
                                               <>
                                                   <Select
                                                       placeholder="--Select a issue type--"
                                                       options={issueType}
                                                       value={issueType?.find(v=>v.value===value)}
                                                       size="md"
                                                       className={error?'is-invalid':''}
                                                       onChange={v => onChange(v.value)}/>

                                                   {error && (<div className="invalid-feedback">Select a issue type</div>)}
                                               </>
                                            )}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                    <Form.Group>
                                        <Form.Label>Request Type</Form.Label>
                                        <Controller
                                            name="request_type"
                                            defaultValue="''"
                                            control={control}
                                            render={({
                                                         field: {onChange, value},
                                                         fieldState: { error},
                                                         formState,
                                                     }) => (
                                                <Select
                                                    placeholder="--Select a issue type--"
                                                    options={requestType}
                                                    value={requestType?.find(v=>v.value===value)}
                                                    size="md"
                                                    onChange={v => onChange(v.value)}/>
                                            )}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                    <Form.Group>
                                        <Form.Label>Request Heading</Form.Label>
                                        <Form.Control type={"text"} className={errors?.heading?'is-invalid':''} {...register('heading',{required:true})}/>
                                        {errors?.heading && (<div className="invalid-feedback">Enter request heading</div>)}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                    <Form.Group style={{height: '220px'}}>
                                        <Form.Label>Request Heading</Form.Label>
                                        <Controller
                                            name="detail"
                                            defaultValue="''"
                                            control={control}
                                            render={({
                                                         field: {onChange, value},
                                                         fieldState: { error},
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
                            <Row className="mb-2  mt-4">
                                <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                    <Form.Group>
                                        <Form.Label>Date</Form.Label>
                                        <Controller
                                            name="occurring_date"
                                            defaultValue="''"
                                            control={control}
                                            render={({
                                                         field: {onChange, value},
                                                         fieldState: { error},
                                                         formState,
                                                     }) => (
                                                <Datetime
                                                    timeFormat={false}
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
                            <Row className="mb-2">
                                <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                    <Form.Group>
                                        <Form.Label>Priority</Form.Label>
                                        <Controller
                                            name="priority"
                                            defaultValue="''"
                                            control={control}
                                            render={({
                                                         field: {onChange, value},
                                                         fieldState: { error},
                                                         formState,
                                                     }) => (
                                                <Select
                                                    placeholder="--Select priority--"
                                                    options={priority}
                                                    value={priority?.find(v=>v.value===value)}
                                                    size="md"
                                                    onChange={v => onChange(v.value)}/>
                                            )}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                    <Form.Group>
                                        <Form.Label>Forward to</Form.Label>
                                        <Controller
                                            name="forward_to"
                                            defaultValue="''"
                                            control={control}
                                            render={({
                                                         field: {onChange, value},
                                                         fieldState: { error},
                                                         formState,
                                                     }) => (
                                                <Select
                                                    placeholder="--Select a option--"
                                                    options={requestTo}
                                                    value={requestTo?.find(v=>v.value===value)}
                                                    size="md"
                                                    onChange={v => onChange(v.value)}/>
                                            )}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                    <Form.Group>
                                        <Form.Label>Mail CC</Form.Label>
                                        <Form.Control type="text" {...register('mail_cc')} placeholder="Enter mail address. comma(,) separated"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                    <Form.Group>
                                        <Form.Label>Upload Attachment</Form.Label>
                                        <div {...getRootProps({className:'dropzone dropzone-multiple dz-clickable'})}>
                                            <div className="fallback">
                                                <div  {...getInputProps({className:"custom-file"})}>
                                                    <input className='form-control' id='customFileUploadMultiple' multiple  />
                                                        <label className="form-label"
                                                               htmlFor="customFileUploadMultiple">Choose file</label>
                                                </div>
                                            </div>
                                            <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush">
                                                {files.map(file=>(
                                                    <li className="list-group-item dz-processing">
                                                        <div className="row align-items-center">
                                                            <div className="col-auto"></div>
                                                            <div className="col ms-n3">
                                                                <h4 className="mb-1" data-dz-name="">{file.name}</h4>
                                                                <small className="text-muted" data-dz-size=""><strong>{Math.ceil(file.size/1024)}</strong> KB</small>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="dropdown"><a href="#"
                                                                                             className="dropdown-ellipses dropdown-toggle"
                                                                                             role="button"
                                                                                             data-bs-toggle="dropdown"
                                                                                             aria-haspopup="true"
                                                                                             aria-expanded="false">
                                                                    <i className="fe fe-more-vertical"></i>
                                                                </a>
                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                        <a href="#" className="dropdown-item" data-dz-remove=""> Remove </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                            {
                                                isDragActive ?
                                                    <p>Drop the files here ...</p> :
                                                    (<div className="dz-default dz-message">
                                                        <button className="dz-button" type="button">Drop files here to
                                                            upload
                                                        </button>
                                                    </div>)
                                            }
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
                </Form>*/}
                <TicketForm url={TICKET_LIST_CREATE_API} method="post"/>
            </Container>
        </Layout>
    )
}

export default CreateTicket;