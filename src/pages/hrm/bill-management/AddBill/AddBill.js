import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import React, {useEffect, useState} from "react";
import {Card, Col, Form, FormControl, Row} from "react-bootstrap";
import CustomTable from "../../../components/custom-table/CustomTable";
import Loader from "../../../components/loader/Loader";
import {BILL_LIST_API} from "../../../utils/API_ROUTES";
import {API} from "../../../utils/axios/axiosConfig";
import {BILL_LIST_TABLE_COLUMN} from "../table-columns";
import {Link} from "react-router-dom";
import {BILL_LIST_URL} from "../../../utils/APP_ROUTES";
import {FaPlus} from "react-icons/fa";
import useEmployee from "../../../hooks/useEmployee";
import Select from '../../../components/select/Select'
import useProject from "../../../hooks/useProject";

function AddBill(props) {
    const formItem = {employee:'',project:''}
    const [isLoading, setIsLoading] = useState(false);
    const [billData, setBillData] = useState([{}]);
    const [employee, setEmployee] = useState([{}]);
    const [project, setProject] = useState([{}]);
    const employeeList = useEmployee()?.map(v=>({label:v.name,value:v.id}))
    const projectList = useProject()?.map(v=>({label:v.name,value:v.id}))

    return (
        <>
            <Layout>
                <PageHeader title={"Bill List"}/>
                <Container fluid>
                    <Form>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col sm="6" xs="12" md="6">
                                        <Form.Group>
                                            <Form.Label>Select Project</Form.Label>
                                            <Select
                                                key={'project_list'}
                                                options={projectList}
                                                placeholder="--Select a project--"
                                                onChange={(v)=>setProject(v.value)}
                                                size="md"/>
                                        </Form.Group>
                                    </Col>
                                    <Col sm="6" xs="12" md="6">
                                        <Form.Group>
                                            <Form.Label>Select Employee</Form.Label>
                                            <Select
                                                key={'employee_list'}
                                                options={employeeList}
                                                placeholder="--Select a employee--"
                                                onChange={(v)=>setEmployee(v.value)}
                                                size="md"/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Form>
                </Container>
            </Layout>
            {isLoading && <Loader/>}
        </>
    )
}

export default AddBill;