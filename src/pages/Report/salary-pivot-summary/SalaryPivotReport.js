import { Card, Form } from "react-bootstrap";
import React, { useRef, useState } from "react";
import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import Select from "react-select";
import Loader from "../../../components/loader/Loader";
import { REPORT_GET_YEARS_DROPDOWN, REPORT_PIVOT_SALARY_SUMMERY_API } from "../../../utils/API_ROUTES";
import { API } from "../../../utils/axios/axiosConfig";
import { error_alert } from "../../../components/alert/Alert";
import { PIVOT_TABLE_COLUMN } from "../table-columns";
import useFetch from "../../../hooks/useFetch";
import { PIVOT_EXCEL_COLUMN } from "../excel-columns";
import ExcelPdfPrint from "../../../components/excel-pdf-print/ExcelPdfPrint";
import CustomTable from "../../../components/custom-table/CustomTable";
import TableReport from "../../../components/table/TableReport";
import Table from "../../../components/table/Table";

export default function SalaryPivotReport(props) {
  // const currentYear = moment().year();
  // const yearList = [currentYear - 2, currentYear - 1, currentYear].map(v => ({label: v, value: v}));
  const { data, err } = useFetch(REPORT_GET_YEARS_DROPDOWN);
  const yearList = data?.data?.map((v) => ({ label: v.year, value: v.year }));
  const [selectedYear, setSelectedYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pivotData, setPivotData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableColumn, setTableColumn] = useState([]);
  const tableRef = useRef();
  const loadData = async (e) => {
    setIsLoading(true);
    try {
      const response = await API.get(REPORT_PIVOT_SALARY_SUMMERY_API(e.value));
      if (response.data.statuscode === 200) {
        const d = response.data.data;
        d?.push(response.data.grand_total);
        setPivotData(d);
      } else {
        error_alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
      error_alert(err?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };
  const afterDataSort = (data) => {
    setPivotData(data);
  };

  return (
    <>
      <Layout>
        <PageHeader title={"Salary Pivot Report"} />
        <Container fluid>
          <Card>
            <Card.Body>
              <div className="w-100 m-auto">
                <Form className="w-50 m-auto">
                  <Form.Group>
                    <Form.Label>Select Year</Form.Label>
                    <Select
                      options={yearList}
                      placeholder="Select a year"
                      onChange={(e) => {
                        setSelectedYear(e.value);
                        loadData(e);
                      }}
                    />
                  </Form.Group>
                </Form>
              </div>
              {pivotData.length > 0 && (
                <>
                  <h3 className="text-center mt-4">Showing data for : {selectedYear}</h3>
                  <hr className="mb-4" />
                  <div className="text-end">
                    <ExcelPdfPrint
                      data={pivotData}
                      columns={PIVOT_EXCEL_COLUMN(selectedYear)}
                      header={"Salary Pivot Summary Report For " + selectedYear}
                    />
                  </div>

                  <Table columns={PIVOT_TABLE_COLUMN(selectedYear)} data={pivotData} />

                  {/*<TableReport columns={PIVOT_TABLE_COLUMN(selectedYear)} data={pivotData}/>*/}
                  {/* <CustomTable
                    columns={PIVOT_TABLE_COLUMN(selectedYear)}
                    data={pivotData}
                    size={"sm"}
                    onDataSort={(data) => setPivotData(data)}
                    // pagination
                    responsive
                  /> */}
                </>
              )}
            </Card.Body>
          </Card>
        </Container>
        {isLoading && <Loader />}
      </Layout>
    </>
  );
}
