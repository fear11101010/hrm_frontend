import React, {useEffect, useState} from "react";
import PageHeader from "../../../components/header/PageHeader";
import Layout from "../../../layout/Layout";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {MY_TICKETS_URL, SUPPORT_DASHBOARD_STATUS_WISE_URL_FUNC} from "../../../utils/support/SP_APP_ROUTES";
import {FaArrowRight} from "react-icons/fa";
import Container from "react-bootstrap/Container";
import useFetch from "../../../hooks/useFetch";
import {SUPPORT_DASHBOARD_API} from "../../../utils/support/SP_API_ROUTES";
import {
    Bar,
    Cell,
    ComposedChart,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Sector,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const renderActiveShape = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
export default function SupportDashboard() {
    const {data,isLoading} = useFetch(SUPPORT_DASHBOARD_API);
    const [requestStatusData,setRequestStatusData] = useState([])
    const [activeIndex,setActiveIndex] = useState(0)
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    useEffect(()=>{
        if(data){
            console.log(data);
            const arr = [];
            for(const key in data){
                switch (key){
                    case 'all':
                        arr.push({name: 'Total Request', value: data?.all,fill:'#0088FE'})
                        break;
                    case 'resolved':
                        arr.push({name: 'Resolved', value: data?.resolved,fill:'#00C49F'})
                        break;
                    case 'queued':
                        arr.push({name: 'Queued', value: data?.queued,fill:'#FFBB28'})
                        break;
                    case 'in_progress':
                        arr.push({name: 'In Progress', value: data?.in_progress,fill:'#FF8042'})
                        break;
                }
            }

            setRequestStatusData(arr);
        }
    },[data])

    const onPieEnter = (_, index) => {
        setActiveIndex(index)
    };
    return (
        <Layout>
            <PageHeader subTitle={" Overview"} title={"Dashboard"}/>
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col sm="6" md="3" lg="3">
                                <Card>
                                    <Card.Body>
                                        <Row className="align-items-center">
                                            <Col>
                                                <h5 className="text-uppercase text-muted mb-2">Total Request</h5>
                                                <span className="h2 mb-0">{data?.all}</span>
                                            </Col>
                                            <Col className="col-auto">
                                                <Link to={SUPPORT_DASHBOARD_STATUS_WISE_URL_FUNC('all','All')}>
                                                    <FaArrowRight/>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm="6" md="3" lg="3">
                                <Card>
                                    <Card.Body>
                                        <Row className="align-items-center">
                                            <Col>
                                                <h5 className="text-uppercase text-muted mb-2">Resolved</h5>
                                                <span className="h2 mb-0">{data?.resolved}</span>
                                            </Col>
                                            <Col className="col-auto">
                                                <Link to={SUPPORT_DASHBOARD_STATUS_WISE_URL_FUNC(4,'Resolved')}>
                                                    <FaArrowRight/>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm="6" md="3" lg="3">
                                <Card>
                                    <Card.Body>
                                        <Row className="align-items-center">
                                            <Col>
                                                <h5 className="text-uppercase text-muted mb-2">Queued</h5>
                                                <span className="h2 mb-0">{data?.queued}</span>
                                            </Col>
                                            <Col className="col-auto">
                                                <Link to={SUPPORT_DASHBOARD_STATUS_WISE_URL_FUNC(8,'Queued')}>
                                                    <FaArrowRight/>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm="6" md="3" lg="3">
                                <Card>
                                    <Card.Body>
                                        <Row className="align-items-center">
                                            <Col>
                                                <h5 className="text-uppercase text-muted mb-2">In Progress</h5>
                                                <span className="h2 mb-0">{data?.in_progress}</span>
                                            </Col>
                                            <Col className="col-auto">
                                                <Link to={SUPPORT_DASHBOARD_STATUS_WISE_URL_FUNC(2,'In Progress')}>
                                                    <FaArrowRight/>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <ResponsiveContainer width="100%" height={300}>
                            <ComposedChart width={"100%"} data={requestStatusData}>
                                <XAxis dataKey={"name"} />
                                <YAxis dataKey={"value"} />
                                <Tooltip

                                    contentStyle={{
                                        borderRadius: "4px",
                                        border: "1px solid #666",
                                    }}
                                />
                                <Bar dataKey="value" fill="#2C7BE5" barSize={100} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card>
            </Container>

        </Layout>
    );
}
