import {Controller, useForm} from "react-hook-form";
import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import Select from "../../../components/select/Select";
import React, {useState} from "react";
import RichTextEditor from "react-rte";
import './create-ticket.css'
import useIssueType from "../../../hooks/support/useIssueType";
import useRequestType from "../../../hooks/support/useRequestType";
import useRequestTo from "../../../hooks/support/useRequestTo";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import usePriority from "../../../hooks/support/usePriority";

function CreateTicket(props) {
    const [requestDetail, setRequestDetail] = useState(RichTextEditor.createEmptyValue());
    const {register, handleSubmit, reset, formState: {errors}, control} = useForm()
    const issueType = useIssueType()?.map(v=>({label:v.name,value:v.id}));
    const requestType = useRequestType()?.map(v=>({label:v.name,value:v.id}));
    const requestTo = useRequestTo()?.map(v=>({label:v.name,value:v.id}));
    const priority = usePriority()?.map(v=>({label:v.name,value:v.id}));
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
    }
    return (
        <Layout>
            <PageHeader title={"Create request"}/>
            <Container fluid>
                <Form onSubmit={handleSubmit(submitRequest)}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col sm={12} md={6} lg={6} xl={6} className="m-auto">
                                    <Form.Group>
                                        <Form.Label>Issue Type</Form.Label>
                                        <Controller
                                            name="heading"
                                            defaultValue="''"
                                            control={control}
                                            render={({
                                                         field: {onChange, value},
                                                         fieldState: { error},
                                                         formState,
                                                     }) => (
                                                <Select
                                                    placeholder="--Select a issue type--"
                                                    options={issueType}
                                                    value={issueType?.find(v=>v.value===value)}
                                                    size="md"
                                                    onChange={v => onChange(v.value)}/>
                                            )}/>
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
                            <Row className="mb-2 mt-4">
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

            </Container>
        </Layout>
    )
}

export default CreateTicket;