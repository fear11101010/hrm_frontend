import Layout from "../../../../../layout/Layout";
import PageHeader from "../../../../../components/header/PageHeader";
import Content from "../../../../../components/content/Content";
import useFetch from "../../../../../hooks/useFetch";
import {
    BRANCH_LIST_CREATE_API,
    MONTHLY_MENU_ENTRY_LIST_CREATE_API
} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import Loader from "../../../../../components/loader/Loader";
import {useEffect, useState} from "react";
import {API} from "../../../../../utils/axios/axiosConfig";
import {Accordion, Badge, Button, Card, Col, Form, Row, useAccordionButton} from "react-bootstrap";
import {Controller, useForm} from "react-hook-form";
import Select from "../../../../../components/select/Select";
import {FaDownload, FaPlus} from "react-icons/fa";
import {generateCalender, monthAndYearList} from "../../../../../utils/helper";
import CustomTable from "../../../../../components/custom-table/CustomTable";
import {ADMIN_MENU_ENTRY_TABLE_COLUMNS} from "./table-columns";
import {MdDelete, MdModeEdit} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import {
    ADMIN_MENU_ENTRY_CREATE_PAGE,
    ADMIN_MENU_ENTRY_EDIT_PAGE
} from "../../../../../utils/routes/app_routes/LUNCH_ROUTES";
import {MENU_ENTRY_TABLE_COLUMNS} from "../../table-columns";

function CustomToggle({children, eventKey}) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <h3 className="header-title mb-3 shadow-sm p-3" style={{cursor:"pointer",borderRadius:'5px'}} onClick={decoratedOnClick}>
            {children}
        </h3>
    );
}

export default function AdminMenuEntryList(props) {
    const [monthList, yearList, currentMoment] = monthAndYearList()
    const {control, reset, getValues} = useForm()
    const {data} = useFetch(BRANCH_LIST_CREATE_API)
    const [menuEntryList, setMenuEntryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [defaultEventKey, setDefaultEventKey] = useState(0);
    const [branchList, setBranchList] = useState([]);
    const [tableColumns, setTableColumns] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if (data?.data) {
            loadMenuEntryData();
            setBranchList(data?.data?.map((v, i) => ({label: v.name, value: v.id})))
        }
    }, [data])
    useEffect(() => {
        if(menuEntryList.length>0){
            setTableColumns([])
            menuEntryList?.forEach(({id,mapping_menu_entry},i)=>{
                const columns = ADMIN_MENU_ENTRY_TABLE_COLUMNS((id,d, e) => {}, (d, e) => {},id)
                const cols = addNewField(mapping_menu_entry);
                const newCols = [...columns]
                for(let i=0;i<cols?.length;i++){
                    newCols.splice(4+i+1,0,cols[i])
                }
                setTableColumns(tc=>{
                    const data = [...tc];
                    data.push(newCols)
                    return data;
                })
            })
        }
    }, [menuEntryList])
    const addNewField = (mappingMenuEntry) => {
        const menuData = mappingMenuEntry?.map(mme=>mme?.menus?.filter((menu)=>menu?.id).length).filter(v=>v)
        const maxMenuLength = Math.min(...menuData)
        const columns = []
        for (let i=0;i<maxMenuLength;i++){
            columns.push({
                name: `Menu ${i+1}`,
                cell: (row, index) => {
                    return row?.menus && row?.menus?.filter((menu)=>menu?.id)?.length>0&&<Badge bg="secondary" className="me-2">{row?.menus?.filter((menu,index)=>menu?.id)[i]?.item}</Badge>
                }})
        }
        return columns
    }
    const loadMenuEntryData = () => {
        setLoading(true);
        API.get(MONTHLY_MENU_ENTRY_LIST_CREATE_API, {
            params: {
                months: (getValues('month') && [getValues('month')]) || monthList?.map(v => v.value),
                year: (getValues('year') && [getValues('year')]) || yearList?.map(v => v.value),
                office_branch: getValues('office_branch')
            }
        }).then(success => {
            setMenuEntryList(success?.data?.data)
            setDefaultEventKey(success?.data?.data?.length > 0 ? 1 : 0)
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
                <div className="mb-3 d-flex justify-content-end">
                    <Link className="btn btn-primary" to={ADMIN_MENU_ENTRY_CREATE_PAGE}>
                        <FaPlus/> Create Monthly Menu
                    </Link>
                </div>
                <Accordion defaultActiveKey={`${defaultEventKey}`}>
                    <Card>
                        <Card.Body>
                            <CustomToggle eventKey="0">
                                Filter
                            </CustomToggle>
                            <Accordion.Collapse eventKey="0">
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
                                            <Button variant="primary" size="md" onClick={e => loadMenuEntryData()}>
                                                <FaDownload/> Filter Data
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Accordion.Collapse>
                        </Card.Body>
                    </Card>
                    {menuEntryList?.map((entryList, i) =>
                        <Card>
                            <Card.Body>
                                <CustomToggle eventKey={`${i + 1}`}>
                                    <div className="mb-2">
                                        Office branch : {entryList?.office_branch?.name}
                                    </div>
                                    <div>
                                        <span className="me-2">
                                            {currentMoment.month(entryList?.month).year(entryList?.year).format('MMMM, YYYY')}
                                        </span>
                                        <Button variant="primary" size="sm" className="me-2"><MdModeEdit/> Edit</Button>
                                        <Button variant="danger" size="sm"><MdDelete/> Delete</Button>
                                    </div>
                                </CustomToggle>
                                <Accordion.Collapse eventKey={`${i + 1}`}>
                                    <CustomTable data={generateCalender({
                                        month: entryList?.month,
                                        year: entryList?.year,
                                        menuEntry: entryList,
                                        id:menuEntryList?.id
                                    })}
                                                 pagination={{}}
                                                 size="sm" columns={tableColumns[i] || []} responsive/>
                                </Accordion.Collapse>
                            </Card.Body>
                        </Card>
                    )}
                    {menuEntryList?.length <= 0 && <h2 className="text-center mt-4">No Data Available</h2>}
                </Accordion>
            </Content>
            {loading && <Loader/>}
        </Layout>
    )
}