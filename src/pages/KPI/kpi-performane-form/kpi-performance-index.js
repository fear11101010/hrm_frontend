import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {KPI_PERMORMANCE_FORM_PAGE} from "../../../utils/APP_ROUTES";
import {USER_INFO} from "../../../utils/session/token";

function KpiPerformanceIndex(props) {
    const [data,setData] = useState();
    // const column =
    return (
        <Layout>
            <PageHeader subTitle={""} title={"KPI Performance Form List"}/>
            <Container fluid>
                <Table>
                    <tr>
                        <th>1</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>my data</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>DS00914</td>
                        <td>MD. Arafat Hossain</td>
                        <td>Software Engineer</td>
                        <td>
                            {JSON.stringify(USER_INFO())}
                        </td>
                        <td>
                            <Link to={KPI_PERMORMANCE_FORM_PAGE} style={{marginRight: '10px'}}>
                                <i className="fe fe-edit"></i>
                            </Link>
                            <a href="#">
                                <i className="fe fe-info"></i>
                            </a>
                        </td>
                    </tr>
                </Table>
            </Container>
        </Layout>
    )
}

export default KpiPerformanceIndex;