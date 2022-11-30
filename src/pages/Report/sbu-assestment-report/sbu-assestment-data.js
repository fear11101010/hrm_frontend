import React, { useEffect, useState } from "react";
import Content from "../../../components/content/Content";
import ExcelPdfPrint from "../../../components/excel-pdf-print/ExcelPdfPrint";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import Layout from "../../../layout/Layout";
import { SBU_ASSESTMENT_REPORT_GET } from "../../../utils/API_ROUTES";
import { API } from "../../../utils/axios/axiosConfig";
import { USER_INFO } from "../../../utils/session/token";
import { SBU_ASSESTMENT_REPORT_EXCEL_COLUMN } from "../excel-columns";
import { SBU_ASSESTMENT_REPORT_TABLE_COLUMN } from "../table-columns";

export default function SbuAssestmentData() {
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = () => {
    setLoading(true);
    API.get(SBU_ASSESTMENT_REPORT_GET)
      .then((res) => {
        if (res.data.statuscode === 200) {
          setData(res.data.data);
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
    fetchData();
  }, []);
  return (
    <Layout>
      {loading && <Loader />}
      <PageHeader title={"SBU Assestment Report"} />
      <Content>
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
      </Content>
    </Layout>
  );
}
