import {Card, Form} from "react-bootstrap";
import React, {useRef, useState} from "react";
import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import Select from "react-select";
import Loader from "../../../components/loader/Loader";
import {REPORT_GET_YEARS_DROPDOWN, REPORT_PIVOT_SALARY_SUMMERY_API} from "../../../utils/API_ROUTES";
import {API} from "../../../utils/axios/axiosConfig";
import {error_alert} from "../../../components/alert/Alert";
import {PIVOT_TABLE_COLUMN} from "../table-columns";
import useFetch from "../../../hooks/useFetch";
import {PIVOT_EXCEL_COLUMN} from "../excel-columns";
import ExcelPdfPrint from "../../../components/excel-pdf-print/ExcelPdfPrint";
import CustomTable from "../../../components/custom-table/CustomTable";
import TableReport from "../../../components/table/TableReport";

export default function SalaryPivotReport(props) {
    // const currentYear = moment().year();
    // const yearList = [currentYear - 2, currentYear - 1, currentYear].map(v => ({label: v, value: v}));
    const {data, err} = useFetch(REPORT_GET_YEARS_DROPDOWN);
    const yearList = data?.data?.map(v => ({label: v.year, value: v.year}));
    const [selectedYear, setSelectedYear] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [pivotData, setPivotData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [tableColumn, setTableColumn] = useState([]);
    const tableRef = useRef();
    const loadData = async (e) => {
        setIsLoading(true)
        try {
            const response = await API.get(REPORT_PIVOT_SALARY_SUMMERY_API(e.value));
            setPivotData(response.data.data)
        } catch (err) {
            console.log(err)
            error_alert(err?.response?.data);
        } finally {
            setIsLoading(false);
        }
    }
    const afterDataSort = (data)=>{
        setPivotData(data);
    }


    return (
        <>
            <Layout>
                <PageHeader title={"Assessment Full Report"}/>
                <Container fluid>
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
                            {pivotData &&
                                <ExcelPdfPrint
                                    data={pivotData}
                                    columns={PIVOT_EXCEL_COLUMN(selectedYear)}
                                    header={"Salary Pivot Summary Report For " + selectedYear}
                                />}
                            <TableReport columns={PIVOT_TABLE_COLUMN(selectedYear)} data={pivotData}/>
                            {/*<CustomTable
                                columns={PIVOT_TABLE_COLUMN(selectedYear)}
                                data={pivotData}
                                size={'sm'}
                                onDataSort={(data)=>setPivotData(data)}
                                pagination
                                responsive/>*/}
                        </Card.Body>
                    </Card>
                </Container>
                {isLoading && <Loader/>}
            </Layout>
        </>
    )
}