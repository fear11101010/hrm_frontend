import {Button, ButtonGroup, Card, Form} from "react-bootstrap";
import React from "react";
import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import Select from "react-select";
import Loader from "../../../components/loader/Loader";
import moment from "moment";
import {useState} from "react";
import {REPORT_GET_YEARS_DROPDOWN, REPORT_PIVOT_SALARY_SUMMERY_API} from "../../../utils/API_ROUTES";
import {API} from "../../../utils/axios/axiosConfig";
import {error_alert} from "../../../components/alert/Alert";
import {PIVOT_TABLE_COLUMN} from "../table-columns";
import Table from "../../../components/table/Table";
import useFetch from "../../../hooks/useFetch";
import {FaFileExcel, FaFilePdf, FaPrint} from 'react-icons/fa'
import {PIVOT_EXCEL_COLUMN} from "../excel-columns";
import * as XLSX from 'xlsx/xlsx.mjs';
export default function SalaryPivotReport(props) {
    // const currentYear = moment().year();
    // const yearList = [currentYear - 2, currentYear - 1, currentYear].map(v => ({label: v, value: v}));
    const {data,err} = useFetch(REPORT_GET_YEARS_DROPDOWN);
    const yearList = data?.data?.map(v => ({label: v.year, value: v.year}));
    const [selectedYear, setSelectedYear] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [pivotData, setPivotData] = useState([]);
    const loadData = async (e)=>{
        setIsLoading(true)
        try{
            const response = await API.get(REPORT_PIVOT_SALARY_SUMMERY_API(e.value));
            setPivotData(response.data.data)
        }catch (err) {
            console.log(err)
            error_alert(err?.response?.data);
        }finally {
            setIsLoading(false);
        }
    }
    const generateExcel=(e)=>{
        const excelColumns = ((Array.isArray(pivotData)&&pivotData)||pivotData)
            .map((pv,i)=>{
                // return {...PIVOT_EXCEL_COLUMN(selectedYear).map(({key,value})=>({[key]:value(pv,i)}))}
                return PIVOT_EXCEL_COLUMN(selectedYear).reduce((c,p)=>({...c,[p.key]:p.value(pv,i)}),{})
            })
        console.log(excelColumns);
        const worksheet = XLSX.utils.json_to_sheet(excelColumns);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");
        return XLSX.writeFile(workbook,"salary_pivot_report.xlsx");
    }
    return (
        <Layout>
            <PageHeader title={"Assessment Full Report"}/>
            <Container>
                <Card>
                    <Card.Body>
                        <div className="w-50 m-auto">
                            <Form>
                                <Form.Group>
                                    <Form.Label>Select Year</Form.Label>
                                    <Select
                                        options={yearList}
                                        placeholder="Select a year"
                                        onChange={(e) => {
                                            setSelectedYear(e.value);
                                            loadData(e)
                                        }}
                                    />
                                </Form.Group>
                            </Form>
                        </div>
                        <h3 className="text-center mt-4">Showing data for : {selectedYear}</h3>
                        <hr className="mb-4"/>
                        <div className="mb-2">
                            {(pivotData && Array.isArray(pivotData) && pivotData.length>0) &&(<ButtonGroup>
                                <Button variant="primary" size="sm" onClick={generateExcel}>
                                    <FaFileExcel/> Excel
                                </Button>
                                <Button variant="primary" size="sm">
                                    <FaFilePdf/> Pdf
                                </Button>
                                <Button variant="primary" size="sm">
                                    <FaPrint/> Print
                                </Button>
                            </ButtonGroup>)}
                        </div>
                        <Table columns={PIVOT_TABLE_COLUMN(selectedYear)} data={pivotData}/>
                    </Card.Body>
                </Card>
            </Container>
            {isLoading && <Loader/>}
        </Layout>
    )
}