import Layout from "../../../../../layout/Layout";
import PageHeader from "../../../../../components/header/PageHeader";
import Content from "../../../../../components/content/Content";
import {Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import useFetch from "../../../../../hooks/useFetch";
import {
    BRANCH_LIST_CREATE_API, MONTHLY_MENU_ENTRY_LIST_CREATE_API,
    VENDOR_LIST_BY_BRANCH_API,
    VENDOR_MENU_LIST_BY_VENDOR_API
} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import {API} from "../../../../../utils/axios/axiosConfig";
import Select from "../../../../../components/select/Select";
import moment from "moment";
import {FaDownload} from "react-icons/fa";
import CustomTable from "../../../../../components/custom-table/CustomTable";
import {MENU_ENTRY_TABLE_COLUMNS} from "../../table-columns";

const MonthlyMenuMappingComponent = ({index, menus, register, control}) => {
    const {fields, append, remove, replace} = useFieldArray({
        control,
        name: `mapping_menu_entry.${index}.menus`,
        keyName: 'key',
    })

    function appendMenu(e, menu) {

        if (e.target.checked) {
            append({menu})
        } else {
            const i = fields.map((item, i) => item?.menu?.id)?.indexOf(menu.id)
            if (i >= 0) {
                remove(i)
            }
        }
    }

    return (
        <>
            {menus.map((menu, i) => (
                <li key={menu.key} style={{listStyle: 'none'}} className="p-2">
                    <Form.Check
                        key={menu.id}
                        type="switch"
                        id={`check-switch-${menu.id}`}
                        {...register(`mapping_menu_entry.${index}.menus.${i}`, {
                            onChange: e => appendMenu(e, menu),
                        })}
                        label={menu.item}
                    />
                </li>
            ))}
        </>
    )
}
export default function AdminMenuEntry(props) {
    const weeklyHoliday = [5, 6];
    const months = moment.months('MMMM').map((month, i) => month);
    const currentMoment = moment();
    const monthList = (currentMoment.month() === 11 ? [11, 0] : [currentMoment.month(), currentMoment.month() + 1])
        .map((v, i) => ({value: v, label: months[v]}))
    const yearList = (currentMoment.month() === 11 ? [currentMoment.year(), currentMoment.year() + 1] : [currentMoment.year()])
        .map((v, i) => ({value: v, label: v}))
    const [refresh, setRefresh] = useState(false);
    const {data, isLoading} = useFetch(BRANCH_LIST_CREATE_API, refresh)
    const [branchList, setBranchList] = useState([]);
    const [vendorList, setVendorList] = useState([]);
    const [vendorMenuList, setVendorMenuList] = useState([]);
    const {register, handleSubmit, formState: {errors, isValid}, reset, getValues, control, watch} = useForm({
        mode: 'onChange'
    });
    const {
        fields: mappingMenuEntryFields,
        append: mappingMenuEntryAppend,
        remove: mappingMenuEntryRemove,
        replace
    } = useFieldArray({
        control,
        name: 'mapping_menu_entry',
    })
    const mappingMenuEntryFieldsWatch = watch('mapping_menu_entry');

    const [showMenus, setShowMenus] = useState(false)
    const [tableIndex, setTableIndex] = useState(-1)
    const [dummyState, setDummyState] = useState(true)
    useEffect(() => {
        if (data?.data) {
            setBranchList(data?.data?.map((v, i) => ({label: v.name, value: v.id})))
        }
    }, [data])

    function onBranchChange(v) {
        API.get(VENDOR_LIST_BY_BRANCH_API(v)).then(success => {
            setVendorList(success?.data?.data?.map(v => ({value: v.id, label: v.name})))

        }).then(err => {

        })
    }

    function loadMenuItem(e) {
        e.preventDefault();
        API.get(VENDOR_MENU_LIST_BY_VENDOR_API(getValues('vendor'))).then(success => {
            setVendorMenuList(success?.data?.data)
            const m = moment().month(getValues('month')).year(getValues('year'));
            const totalDaysInAMonth = m.daysInMonth();
            replace([])
            for (let i = currentMoment.month() === m.month() ? m.date() : 1; i <= totalDaysInAMonth; i++) {
                const dm = m.date(i);
                console.log(dm.weekday())
                if (weeklyHoliday.indexOf(dm.weekday()) >= 0) continue;
                mappingMenuEntryAppend({
                    day: i,
                    weekday: moment.weekdays(m.date(i).weekday()),
                    date: m.date(i).format('YYYY-MM-DD'),
                    menus: success?.data?.data?.map(v => (false))
                })
            }
        }).then(err => {

        })
    }

    function submitMonthlyMenu(data, e) {
        console.log(data)
        const newMappingMenuEntry = []
        for (const mme of data?.mapping_menu_entry) {
            console.log(mme?.menus?.filter((menu) => {
                console.log(menu)
                return !(typeof menu === 'boolean')
            }))
            if (mme?.menus.length > 0 && mme?.menus?.filter(({menu}) => !(typeof menu === 'boolean')).length > 0) {
                newMappingMenuEntry.push({...mme,menus:mme?.menus?.filter(({menu}) => !(typeof menu === 'boolean'))})
            }
        }

            data.mapping_menu_entry = newMappingMenuEntry
            console.log(data)
            API.post(MONTHLY_MENU_ENTRY_LIST_CREATE_API,data).then(success=>{
                console.log(success?.data)
            }).then(err=>{
                console.log(err)
            }).then(()=>{

            })
        }

        function showMenuDialog(i) {
            setTableIndex(i)
            setShowMenus(true)
        }

        function deleteMenus() {

        }

        return (
            <Layout>
                <PageHeader title="Menu Entry"/>
                <Content>
                    <Form onSubmit={handleSubmit(submitMonthlyMenu)}>
                        <Card>
                            <Card.Body>

                                <Row className="justify-content-center">
                                    <Col sm={12} md={6} lg={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Office Branch</Form.Label>
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
                                                                onChange(v.value);
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
                                                        name="month"
                                                        control={control}
                                                        rules={{required: true}}
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
                                                        rules={{required: true}}
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
                                        <Button variant="primary" size="md" onClick={loadMenuItem}>
                                            <FaDownload/> Load Menu Item
                                        </Button>
                                    </Col>
                                </Row>

                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <CustomTable columns={MENU_ENTRY_TABLE_COLUMNS(showMenuDialog, deleteMenus)}
                                             data={mappingMenuEntryFieldsWatch} responsive pagination={{}}/>
                            </Card.Body>
                        </Card>

                        <div className="d-flex justify-content-end mt-3">
                            <Button type="submit" variant="primary">
                                Create Menu
                            </Button>
                        </div>
                        <Modal
                            show={showMenus}
                            onHide={() => setShowMenus(false)}
                            aria-labelledby="example-modal-sizes-title-sm"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-sm">
                                    Menus
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <ul className="m-0 p-0" style={{listStyle: 'none'}}>
                                    <MonthlyMenuMappingComponent control={control} register={register}
                                                                 menus={vendorMenuList}
                                                                 index={tableIndex}/>
                                </ul>
                            </Modal.Body>
                        </Modal>

                    </Form>
                </Content>

            </Layout>
        )
    }