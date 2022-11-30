import React from "react";
import Content from "../../../components/content/Content";
import CustomTable from "../../../components/custom-table/CustomTable";
import ExcelPdfPrint from "../../../components/excel-pdf-print/ExcelPdfPrint";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import useFetch from "../../../hooks/useFetch";
import Layout from "../../../layout/Layout";
import { SBU_ASSESTMENT_REPORT_GET } from "../../../utils/API_ROUTES";
import { SBU_ASSESTMENT_REPORT_TABLE_COLUMN } from "../table-columns";

export default function SbuAssestmentData() {
  const { data, isLoading } = useFetch(SBU_ASSESTMENT_REPORT_GET);

  return (
    <Layout>
      {isLoading && <Loader />}
      <PageHeader title={"SBU Assestment Data"} />
      <Content>
        {/* <div className="text-end">
          <ExcelPdfPrint
            exportPdf={false}
            print={false}
            header="Assessment Year Report"
            data={data.data}
            // columns={SBU_ASSESTMENT_REPORT_TABLE_COLUMN}
          />
        </div> */}
        <Table />
      </Content>
    </Layout>
  );
}
