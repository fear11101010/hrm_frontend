import Layout from "../../../../../../layout/Layout";
import PageHeader from "../../../../../../components/header/PageHeader";
import Content from "../../../../../../components/content/Content";
import {useEffect, useState} from "react";
import useFetch from "../../../../../../hooks/useFetch";
import {
    BRANCH_LIST_CREATE_API,
    VENDOR_LIST_BY_BRANCH_API,
    VENDOR_MENU_LIST_CREATE_API,
    VENDOR_MENU_UPDATE_DELETE_API
} from "../../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {API} from "../../../../../../utils/axios/axiosConfig";
import {error_alert, success_alert} from "../../../../../../components/alert/Alert";
import {Button, Form, Modal} from "react-bootstrap";
import {FaPlus, FaTrash} from "react-icons/fa";
import CustomTable from "../../../../../../components/custom-table/CustomTable";
import Loader from "../../../../../../components/loader/Loader";
import Select from "../../../../../../components/select/Select";
import {VENDOR_MENU_LIST_TABLE_COLUMNS} from "../table-columns";

export default function VendorMenuList(props) {
    const [refresh, setRefresh] = useState(false);
    const {data, isLoading} = useFetch(VENDOR_MENU_LIST_CREATE_API, refresh)

    const {register, handleSubmit, formState: {errors,isValid},trigger, reset, getValues, control} = useForm();
    const {fields,append,insert,remove} = useFieldArray({
        control,
        name:'menus'
    })
    const [addVendorMenuModal, setAddVendorMenuModal] = useState(false);
    const [branchList, setBranchList] = useState([]);
    const [vendorList, setVendorList] = useState([]);
    const [updateVendorMenuModal, setUpdateVendorMenuModal] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        API.get(BRANCH_LIST_CREATE_API).then(success => {
            console.log(success?.data?.data)
            setBranchList(success?.data?.data?.map(v => ({value: v.id, label: v.name})))
        }).then(err => {

        })
    }, [])

    const onBranchChange = async (v) => {
        reset(formValues=>({...formValues,vendor: ''}))
        remove(fields.map((item,i)=>i));
        const r = await trigger('vendor');
        console.log('triggerrrrrrrrr :', r);
        API.get(VENDOR_LIST_BY_BRANCH_API(v)).then(success => {
            setVendorList(success?.data?.data?.map(v => ({value: v.id, label: v.name})))

        }).then(err => {

        })
    }

    function updateVendorMenu(data, e) {
        setLoading(true)
        API.put(VENDOR_MENU_UPDATE_DELETE_API(data.id), data).then(success => {
            success_alert(success?.data?.message)
            setRefresh(!refresh)
        }).catch(error => {
            error_alert(error.data.message)
        }).finally(() => {
            setLoading(false);
            setUpdateVendorMenuModal(false);
        })
    }

    function createVendorMenu(data, e) {
        console.log(data);
        setLoading(true)
        API.post(VENDOR_MENU_LIST_CREATE_API, data).then(success => {
            success_alert(success?.data?.message)
            setRefresh(!refresh)
            remove(fields.map((item,i)=>i))
            reset({});
        }).catch(error => {
            error_alert(error.data.message)
        }).finally(() => {
            setLoading(false);
            setAddVendorMenuModal(false)

        })
    }

    async function editVendorMenu(e, i) {
        await onBranchChange(data?.data[i]?.office_branch?.id)
        reset({
            id: data?.data[i]?.id,
            office_branch: data?.data[i]?.office_branch?.id,
            vendor: data?.data[i]?.vendor
        })
        remove(fields.map((item,i)=>i))
        append({
            name:data?.data[i]?.name,
            price:data?.data[i]?.price,
            active:data?.data[i]?.active,
            item:data?.data[i]?.item,
            vendor:data?.data[i]?.vendor,
        })

        setUpdateVendorMenuModal(true)
    }

    console.log(errors)

    function removeMenuItem(e,i) {
        e.preventDefault();
        remove(i);
    }

    return (
        <Layout>
            <PageHeader title="Vendor Menus"/>
            <Content>
                <div className="d-flex justify-content-end mb-3">
                    <Button variant="primary" size="sm" onClick={async e =>  {
                        setAddVendorMenuModal(true);
                        reset({office_branch: '',vendor:''});
                        remove(fields.map((item,i)=>i));
                        await trigger()
                    }}>
                        <FaPlus/> Create
                    </Button>
                </div>
                <CustomTable pagination={{show: false}} data={data?.data} size="sm"
                             columns={VENDOR_MENU_LIST_TABLE_COLUMNS(editVendorMenu, (e, i) => {
                             })}/>
            </Content>
            <Modal show={updateVendorMenuModal} onHide={() => setUpdateVendorMenuModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Branch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(updateVendorMenu)}>
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
                        <Form.Group className="mb-4">
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
                        {fields.map((item,index)=>(
                            <div key={item.id} className="p-2 shadow-sm mb-3">
                                <Form.Group className="mb-2">
                                    <Form.Label>
                                        Item Name
                                    </Form.Label>
                                    <Form.Control
                                        placeholder="Enter Menu Item name"
                                        type="text"
                                        {...register(`menus.${index}.item`,{required:true} )}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        placeholder="Menu Price"
                                        type="text"
                                        {...register(`menus.${index}.price`,{required:true} )}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Is Active"
                                        value={1}
                                        {...register(`menus.${index}.active`)}
                                    />
                                </Form.Group>
                            </div>
                        ))}
                        <Button type="submit" variant="primary">
                            Update Vendor
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={addVendorMenuModal} onHide={() => setAddVendorMenuModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(createVendorMenu)}>
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
                        <Form.Group className="mb-4">
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
                        {fields.length>0 && (<div className="d-flex justify-content-end align-items-end mb-3">
                            <Button variant="primary" size="sm" onClick={e => {
                                e.preventDefault();
                                append({
                                    name: `Menu ${fields.length + 1}`,
                                    item: '',
                                    vendor: getValues('vendor'),
                                    active: 1,
                                    price: 0
                                });
                            }}>
                                <FaPlus/> Add Menu
                            </Button>
                        </div>)}
                        {fields.map((item,index)=>(
                            <div key={item.id} className="p-2 shadow-sm mb-3">
                                <Form.Control
                                    type="hidden"
                                    value={`Menu ${index+1}`}
                                    {...register(`menus.${index}.name`,{required:true} )}
                                />
                                <Form.Control
                                    type="hidden"
                                    value={getValues('vendor')}
                                    {...register(`menus.${index}.vendor`,{required:true})}
                                />
                                <Form.Group className="mb-2">
                                    <Form.Label className="d-flex justify-content-between align-items-center">
                                        Item Name <Button onClick={e=>removeMenuItem(e,index)} disabled={fields.length<=1} variant="danger" size="sm"><FaTrash/></Button>
                                    </Form.Label>
                                    <Form.Control
                                        placeholder="Enter Menu Item name"
                                        type="text"
                                        {...register(`menus.${index}.item`,{required:true} )}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        placeholder="Menu Price"
                                        type="text"
                                        {...register(`menus.${index}.price`,{required:true} )}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Is Active"
                                        value={1}
                                        {...register(`menus.${index}.active`)}
                                    />
                                </Form.Group>
                            </div>
                        ))}

                        <Button type="submit" disabled={!isValid|| !getValues('menus')} variant="primary">
                            Create Menu
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {(loading || isLoading) && <Loader/>}
        </Layout>
    )
}