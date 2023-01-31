import {Controller, useFieldArray, useForm} from "react-hook-form";
import {Badge, Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import Select from "../../../../../components/select/Select";
import {FaDownload} from "react-icons/fa";
import CustomTable from "../../../../../components/custom-table/CustomTable";
import {MENU_ENTRY_TABLE_COLUMNS} from "../../table-columns";
import {API} from "../../../../../utils/axios/axiosConfig";
import {
    BRANCH_LIST_CREATE_API,
    MONTHLY_MENU_ENTRY_LIST_CREATE_API, MONTHLY_MENU_ENTRY_UPDATE_API,
    VENDOR_LIST_BY_BRANCH_API
} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import {error_alert, success_alert} from "../../../../../components/alert/Alert";
import {useCallback, useEffect, useState} from "react";
import {monthAndYearList} from "../../../../../utils/helper";
import useFetch from "../../../../../hooks/useFetch";

const MonthlyMenuMappingComponent = ({index, menus, register, control,func}) => {
    const {fields, append, remove, update} = useFieldArray({
        control,
        name: `mapping_menu_entry.${index}.menus`,
        keyName: 'key',
    })



    function appendMenu(e, menu) {

        if (e.target.checked) {
            append(menu)
            console.log(func)
            console.log(fields.filter((item) => item?.id))
            const i = fields.filter((item) => item?.id)?.length
            console.log('i:',i)
            func(menu,i,'add')

        } else {
            const index = fields.filter((item) => item?.id)
                .map(item=>item?.id)?.indexOf(menu.id)
            const i = fields.map(item=>item?.id)?.indexOf(menu.id)
            if (i >= 0) {
                remove(i)
                func(menu,index,'rm')
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
export default function AdminMenuEntryCreateUpdateForm({
                                                           menus,
                                                           monthlyData,
                                                           existingData,
                                                           callFuncWithVendorMonthYear,
                                                           onSubmitData,
                                                           update:{single,multiple}
                                                       }) {
    const [monthList, yearList] = monthAndYearList()
    const {data, isLoading} = useFetch(BRANCH_LIST_CREATE_API)
    const [branchList, setBranchList] = useState([]);
    const [vendorList, setVendorList] = useState([]);
    const [showMenus, setShowMenus] = useState(false)
    const [tableIndex, setTableIndex] = useState(-1)
    const [tableColumns, setTableColumns] = useState([])
    const {register, handleSubmit, formState: {errors, isValid}, reset, getValues, control, watch} = useForm({
        mode: 'onChange'
    });
    const {fields, append, remove, replace} = useFieldArray({
        control,
        name: 'mapping_menu_entry',
        keyName:'mme'
    })
    const mappingMenuEntryFieldsWatch = watch('mapping_menu_entry');
    const method = single||multiple?'patch':'post'
    useEffect(() => {
        if (data?.data) {
            setBranchList(data?.data?.map((v, i) => ({label: v.name, value: v.id})))
        }
    }, [data])
    useEffect(() => {
        if (monthlyData) {
            replace(monthlyData)
        }
    }, [monthlyData])
    useEffect(() => {
        setTableColumns(MENU_ENTRY_TABLE_COLUMNS(showMenuDialog, deleteMenus))
    }, [])
    useEffect(() => {
        setTableColumns(MENU_ENTRY_TABLE_COLUMNS(showMenuDialog, deleteMenus))
    }, [existingData])
    useEffect(() => {
        if(existingData){
            console.log({...existingData})
            reset({...existingData})
            setTimeout(()=>{
                console.log(fields)
            },2000)
            existingData?.mapping_menu_entry?.forEach(mme=>{
                mme?.menus?.filter(m=>m?.id).forEach((menu,i)=>{
                    addNewField(menu,i)
                })
            })
            onBranchChange(existingData?.office_branch)
        }
    }, [single,multiple,existingData])

    const addNewColumn = useCallback((menu, index,type) => {
        addNewField(menu, index,type)
    }, [tableColumns])

    function onBranchChange(v) {
        API.get(VENDOR_LIST_BY_BRANCH_API(v)).then(success => {
            setVendorList(success?.data?.data?.map(v => ({value: v.id, label: v.name})))
        }).then(err => {

        })
    }

    function showMenuDialog(i, func) {
        setTableIndex(i)
        console.log("func")
        setShowMenus(true)
    }

    const addNewField = (menu, index,type='add') => {
        const mappingMenuEntry = getValues('mapping_menu_entry');
        console.log(mappingMenuEntry)
        const menuData = mappingMenuEntry?.map(mme=>mme?.menus?.filter((menu)=>menu?.id).length).filter(v=>v)
        const minMenuLength = Math.min(...menuData)
        const maxMenuLength = Math.min(...menuData)
        const menuLengthNotZero = menuData.length
        console.log(menuLengthNotZero,'-----',minMenuLength,'----',tableColumns.filter(col=>col.name.toLowerCase().startsWith('menu')).length)
        if(type==='rm'){
            setTableColumns(columns => {
                // debugger
                const data = [...columns];
                const l = 2;
                if(menuData.filter(v=>v===tableColumns.filter(col=>col.name.toLowerCase().startsWith('menu')).length)<=1){
                    data.splice(l + index+1, 1)
                    data.forEach((col,ii)=>{
                        if(col.name.toLowerCase().startsWith('menu')){
                            console.log(`Menu ${ii-3+1}`)
                            data[ii] = {
                                ...col,name:`Menu ${ii-3+1}`,cell: (row, i) => {
                                    return row?.menus && row?.menus?.filter((menu)=>menu?.id)?.length>0&&<Badge bg="secondary" className="me-2">{row?.menus?.filter((menu)=>menu?.id)[ii-3]?.item}</Badge>
                                }
                            }
                        }
                    })
                }
                return data;
            })
        }
        else if(type==='add' && (minMenuLength<=index || menuLengthNotZero===1)){
            // debugger
            setTableColumns(columns => {
                const data = [...columns];
                data.splice(columns.length - 1, 0, {
                    name: `Menu ${index+1}`,
                    cell: (row, i) => {
                        return row?.menus && row?.menus?.filter((menu)=>menu?.id)?.length>0&&<Badge bg="secondary" className="me-2">{row?.menus?.filter((menu)=>menu?.id)[index]?.item}</Badge>
                    }
                })
                return data;
            })
        }

        console.log(tableColumns)
    }

    function deleteMenus() {

    }

    function submitMonthlyMenu(data, e) {
        console.log(data)
        return;
        if (onSubmitData) onSubmitData(true)
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
        API[method]((single||multiple)?MONTHLY_MENU_ENTRY_UPDATE_API(existingData?.id):MONTHLY_MENU_ENTRY_LIST_CREATE_API, data).then(success => {
            console.log(success?.data)
            success_alert(success?.data?.message)
        }).then(err => {
            console.log(err)
            error_alert(err?.data?.message)
        }).then(() => {
            if (onSubmitData) onSubmitData(false)
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
                                                disabled={(single || multiple) || false}
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
                                                        disabled={(single || multiple) || false}
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
                                                        disabled={(single || multiple) || false}
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
                            <Button variant="primary" size="md" onClick={e => {
                                e.preventDefault();
                                if (callFuncWithVendorMonthYear) {
                                    callFuncWithVendorMonthYear(getValues('vendor'), getValues('month'), getValues('year'))
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
                    <CustomTable columns={tableColumns}
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
                                                     index={tableIndex}
                                                     func={addNewColumn}/>
                    </ul>
                </Modal.Body>
            </Modal>

        </Form>
    )
}