import { Card, Form } from "react-bootstrap";
import React, { useState } from "react";
import Layout from "../../../../layout/Layout";
import PageHeader from "../../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import Select from "react-select";
import Loader from "../../../../components/loader/Loader";
import { REPORT_GET_YEARS_DROPDOWN, REPORT_INCREMENT_ELIGIBLE_SALARY_SUMMERY_API } from "../../../../utils/routes/api_routes/API_ROUTES";
import { API } from "../../../../utils/axios/axiosConfig";
import { error_alert } from "../../../../components/alert/Alert";
import { ELIGIBLE_TABLE_COLUMN } from "../table-columns";
import Table from "../../../../components/table/Table";
import useFetch from "../../../../hooks/useFetch";
import ExcelPdfPrint from "../../../../components/excel-pdf-print/ExcelPdfPrint";
import { ELIGIBLE_EXCEL_COLUMN } from "../excel-columns";
import TableReport from "../../../../components/table/TableReport";

export default function SalaryIncrementEligibleReport(props) {
  const { data, isLoading, err } = useFetch(REPORT_GET_YEARS_DROPDOWN);
  const yearList = data?.data?.map((v) => ({ label: v.year, value: v.year }));
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [eligibleData, setEligibleData] = useState([]);
  const loadData = async (e) => {
    setLoading(true);
    try {
      const response = await API.get(REPORT_INCREMENT_ELIGIBLE_SALARY_SUMMERY_API(e.value));
      if (response.data.statuscode === 200) {
        const d = response.data.data;
        d?.push(response.data.grand_total);
        setEligibleData(d);
      } else {
        error_alert(response.data.message);
      }
    } catch (err) {
      error_alert(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <PageHeader title={"Increment Eligible Report"} />
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
            {eligibleData.length > 0 && (
              <>
                <h3 className="text-center mt-4">Showing data for : {selectedYear}</h3>
                <hr className="mb-4" />
                <div className="text-end">
                  <ExcelPdfPrint
                    data={eligibleData}
                    columns={ELIGIBLE_EXCEL_COLUMN(selectedYear)}
                    header={"Increment Eligible Report For " + selectedYear}
                  />
                </div>
                <TableReport
                  dense
                  fixedHeader
                  fixedHeaderScrollHeight="400px"
                  columns={ELIGIBLE_TABLE_COLUMN(selectedYear)}
                  data={eligibleData}
                />
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
      {loading && <Loader />}
    </Layout>
  );
}
