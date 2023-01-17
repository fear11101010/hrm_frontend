import Layout from "../../../../../layout/Layout";
import PageHeader from "../../../../../components/header/PageHeader";
import Content from "../../../../../components/content/Content";
import {Button, Form, Modal} from "react-bootstrap";
import Loader from "../../../../../components/loader/Loader";
import {useForm} from "react-hook-form";
import {useState} from "react";
import useFetch from "../../../../../hooks/useFetch";
import {BRANCH_LIST_CREATE_API, BRANCH_UPDATE_DELETE_API} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import {API} from "../../../../../utils/axios/axiosConfig";
import {error_alert, success_alert} from "../../../../../components/alert/Alert";
import {FaPlus} from "react-icons/fa";
import CustomTable from "../../../../../components/custom-table/CustomTable";
import {BRANCH_TABLE_COLUMNS} from "./table-columns";

export default function BranchList(props) {
    const [refresh, setRefresh] = useState(false);
    const {data, isLoading} = useFetch(BRANCH_LIST_CREATE_API, refresh)
    const {register, handleSubmit, formState: {errors}, reset, getValues} = useForm();
    const [addBranchModal, setAddBranchModal] = useState(false);
    const [updateBranchModal, setUpdateBranchModal] = useState(false);
    const [loading, setLoading] = useState(false);

    function updateBranch(data,e) {
        setLoading(true)
        API.put(BRANCH_UPDATE_DELETE_API(data.id), data).then(success => {
            success_alert(success?.data?.message)
            setRefresh(!refresh)
        }).catch(error => {
            error_alert(error.data.message)
        }).finally(() => {
            setLoading(false);
            setUpdateBranchModal(false);
        })
    }

    function createBranch(data, e) {
        setLoading(true)
        API.post(BRANCH_LIST_CREATE_API, data).then(success => {
            success_alert(success?.data?.message)
            setRefresh(!refresh)
        }).catch(error => {
            error_alert(error.data.message)
        }).finally(() => {
            setLoading(false);
            setAddBranchModal(false)
        })
    }

    function editBranch(e, i) {
        reset({name: data?.data[i]?.name, id: data?.data[i]?.id})
        setUpdateBranchModal(true)
    }

    return (
        <Layout>
            <PageHeader title="Branches"/>
            <Content>
                <div className="d-flex justify-content-end mb-3">
                    <Button variant="primary" size="sm" onClick={e => {
                        setAddBranchModal(true);
                        reset({name: ''})
                    }}>
                        <FaPlus/> Create
                    </Button>
                </div>
                <CustomTable pagination={{show: false}} data={data?.data} size="sm"
                             columns={BRANCH_TABLE_COLUMNS(editBranch, (e, i) => {
                             })}/>
            </Content>
            <Modal show={updateBranchModal} onHide={() => setUpdateBranchModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Branch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(updateBranch)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Subsidy Name</Form.Label>
                            <Form.Control
                                placeholder="Enter Branch name"
                                type="text"
                                {...register('name', {required: true})}
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Update Branch
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={addBranchModal} onHide={() => setAddBranchModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Subsidy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(createBranch)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Branch Name</Form.Label>
                            <Form.Control
                                placeholder="Enter Branch name"
                                type="text"
                                {...register('name', {required: true})}
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Create Branch
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {(loading || isLoading) && <Loader/>}
        </Layout>
    )
}