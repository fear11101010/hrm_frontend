import Layout from "../../../../../layout/Layout";
import PageHeader from "../../../../../components/header/PageHeader";
import Content from "../../../../../components/content/Content";
import {useEffect, useState} from "react";
import useFetch from "../../../../../hooks/useFetch";
import {BRANCH_LIST_CREATE_API} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import {Controller, useForm} from "react-hook-form";
import {API} from "../../../../../utils/axios/axiosConfig";
import {error_alert, success_alert} from "../../../../../components/alert/Alert";
import {Button, Form, Modal} from "react-bootstrap";
import {FaPlus} from "react-icons/fa";
import CustomTable from "../../../../../../components/custom-table/CustomTable";
import Loader from "../../../../../../components/loader/Loader";
import Select from "../../../../../../components/select/Select";
import {VENDOR_LIST_TABLE_COLUMNS} from "../table-columns";
import {
    VENDOR_MENU_LIST_CREATE_API,
    VENDOR_MENU_UPDATE_DELETE_API
} from "../../../../../../utils/routes/api_routes/LUNCH_ROUTES";

export default function VendorMenuList(props) {
    const [refresh, setRefresh] = useState(false);
    const {data, isLoading} = useFetch(VENDOR_MENU_LIST_CREATE_API, refresh)

    const {register, handleSubmit, formState: {errors}, reset, getValues, control} = useForm();
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

    const onBranchChange = (v) => {
        API.get(VENDOR_MENU_LIST_CREATE_API).then(success => {
            setVendorList(success?.data?.data?.map(v => ({value: v.id, label: v.name})))
            reset({vendor: ''})
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
        setLoading(true)
        API.post(VENDOR_MENU_LIST_CREATE_API, data).then(success => {
            success_alert(success?.data?.message)
            setRefresh(!refresh)
        }).catch(error => {
            error_alert(error.data.message)
        }).finally(() => {
            setLoading(false);
            setAddVendorMenuModal(false)
        })
    }

    function editBranch(e, i) {
        reset({
            name: data?.data[i]?.name,
            item: data?.data[i]?.item,
            id: data?.data[i]?.id,
            office_branch: data?.data[i]?.office_branch,
            vendor: data?.data[i]?.vendor}
        )
        setUpdateVendorMenuModal(true)
    }

    return (
        <Layout>
            <PageHeader title="Vendor Menus"/>
            <Content>
                <div className="d-flex justify-content-end mb-3">
                    <Button variant="primary" size="sm" onClick={e => {
                        setAddVendorMenuModal(true);
                        reset({name: '', office_branch: ''})
                    }}>
                        <FaPlus/> Create
                    </Button>
                </div>
                <CustomTable pagination={{show: false}} data={data?.data} size="sm"
                             columns={VENDOR_LIST_TABLE_COLUMNS(editBranch, (e, i) => {
                             })}/>
            </Content>
            <Modal show={updateVendorMenuModal} onHide={() => setUpdateVendorMenuModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Branch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(updateVendorMenu)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Vendor Name</Form.Label>
                            <Form.Control
                                placeholder="Enter Vendor name"
                                type="text"
                                {...register('name', {required: true})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
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
                        <Form.Group className="mb-4">
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
                        <Button type="submit" variant="primary">
                            Update Vendor
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={addVendorMenuModal} onHide={() => setAddVendorMenuModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Subsidy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(createVendorMenu)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Vendor Name</Form.Label>
                            <Form.Control
                                placeholder="Enter Vendor name"
                                type="text"
                                {...register('name', {required: true})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
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
                                            onChange={v => onChange(v.value)}/>

                                        {error && (
                                            <div className="invalid-feedback">Select a branch</div>)}
                                    </>
                                )}/>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Create Subsidy
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {(loading || isLoading) && <Loader/>}
        </Layout>
    )
}