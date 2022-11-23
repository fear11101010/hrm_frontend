import {Accordion, Card, Col, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import useSbu from "../../../hooks/SBU/useSbu";
import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import Select from "react-select";
import Loader from "../../../components/loader/Loader";
import {SALARY_PIVOT_SUMMARY_REPORT_URL} from "../../../utils/APP_ROUTES";
import useFetch from "../../../hooks/useFetch";
import {REPORT_FULL_SUMMERY_API} from "../../../utils/API_ROUTES";
import {API} from "../../../utils/axios/axiosConfig";
import moment from "moment";
import ExcelPdfPrint from "../../../components/excel-pdf-print/ExcelPdfPrint";
import {SALARY_FULL_REPORT} from "../excel-columns";
import CustomTable from "../../../components/custom-table/CustomTable";
import {SALARY_FULL_REPORT_TABLE_COLUMN} from "../table-columns";

export default function AssessmentYearReport(props) {
    const {data, isLoading} = useSbu();
    const [loading, setLoading] = useState(false);
    const [selectedSbu, setSelectedSbu] = useState("");
    const [summaryData, setSummaryData] = useState("");
    const [selectedSbuName, setSelectedSbuName] = useState("");
    const [lastThreeYearData, setLastThreeYearData] = useState({});
    const [employeeDetail, setEmployeeDetail] = useState({});
    const [allDsId, setAllDsId] = useState({});
    const currentYear = moment().year();
    const lastThreeYear = [currentYear-2,currentYear-1,currentYear];
    const sbuList = data?.map((d) => ({label: d.name, value: d.id}));
    const durations = (date)=>{
        const duration = moment.duration(moment().diff(date));
        return `${duration.years()} years, ${duration.months()} month`
    }
    const loadLastThreeYearData = async (e)=>{
        setLoading(true)
        try{
            const res = await API.get(REPORT_FULL_SUMMERY_API(e.value))

            if(Array.isArray(res.data.data)){
                const em = res.data.data.reduce((c,p)=> {
                    const obj = Object.values(p)[0];
                    const len = Object.values(p)[0]?.length;
                    const emm = Object.values(Object.values(p)[0][len-1])[0].employee;
                    return ({...c, [Object.keys(p)[0]]: emm})
                },{})
                const lty = res.data.data.reduce((c,p)=>{
                    const key = Object.keys(p)[0];
                    const values = Object.values(p)[0].reduce((a,c)=>({...a,...c}),{});
                    return {...c,[key]:values}
                },{});
                setLastThreeYearData({...lty});
                setAllDsId(res.data.data.map(v=>Object.keys(v)[0]));
                setEmployeeDetail(em);
                console.log(lastThreeYearData)
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    return (
        <Layout>
            <PageHeader title={"Assessment Year Report"}/>
            <Container fluid>
                <Card>
                    <Card.Body>
                        <div className="w-100 m-auto">
                            <Form >
                                <Form.Group>
                                    <Form.Label>SBU</Form.Label>
                                    <Select
                                        options={sbuList}
                                        placeholder="Select SBU"
                                        onChange={(e) => {
                                            setSelectedSbu(e.value);
                                            setSelectedSbuName(e.label);
                                            loadLastThreeYearData(e);
                                        }}
                                    />
                                </Form.Group>
                            </Form>
                        </div>
                        <hr className="mb-4"/>
                        {lastThreeYearData && <ExcelPdfPrint
                            exportPdf={false}
                            print={false}
                            header="Assessment Year Report"
                            data={Object.values(lastThreeYearData)}
                            columns={SALARY_FULL_REPORT(lastThreeYear)}/>
                        }
                        <CustomTable responsive data={Object.values(lastThreeYearData)} columns={SALARY_FULL_REPORT_TABLE_COLUMN(lastThreeYear)} size={"sm"}/>
                    </Card.Body>
                </Card>
            </Container>
            {(isLoading || loading) && <Loader/>}
        </Layout>
    )
}