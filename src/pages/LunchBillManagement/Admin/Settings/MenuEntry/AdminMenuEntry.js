import Layout from "../../../../../layout/Layout";
import PageHeader from "../../../../../components/header/PageHeader";
import Content from "../../../../../components/content/Content";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import useFetch from "../../../../../hooks/useFetch";
import {
    BRANCH_LIST_CREATE_API,
    VENDOR_LIST_BY_BRANCH_API, VENDOR_MENU_LIST_BY_VENDOR_API,
    VENDOR_MENU_LIST_CREATE_API
} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import {API} from "../../../../../utils/axios/axiosConfig";
import Select from "../../../../../components/select/Select";
import moment from "moment";
import {FaDownload} from "react-icons/fa";

export default function AdminMenuEntry(props){
    const months = moment.months('MMMM').map((month,i)=>({value:i,label:month}));
    const currentMoment = moment();
    const monthList = (currentMoment.month()===11?[11,0]:[currentMoment.month(),currentMoment.month()+1])
        .map((v,i)=>({value:v,label:months[v].label}))
    const yearList = (currentMoment.month()===11?[currentMoment.year(),currentMoment.year()+1]:[currentMoment.year()])
        .map((v,i)=>({value:v,label:v}))
    const [refresh, setRefresh] = useState(false);
    const {data, isLoading} = useFetch(BRANCH_LIST_CREATE_API, refresh)
    const [branchList, setBranchList] = useState([]);
    const [vendorList, setVendorList] = useState([]);
    const [vendorMenuList, setVendorMenuList] = useState([]);
    const {register, handleSubmit, formState: {errors,isValid},trigger, reset, getValues, control} = useForm();
    const {fields,append,insert,remove} = useFieldArray({
        control,
        name:'menuEntry'
    })
    console.log(monthList)
    useEffect(()=>{
        if(data?.data){
            setBranchList(data?.data?.map((v,i)=>({label:v.name,value:v.id})))
        }
    },[data])
    function onBranchChange(v){
        API.get(VENDOR_LIST_BY_BRANCH_API(v)).then(success => {
            setVendorList(success?.data?.data?.map(v => ({value: v.id, label: v.name})))

        }).then(err => {

        })
    }
    function loadMenuItem(e){
        e.preventDefault();
        API.get(VENDOR_MENU_LIST_BY_VENDOR_API(getValues('vendor'))).then(success => {
            setVendorMenuList(success?.data?.data?.map(v => ({value: v.id, label: v.name})))
        }).then(err => {

        })
    }
    function submitMonthlyMenu(data,e) {

    }

    return (
        <Layout>
            <PageHeader title="Menu Entry"/>
            <Content>
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleSubmit(submitMonthlyMenu)}>
                            <Row className="justify-content-center">
                                <Col sm={12} md={6} lg={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Office Branch</Form.Label>
                                        <Controller
                                            name="office_branch"
                                            control={control}
                                            rules={{required:true}}
                                            render={({
                                                         field: {onChange, value},
                                                         fieldState: {error},
                                                         formState,

                                                     }) => (
                                                <>
                                                    <Select
                                                        placeholder="--Select a branch--"
                                                        options={branchList}
                                                        value={branchList?.find(v => v.value === value)}
                                                        size="md"
                                                        className={error ? 'is-invalid' : ''}
                                                        onChange={v => {
                                                            onChange(v.value);
                                                            onBranchChange(v.value);
                                                        }}/>

                                                    {error && (
                                                        <div className="invalid-feedback">Select a branch</div>)}
                                                </>
                                            )}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Vendor</Form.Label>
                                        <Controller
                                            name="vendor"
                                            control={control}
                                            rules={{required:true}}
                                            render={({
                                                         field: {onChange, value},
                                                         fieldState: {error},
                                                         formState,
                                                     }) => (
                                                <>
                                                    <Select
                                                        placeholder="--Select a vendor--"
                                                        options={vendorList}
                                                        value={vendorList?.find(v => v.value === value)}
                                                        size="md"
                                                        className={error ? 'is-invalid' : ''}
                                                        onChange={v => {
                                                            onChange(v.value);
                                                            append({
                                                                name:`Menu ${fields.length+1}`,
                                                                item:'',
                                                                vendor:getValues('vendor'),
                                                                active:1,
                                                                price:0
                                                            });
                                                        }}/>

                                                    {error && (
                                                        <div className="invalid-feedback">Select a vendor</div>)}
                                                </>
                                            )}/>
                                    </Form.Group>
                                    <Row className="mb-3">
                                        <Col sm={12} md={6} lg={6}>
                                            <Form.Group>
                                                <Form.Label>Month</Form.Label>
                                                <Controller
                                                    name="--Select a month--"
                                                    control={control}
                                                    rules={{required:true}}
                                                    render={({
                                                                 field: {onChange, value},
                                                                 fieldState: {error},
                                                                 formState,
                                                             }) => (
                                                        <>
                                                            <Select
                                                                placeholder="Month"
                                                                options={monthList}
                                                                value={monthList?.find(v => v.value === value)}
                                                                size="md"
                                                                className={error ? 'is-invalid' : ''}
                                                                onChange={v => {
                                                                    onChange(v.value);
                                                                }}/>

                                                            {error && (
                                                                <div className="invalid-feedback">Select a month</div>)}
                                                        </>
                                                    )}/>
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
                                            <Form.Group>
                                                <Form.Label>Year</Form.Label>
                                                <Controller
                                                    name="year"
                                                    control={control}
                                                    rules={{required:true}}
                                                    render={({
                                                                 field: {onChange, value},
                                                                 fieldState: {error},
                                                                 formState,
                                                             }) => (
                                                        <>
                                                            <Select
                                                                placeholder="Year"
                                                                options={yearList}
                                                                value={yearList?.find(v => v.value === value)}
                                                                size="md"
                                                                className={error ? 'is-invalid' : ''}
                                                                onChange={v => {
                                                                    onChange(v.value);
                                                                }}/>

                                                            {error && (
                                                                <div className="invalid-feedback">Select a year</div>)}
                                                        </>
                                                    )}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                            <Row className="justify-content-center mt-3">
                                <Col sm={12} md={6} lg={6} className="d-flex justify-content-center">
                                    <Button variant="primary" size="md" onClick={loadMenuItem}>
                                        <FaDownload/> Load Menu Item
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Content>
        </Layout>
    )
}