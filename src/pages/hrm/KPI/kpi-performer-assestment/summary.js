import React from "react";
import DataTable from "react-data-table-component";
import Loader from "../../../../components/loader/Loader";
import Table from "../../../../components/table/Table";
import { tableStylesBordered } from "../../../../components/table/tableStyleBorder";
import { tableStyles } from "../../../../components/table/tableStyles";
import useFetch from "../../../../hooks/useFetch";
import { _Decode } from "../../../../utils/Hash";
import { KPI_PERFORMANCE_THREE_YEARS_GET } from "../../../../utils/routes/api_routes/API_ROUTES";

export default function Summary({ rowId }) {
  const id = rowId;
  const { data, isLoading } = useFetch(KPI_PERFORMANCE_THREE_YEARS_GET(id));

  const COLUMNS = [
    {
      name: "Year",
      selector: (row) => row?.year,
      width: "80px",
    },
    {
      name: "Basic Salary",
      selector: (row) => row?.basic_salary,
      cell: (row) => _Decode(row?.basic_salary?.toLocaleString("en-IN")),
      right: true,
    },
    {
      name: "Gross Salary",
      selector: (row) => row?.gross_salary,
      cell: (row) => _Decode(row?.new_gross_salary_b?.toLocaleString("en-IN")),
      right: true,
    },
    {
      name: "Increment Amount",
      selector: (row) => row?.proposed_by_sbu_director_pm_self,
      cell: (row) => _Decode(row?.proposed_by_sbu_director_pm_self?.toLocaleString("en-IN")),
      right: true,
    },
    {
      name: <div className="text-end">Proposed Amount by Director</div>,
      selector: (row) => row?.proposed_by_sbu_director_pm_self,
      cell: (row) => _Decode(row?.proposed_by_sbu_director_pm_self?.toLocaleString("en-IN")),
      right: true,
    },
    {
      name: "Percentage of Increment",
      selector: (row) => row?.percentage_of_increment,
      cell: (row) => (
        <p className="mb-0">
          {_Decode(row?.percentage_of_increment) === "None" ? "0.0" : _Decode(row?.percentage_of_increment)}%
        </p>
      ),
    },
  ];

  return (
    <>
      {isLoading && <Loader />}
      <h3 className="mb-2">{data?.data?.map((d) => d[0])}</h3>
      <DataTable data={data.data} columns={COLUMNS} customStyles={tableStylesBordered} />
      {/* <Table data={data.data} columns={COLUMNS} /> */}
    </>
  );
}
