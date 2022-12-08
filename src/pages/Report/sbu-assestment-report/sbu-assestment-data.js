import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ReactSelect from "react-select";
import { error_alert } from "../../../components/alert/Alert";
import Content from "../../../components/content/Content";
import ExcelPdfPrint from "../../../components/excel-pdf-print/ExcelPdfPrint";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import Layout from "../../../layout/Layout";
import { SBU_ASSESTMENT_REPORT_GET } from "../../../utils/API_ROUTES";
import { API } from "../../../utils/axios/axiosConfig";
import { YEAR_RANGE } from "../../../utils/CONSTANT";
import { USER_INFO } from "../../../utils/session/token";
import { SBU_ASSESTMENT_REPORT_EXCEL_COLUMN } from "../excel-columns";
import { SBU_ASSESTMENT_REPORT_TABLE_COLUMN } from "../table-columns";

export default function SbuAssestmentData() {
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState("");
  const [data, setData] = useState([]);

  const fetchData = () => {
    setLoading(true);
    API.get(SBU_ASSESTMENT_REPORT_GET(year))
      .then((res) => {
        if (res.data.statuscode === 200) {
          setData(res.data.data);
          if (res.data.data.length === 0) {
            error_alert("No data found");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (year !== "") {
      fetchData();
    }
  }, [year]);

  return (
    <Layout>
      {loading && <Loader />}
      <PageHeader title={"SBU Assestment Report"} />
      <Content>
        <Form className="m-auto w-50 mb-3">
          <Form.Group>
            <Form.Label>Select Year</Form.Label>
            <ReactSelect
              options={YEAR_RANGE}
              onChange={(e) => {
                setYear(e.value);
              }}
            />
          </Form.Group>
        </Form>
        {data.length > 0 && (
          <>
            <hr />
            <div className="text-end">
              <ExcelPdfPrint
                exportPdf={false}
                print={false}
                header="SBU Assestment Report"
                data={data}
                columns={SBU_ASSESTMENT_REPORT_EXCEL_COLUMN}
              />
            </div>
            <Table dense columns={SBU_ASSESTMENT_REPORT_TABLE_COLUMN} data={data} />
          </>
        )}
      </Content>
    </Layout>
  );
}
