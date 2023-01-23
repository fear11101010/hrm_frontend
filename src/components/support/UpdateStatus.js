import useTicketStatus from "../../hooks/support/useTicketStatus";
import useFetch from "../../hooks/useFetch";
import {FETCH_TICKET_BY_ID_API, REQUEST_STATUS_UPDATE_API} from "../../utils/routes/api_routes/SP_API_ROUTES";
import {Controller, set, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Button, Card, Col, Form, Modal, Row, Spinner} from "react-bootstrap";
import Select from "../select/Select";
import RichTextEditor from "react-rte";
import Datetime from "react-datetime";
import moment from "moment";
import {FaCross, FaDownload, FaTrash, FaWindowClose} from "react-icons/fa";
import Loader from "../loader/Loader";
import React from "react";
import {API} from "../../utils/axios/axiosConfig";
import {error_alert, success_alert} from "../alert/Alert";

function UpdateStatus({id,show,handleClose}) {
    const [isSubmitting,setIsSubmitting] = useState(false)
    const [requestStatusList,setRequestStatusList] = useState([])
    const requestStatus = useTicketStatus();
    const {data} = useFetch(FETCH_TICKET_BY_ID_API(id));
    const {register,reset,handleSubmit, formState: {errors}, control} = useForm({
        defaultValues:data?.data
    });
    useEffect(()=>{
        if(data){
            const ticketDetail = {
                request_status:data?.data?.current_status.id,
                request_detail:data?.data?.id,
                comments:''
            }
            reset(ticketDetail);
            const filteredRequestStatus = requestStatus?.filter(rs=>{
                if(data?.data?.current_status?.name?.toLowerCase()==='pending'){
                    return ['in progress','pending'].indexOf(rs?.name?.toLowerCase())>=0
                }
                if(data?.data?.current_status?.name?.toLowerCase()==='in progress'){
                    return ['in progress','in queue'].indexOf(rs?.name?.toLowerCase())>=0
                }
                if(data?.data?.current_status?.name?.toLowerCase()==='in queue' &&
                    (data?.data?.request_type?.name?.toLowerCase()==='requisition' || data?.data?.request_type?.name?.toLowerCase()==='change request')
                && !data?.data?.approve_status){
                    return rs?.name?.toLowerCase()==='in queue'
                }
                if(data?.data?.current_status?.name?.toLowerCase()==='approved' &&
                    (data?.data?.request_type?.name?.toLowerCase()==='requisition' || data?.data?.request_type?.name?.toLowerCase()==='change request')
                && data?.data?.approve_status){
                    return ["resolved","rejected","approved"].indexOf(rs?.name?.toLowerCase())>=0
                }
                if(data?.data?.current_status?.name?.toLowerCase()==='in queue' &&
                    (data?.data?.request_type?.name?.toLowerCase()==='problem' || data?.data?.request_type?.name?.toLowerCase()==='issue document')
                ){
                    return ["rejected","approved","in queue"].indexOf(rs?.name?.toLowerCase())>=0
                }
                if(data?.data?.current_status?.name?.toLowerCase()==='approved' &&
                    (data?.data?.request_type?.name?.toLowerCase()==='problem' || data?.data?.request_type?.name?.toLowerCase()==='issue document')
                ){
                    return ["resolved","rejected","approved"].indexOf(rs?.name?.toLowerCase())>=0
                }

            })
            console.debug(filteredRequestStatus)
            const rs = filteredRequestStatus?.map(status=>{
                return {
                    label:status.name.substring(0,1).toUpperCase()+status.name.substring(1,status.name.length),
                    value:status.id,
                    disabled:status?.id === ticketDetail?.request_status
                }
            }).filter(value=>value!==null)
            setRequestStatusList(rs)
        }
    },[data,requestStatus])

    function submitRequest(data,event) {
        setIsSubmitting(true);
        console.log(data)
        API.post(REQUEST_STATUS_UPDATE_API,data).then(res=>{
            success_alert("Request status updated successfully")
            handleClose('')
        }).catch(err=>{
            error_alert(err?.data?.msg ?? 'An error occur while updating status. Please try again later')
        }).finally(()=>{
            setIsSubmitting(false)
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
                                                    <Form.Label>Request Status</Form.Label>
                                                    <Controller
                                                        name="request_status"
                                                        control={control}
                                                        rules={{required: true}}
                                                        render={({
                                                                     field: {onChange, value},
                                                                     fieldState: {error},
                                                                     formState,
                                                                 }) => (
                                                            <>
                                                                <Select
                                                                    placeholder="--Select a request status--"
                                                                    options={requestStatusList}
                                                                    value={requestStatusList?.find(v => v.value === value)}
                                                                    size="md"
                                                                    className={error ? 'is-invalid' : ''}
                                                                    onChange={v => onChange(v.value)}/>

                                                                {error && (<div className="invalid-feedback">Select a request status</div>)}
                                                            </>
                                                        )}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col sm={12} md={12} lg={12} xl={12} className="m-auto">
                                                <Form.Group>
                                                    <Form.Label>Comments</Form.Label>
                                                    <Form.Control as="textarea" rows={5} {...register('comments')} placeholder="Please enter comments"/>
                                                    {/*{errors?.heading && (<div className="invalid-feedback">Enter request heading</div>)}*/}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="mt-4">
                                            <Col sm={12} md={12} lg={12} xl={12} className="m-auto">
                                                <div className="mt-2 text-end">
                                                    <Button type="submit" name="submit" disabled={isSubmitting} variant="primary" style={{marginRight:"10px",lineHeight:1}}>
                                                        {isSubmitting && <Spinner size="sm" animation="border" />} Submit
                                                    </Button>
                                                    <Button disabled={isSubmitting} variant="secondary" onClick={handleClose} style={{lineHeight:1}}>
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

        </>
    )
}
export default UpdateStatus