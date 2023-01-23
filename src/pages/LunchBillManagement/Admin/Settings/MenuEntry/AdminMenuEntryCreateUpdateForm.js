import {Controller, useFieldArray, useForm} from "react-hook-form";
import {Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import Select from "../../../../../components/select/Select";
import {FaDownload} from "react-icons/fa";
import CustomTable from "../../../../../components/custom-table/CustomTable";
import {MENU_ENTRY_TABLE_COLUMNS} from "../../table-columns";
import {API} from "../../../../../utils/axios/axiosConfig";
import {
    BRANCH_LIST_CREATE_API,
    MONTHLY_MENU_ENTRY_LIST_CREATE_API,
    VENDOR_LIST_BY_BRANCH_API
} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import {error_alert, success_alert} from "../../../../../components/alert/Alert";
import {useEffect, useState} from "react";
import {monthAndYearList} from "../../../../../utils/helper";
import useFetch from "../../../../../hooks/useFetch";

const MonthlyMenuMappingComponent = ({index, menus, register, control}) => {
    const {fields, append, remove, update} = useFieldArray({
        control,
        name: `mapping_menu_entry.${index}.menus`,
        keyName: 'key',
    })

    function appendMenu(e, menu) {

        if (e.target.checked) {
            append(menu)
        } else {
            const i = fields.map((item) => item?.id)?.indexOf(menu.id)
            if (i >= 0) {
                remove(i)
            }
        }
    }

    return (
        <>
            {menus.map((menu, i) => (
                <li key={menu.id} style={{listStyle: 'none'}} className="p-2">
                    <Form.Check
                        key={i}
                        type="switch"
                        id={`check-switch-${menu.id}`}
                        {...register(`mapping_menu_entry.${index}.menus.${i}.menu`, {
                            onChange: e => appendMenu(e, menu),
                        })}
                        label={menu.item}
                    />
                </li>
            ))}
        </>
    )
}
export default function AdminMenuEntryCreateUpdateForm({menus,monthlyData,existingData,callFuncWithVendorMonthYear,onSubmitData}){
    const [monthList, yearList] = monthAndYearList()
    const {data, isLoading} = useFetch(BRANCH_LIST_CREATE_API)
    const [branchList, setBranchList] = useState([]);
    const [vendorList, setVendorList] = useState([]);
    const [showMenus, setShowMenus] = useState(false)
    const [tableIndex, setTableIndex] = useState(-1)
    const {register, handleSubmit, formState: {errors, isValid}, reset, getValues, control, watch} = useForm({
        mode: 'onChange'
    });
    const {fields, append, remove, replace} = useFieldArray({
        control,
        name: 'mapping_menu_entry',
    })
    const mappingMenuEntryFieldsWatch = watch('mapping_menu_entry');
    useEffect(() => {
        if (data?.data) {
            setBranchList(data?.data?.map((v, i) => ({label: v.name, value: v.id})))
        }
    }, [data])
    useEffect(()=>{
        if(monthlyData){
            replace(monthlyData)
        }
    },[monthlyData])

    function onBranchChange(v) {
        API.get(VENDOR_LIST_BY_BRANCH_API(v)).then(success => {
            setVendorList(success?.data?.data?.map(v => ({value: v.id, label: v.name})))

        }).then(err => {

        })
    }
    function showMenuDialog(i) {
        setTableIndex(i)
        setShowMenus(true)
    }

    function deleteMenus() {

    }
    function submitMonthlyMenu(data, e) {
        if(onSubmitData) onSubmitData(true)
        const newMappingMenuEntry = []
        for (let i = 0; i < data?.mapping_menu_entry?.length; i++) {
            const mme = data?.mapping_menu_entry[i];
            if (mme?.menus.length > 0 && mme?.menus?.filter((menu) => menu?.id).length > 0) {
                newMappingMenuEntry.push({...mme, menus: mme?.menus?.filter((menu) => menu?.id)})
            } else {
                const index = data?.mapping_menu_entry?.indexOf(v => v.day === mme.day);
                if (index >= 0) data?.mapping_menu_entry?.splice(i, 1);
            }
        }

        data.mapping_menu_entry = newMappingMenuEntry
        console.log(data)
        API.post(MONTHLY_MENU_ENTRY_LIST_CREATE_API, data).then(success => {
            console.log(success?.data)
            success_alert(success?.data?.message)
        }).then(err => {
            console.log(err)
            error_alert(err?.data?.message)
        }).then(() => {
            if(onSubmitData) onSubmitData(false)
        })
    }
    return (
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
                            <Button variant="primary" size="md" onClick={e=>{
                                e.preventDefault();
                                if(callFuncWithVendorMonthYear){
                                    callFuncWithVendorMonthYear(getValues('vendor'),getValues('month'),getValues('year'))
                                }
                            }}>
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
                                                     menus={menus}
                                                     index={tableIndex}/>
                    </ul>
                </Modal.Body>
            </Modal>

        </Form>
    )
}