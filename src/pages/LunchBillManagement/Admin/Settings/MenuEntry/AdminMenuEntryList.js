import Layout from "../../../../../layout/Layout";
import PageHeader from "../../../../../components/header/PageHeader";
import Content from "../../../../../components/content/Content";
import useFetch from "../../../../../hooks/useFetch";
import {
    BRANCH_LIST_CREATE_API,
    MONTHLY_MENU_ENTRY_LIST_CREATE_API
} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import Loader from "../../../../../components/loader/Loader";
import useMonthAndYearList from "../../../../../hooks/useMonthAndYearList";
import {useEffect, useState} from "react";
import {API} from "../../../../../utils/axios/axiosConfig";
import {Accordion, Button, Card, Col, Form, Row} from "react-bootstrap";
import {Controller, useForm} from "react-hook-form";
import Select from "../../../../../components/select/Select";
import {FaDownload} from "react-icons/fa";

export default function AdminMenuEntryList(props) {
    const [monthList, yearList,currentMoment] = useMonthAndYearList()
    const {control,reset,getValues} = useForm()
    const {data} = useFetch(BRANCH_LIST_CREATE_API)
    const [menuEntryList, setMenuEntryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [defaultEventKey, setDefaultEventKey] = useState(0);
    const [branchList, setBranchList] = useState([]);
    useEffect(() => {
        if(data?.data){
            loadMenuEntryData();
            setBranchList(data?.data?.map((v, i) => ({label: v.name, value: v.id})))
        }
    }, [data])
    const loadMenuEntryData = ()=>{
        setLoading(true);
        API.get(MONTHLY_MENU_ENTRY_LIST_CREATE_API, {
            params: {
                months: (getValues('month') && [getValues('month')]) || monthList?.map(v => v.value),
                year: (getValues('year') && [getValues('year')]) || yearList?.map(v => v.value),
                office_branch:getValues('office_branch')
            }
        }).then(success => {
            setMenuEntryList(success?.data?.data)
            setDefaultEventKey(success?.data?.data?.length>0?1:0)
        }).then(err => {

        }).then(() => setLoading(false))
    }
    return (
        <Layout>
            <PageHeader title="Menu Entry List"/>
            <Content>
                {/*<Form>
                    <Card>
                        <Card.Body>



                        </Card.Body>
                    </Card>
                </Form>*/}
                <Accordion defaultActiveKey={`${defaultEventKey}`}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className="text-black">
                            <h3 className="header-title mb-0">
                                Filter
                            </h3>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Row className="justify-content-center">
                                    <Col sm={12} md={6} lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Office Branch</Form.Label>
                                            <Controller
                                                name="office_branch"
                                                control={control}
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
                                                            }}/>

                                                        {error && (
                                                            <div className="invalid-feedback">Select a branch</div>)}
                                                    </>
                                                )}/>
                                        </Form.Group>
                                        <Row className="mb-3">
                                            <Col sm={12} md={6} lg={6}>
                                                <Form.Group>
                                                    <Form.Label>Month</Form.Label>
                                                    <Controller
                                                        name="month"
                                                        control={control}
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
                                                                    <div className="invalid-feedback">Select a
                                                                        month</div>)}
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
                                                                    <div className="invalid-feedback">Select a
                                                                        year</div>)}
                                                            </>
                                                        )}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                                <Row className="justify-content-center mt-3">
                                    <Col sm={12} md={6} lg={6} className="d-flex justify-content-center">
                                        <Button variant="primary" size="md" onClick={e=>loadMenuEntryData()}>
                                            <FaDownload/> Filter Data
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    {menuEntryList?.map((entryList, i) =>
                        <Accordion.Item eventKey={`${i+1}`}>
                            <Accordion.Header as="h3" className="header-title mb-0 text-black">
                                {currentMoment.month(entryList?.month).year(entryList?.year).format('MMMM, YYYY')}
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    )}
                    {menuEntryList?.length<=0 && <h2 className="text-center mt-4">No Data Available</h2>}
                </Accordion>
            </Content>
            {loading && <Loader/>}
        </Layout>
    )
}