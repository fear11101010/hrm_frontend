import {Controller, useFieldArray, useForm, useWatch} from "react-hook-form";
import {useEffect, useState} from "react";
import PageHeader from "../../../../../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import Loader from "../../../../../../../components/loader/Loader";
import Layout from "../../../../../../../layout/Layout";
import Select from "../../../../../../../components/select/Select";
import useFetch from "../../../../../../../hooks/useFetch";
import {
    BRANCH_LIST_CREATE_API,
    SUBSIDY_LIST_CREATE_API,
    VENDOR_LIST_BY_BRANCH_API,
    VENDOR_MENU_DROPDOWN_LIST_API,
    VENDOR_MENU_LIST_BY_VENDOR_API,
    VENDOR_MENU_LIST_CREATE_API
} from "../../../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import {FaSave} from "react-icons/fa";
import './sub-sidy-cost.css'
import useFetchV2 from "../../../../../../../hooks/useFetchV2";
import {API} from "../../../../../../../utils/axios/axiosConfig";
import moment from "moment";
import {error_alert} from "../../../../../../../components/alert/Alert";
import DatePicker from "../../../../../../../components/date-picker/DatePicker";

function CreateSubSidyLunchCost(props) {
    const {register, control, handleSubmit, formState: {errors}, reset, getValues,setValue} = useForm({
        defaultValues:{
            cost_type:'global'
        }
    });
    const costType = useWatch({
        control,
        name:'cost_type'
    })
    const {fields,append,remove,replace} = useFieldArray({
        control,
        name:'menu',
        keyName:'key'
    })
    const {data} = useFetch(SUBSIDY_LIST_CREATE_API)
    const subSidyTypes = data?.data?.map(ss => ({label: ss.name, value: ss.id}))
    const [isLoading, setIsLoading] = useState(false);
    const [branches] = useFetchV2(BRANCH_LIST_CREATE_API)
    const branchList = branches?.data?.map(b=>({label:b?.name,value:b?.id}))
    console.log({branches})
    const [vendorList,setVendorList] = useState([])
    const [menuList,setMenuList] = useState([])
    const createSubSidyCost = (data, e) => {
        const formData = {...data}
        const m = moment(data.month_year)
        formData.month = m.month();
        formData.year = m.year();
        delete formData['month_year']
        console.log(formData)
    }
    function onBranchChange(v) {
        API.get(VENDOR_LIST_BY_BRANCH_API(v)).then(success => {
            setVendorList(success?.data?.data?.map(v => ({value: v.id, label: v.name})))
        }).then(err => {

        })
    }
    function loadMenuItem(vendor) {
        API.get(VENDOR_MENU_DROPDOWN_LIST_API(vendor)).then(success => {
            setMenuList(success?.data?.data)
            success?.data?.data?.map(d=>{
                append({
                    id:d?.id,
                    item:d?.item,
                    meal_price:d?.price,
                    subsidy_amount:'',
                    employee_amount:''
                })
            })
        }).catch(err => {
            console.log(err?.data)
            error_alert(err?.response?.data?.error)
        })
    }
    useEffect(()=>{
        reset(values=>({...values,vendor:'',office_branch:''}))
        setVendorList([]);
        setMenuList([]);
        replace([]);
    },[costType])
    return (
        <Layout>
            <PageHeader title="Add Subsidy Cost" onBack/>
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Row className="justify-content-center">
                            <Col sm={12} md={7} lg={7}>
                                <Form onSubmit={handleSubmit(createSubSidyCost)}>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Subsidy Type</Form.Label>
                                        <Controller
                                            name="subsidy_id"
                                            control={control}
                                            rules={{required: true}}
                                            render={({
                                                         field: {onChange, value},
                                                         fieldState: {error},
                                                         formState,
                                                     }) => (
                                                <>
                                                    <Select
                                                        placeholder="--Select a subsidy--"
                                                        options={subSidyTypes}
                                                        value={subSidyTypes?.find(v => v.value === value)}
                                                        size="md"
                                                        className={error ? 'is-invalid' : ''}
                                                        onChange={v => onChange(v.value)}/>

                                                    {error && (
                                                        <div className="invalid-feedback">Select a subsidy</div>)}
                                                </>
                                            )}/>
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Month & Year</Form.Label>
                                        <Controller
                                            name="month_year"
                                            control={control}
                                            rules={{required: true}}
                                            render={({
                                                         field: {onChange, value},
                                                         fieldState: {error},
                                                         formState,
                                                     }) => (
                                                <>
                                                    <DatePicker
                                                        placeholder={"Select month and year"}
                                                        dateFormat={"MM,YYYY"}
                                                        value={value && moment(value).format("MMM, YYYY")}
                                                        onChange={(e) => onChange(moment(e?._d).format("MMM, YYYY"))}
                                                        required
                                                    />

                                                    {error && (
                                                        <div className="invalid-feedback">Select a subsidy</div>)}
                                                </>
                                            )}/>
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Price Type</Form.Label>
                                        <ul className="m-0 d-flex mt-2 rounded" style={{listStyle:'none', background:'#f7f7f7',padding:'2px 4px'}}>
                                            <li>
                                                <input value="global" className="d-none sr-only" type="radio" {...register('cost_type')}  id="radio-global"/>
                                                <Form.Label htmlFor="radio-global">Over all</Form.Label>
                                            </li>
                                            <li>
                                                <input  className="d-none sr-only" value="vendor" type="radio" {...register('cost_type')}  id="radio-vendor"/>
                                                <Form.Label htmlFor="radio-vendor">Vendor</Form.Label>
                                            </li>
                                            <li>
                                                <input type="radio" value="menu" className="d-none sr-only" {...register('cost_type')} id="radio-menu"/>
                                                <Form.Label htmlFor="radio-menu">Menu</Form.Label>
                                            </li>
                                        </ul>

                                    </Form.Group>

                                    {['menu','vendor'].indexOf(costType)>=0 && (
                                        <Row className="mb-4">
                                            <Col sm={12} md={6} lg={6}>
                                                <Form.Group>
                                                    <Form.Label>Select Branch</Form.Label>
                                                    <Controller
                                                        name="office_branch"
                                                        control={control}
                                                        rules={{required: true}}
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
                                                                        onBranchChange(v.value)
                                                                    }}/>

                                                                {error && (
                                                                    <div className="invalid-feedback">Select a subsidy</div>)}
                                                            </>
                                                        )}/>
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={6} lg={6}>
                                                <Form.Group>
                                                    <Form.Label>Select Vendor</Form.Label>
                                                    <Controller
                                                        name="vendor"
                                                        control={control}
                                                        rules={{required: true}}
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
                                                                        onChange(v.value)
                                                                        loadMenuItem(v.value)
                                                                    }}/>

                                                                {error && (
                                                                    <div className="invalid-feedback">Select a subsidy</div>)}
                                                            </>
                                                        )}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    )}
                                    {['global','vendor'].indexOf(costType)>=0 && (
                                        <>
                                            <Form.Group className="mb-4">
                                                <Form.Label>Meal Price</Form.Label>
                                                <Form.Control placeholder="Enter meal price" {...register('meal_price', {required: true})}/>
                                                {errors?.meal_price && (
                                                    <div className="invalid-feedback">Select a subsidy</div>)}
                                            </Form.Group>
                                            <Row className="mb-4">
                                                {/*<Col sm={12} md={6} lg={6}>
                                            <Form.Group>
                                                <Form.Label>Subsidy Percentage</Form.Label>
                                                <Form.Control type="text"
                                                              placeholder="Enter subsidy amount in percent" {...register('employee_pct', {
                                                    // required: true,
                                                    // pattern: /^[0-1]+$/
                                                })}/>
                                            </Form.Group>
                                        </Col>*/}
                                                <Col sm={12} md={6} lg={6}>
                                                    <Form.Group>
                                                        <Form.Label>Subsidy Amount</Form.Label>
                                                        <Form.Control type="text" onFocus={e=>{
                                                            setValue('employee_amount',Math.round(((getValues('meal_price')||0)*(getValues('employee_pct')||0))/100))
                                                        }}
                                                                      placeholder="Enter subsidy amount" {...register('employee_amount', {
                                                            // required: true,
                                                            // pattern: /^[0-1]+$/
                                                        })}/>
                                                    </Form.Group>
                                                </Col>
                                                <Col sm={12} md={6} lg={6}>
                                                    <Form.Group>
                                                        <Form.Label>Employer Amount</Form.Label>
                                                        <Form.Control type="text" onFocus={e=>{
                                                            setValue('employer_amount',Math.round(((getValues('meal_price')||0)*(getValues('employer_pct')||0))/100))
                                                        }}
                                                                      placeholder="Enter subsidy amount" {...register('employer_amount', {
                                                            // required: true,
                                                            // pattern: /^[0-1]+$/
                                                        })}/>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            {/*<Row className="mb-4">
                                        <Col sm={12} md={6} lg={6}>
                                            <Form.Group>
                                                <Form.Label>Employer Percentage</Form.Label>
                                                <Form.Control type="text"
                                                              placeholder="Enter employer amount in percent" {...register('employer_pct', {
                                                    // required: true,
                                                    // pattern: /^[0-1]+$/
                                                })}/>
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
                                            <Form.Group>
                                                <Form.Label>Employer Amount</Form.Label>
                                                <Form.Control type="text" onFocus={e=>{
                                                    setValue('employer_amount',Math.round(((getValues('meal_price')||0)*(getValues('employer_pct')||0))/100))
                                                }}
                                                              placeholder="Enter subsidy amount in percent" {...register('employer_amount', {
                                                    // required: true,
                                                    // pattern: /^[0-1]+$/
                                                })}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>*/}
                                        </>
                                    )}
                                    {costType === 'menu' &&
                                        fields?.map((m,i)=>(
                                            <div key={m?.key} className="shadow p-2 shadow-sm mb-3 border" style={{borderRadius:"5px"}}>
                                                <Row className="mb-2">
                                                    <Col sm={12} md={12} lg={12}>
                                                        <Form.Group>
                                                            <Form.Label>{i+1}. {m?.item}</Form.Label>
                                                            <Form.Control type="hidden" disabled={true} placeholder="Enter meal price" {...register(`menu[${i}].id`, {required: true})}/>
                                                            <Form.Control disabled={true} className="disabled" placeholder="Enter meal price" {...register(`menu[${i}].meal_price`, {required: true})}/>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-2">
                                                    {/*<Col sm={12} md={6} lg={6}>
                                            <Form.Group>
                                                <Form.Label>Subsidy Percentage</Form.Label>
                                                <Form.Control type="text"
                                                              placeholder="Enter subsidy amount in percent" {...register('employee_pct', {
                                                    // required: true,
                                                    // pattern: /^[0-1]+$/
                                                })}/>
                                            </Form.Group>
                                        </Col>*/}
                                                    <Col sm={12} md={6} lg={6}>
                                                        <Form.Group>
                                                            <Form.Label>Subsidy Amount</Form.Label>
                                                            <Form.Control type="text" {...register(`menu[${i}].subsidy_amount`)} placeholder="Enter subsidy amount"/>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col sm={12} md={6} lg={6}>
                                                        <Form.Group>
                                                            <Form.Label>Employer Amount</Form.Label>
                                                            <Form.Control type="text" {...register(`menu[${i}].employee_amount`)} placeholder="Enter employee amount" />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </div>

                                        ))
                                    }
                                    <Form.Group className="mb-4">
                                        <Form.Label>Remarks</Form.Label>
                                        <Form.Control as="textarea" row={6}
                                                      placeholder="Enter remarks" {...register('remarks')}/>
                                    </Form.Group>
                                    <div className="d-flex justify-content-end">
                                        <Button variant="primary" type="submit">
                                            <FaSave/> Create Subsidy Lunch Cost
                                        </Button>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
            {isLoading && <Loader/>}
        </Layout>
    )
}
export default CreateSubSidyLunchCost;