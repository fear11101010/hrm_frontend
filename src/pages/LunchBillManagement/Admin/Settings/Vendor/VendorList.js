import Layout from "../../../../../layout/Layout";
import PageHeader from "../../../../../components/header/PageHeader";
import Content from "../../../../../components/content/Content";
import {useEffect, useState} from "react";
import useFetch from "../../../../../hooks/useFetch";
import {
    BRANCH_LIST_CREATE_API,
    BRANCH_UPDATE_DELETE_API, VENDOR_LIST_CREATE_API,
    VENDOR_UPDATE_DELETE_API
} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import {Controller, useForm} from "react-hook-form";
import {API} from "../../../../../utils/axios/axiosConfig";
import {error_alert, success_alert} from "../../../../../components/alert/Alert";
import {Button, Form, Modal} from "react-bootstrap";
import {FaPlus} from "react-icons/fa";
import CustomTable from "../../../../../components/custom-table/CustomTable";
import {BRANCH_TABLE_COLUMNS} from "../Branch/table-columns";
import Loader from "../../../../../components/loader/Loader";
import Select from "../../../../../components/select/Select";
import {VENDOR_LIST_TABLE_COLUMNS} from "./table-columns";

export default function VendorList(props){
    const [refresh, setRefresh] = useState(false);
    const {data, isLoading} = useFetch(VENDOR_LIST_CREATE_API, refresh)

    const {register, handleSubmit, formState: {errors}, reset, getValues,control} = useForm();
    const [addVendorModal, setAddVendorModal] = useState(false);
    const [branchList, setBranchList] = useState([]);
    const [updateVendorModal, setUpdateVendorModal] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        API.get(BRANCH_LIST_CREATE_API).then(success=>{
            console.log(success?.data?.data)
            setBranchList(success?.data?.data?.map(v=>({value:v.id,label:v.name})))
        }).then(err=>{

        })
    },[])
    function updateVendor(data,e) {
        setLoading(true)
        API.put(VENDOR_UPDATE_DELETE_API(data.id), data).then(success => {
            success_alert(success?.data?.message)
            setRefresh(!refresh)
        }).catch(error => {
            error_alert(error.data.message)
        }).finally(() => {
            setLoading(false);
            setUpdateVendorModal(false);
        })
    }

    function createVendor(data, e) {
        setLoading(true)
        API.post(VENDOR_LIST_CREATE_API, data).then(success => {
            success_alert(success?.data?.message)
            setRefresh(!refresh)
        }).catch(error => {
            error_alert(error.data.message)
        }).finally(() => {
            setLoading(false);
            setAddVendorModal(false)
        })
    }

    function editBranch(e, i) {
        reset({name: data?.data[i]?.name, id: data?.data[i]?.id,office_branch:data?.data[i]?.office_branch})
        setUpdateVendorModal(true)
    }
    return (
        <Layout>
            <PageHeader title="Vendors"/>
            <Content>
                <div className="d-flex justify-content-end mb-3">
                    <Button variant="primary" size="sm" onClick={e => {
                        setAddVendorModal(true);
                        reset({name: '',office_branch:''})
                    }}>
                        <FaPlus/> Create
                    </Button>
                </div>
                <CustomTable pagination={{show: false}} data={data?.data} size="sm"
                             columns={VENDOR_LIST_TABLE_COLUMNS(editBranch, (e, i) => {
                             })}/>
            </Content>
            <Modal show={updateVendorModal} onHide={() => setUpdateVendorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Branch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(updateVendor)}>
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
                            Update Vendor
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={addVendorModal} onHide={() => setAddVendorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Subsidy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(createVendor)}>
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