import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import CustomTable from "../../../components/custom-table/CustomTable";
import Loader from "../../../components/loader/Loader";
import {BILL_LIST_API} from "../../../utils/API_ROUTES";
import {API} from "../../../utils/axios/axiosConfig";
import {BILL_LIST_TABLE_COLUMN} from "../table-columns";
import {Link} from "react-router-dom";
import {BILL_ADD_URL, BILL_LIST_URL} from "../../../utils/APP_ROUTES";
import {FaPlus} from "react-icons/fa";

function Bill(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [billData, setBillData] = useState([]);
    useEffect(() => {
        setIsLoading(true)
        API.get(BILL_LIST_API)
            .then(res => {
                setBillData(res.data.data1)
            }).catch(e => {
            console.log(e)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])
    return (
        <>
            <Layout>
                <PageHeader title={"Bill List"}/>
                <Container fluid>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-end align-items-end mb-3">
                                <Link to={BILL_ADD_URL} className="btn btn-primary btn-sm">
                                    <FaPlus/> Add New Bill
                                </Link>
                            </div>
                            <CustomTable
                                columns={BILL_LIST_TABLE_COLUMN}
                                data={billData}
                                size={"sm"}
                                // pagination
                                responsive
                            />
                        </Card.Body>
                    </Card>
                </Container>
            </Layout>
            {isLoading && <Loader/>}
        </>
    )
}

export default Bill;