import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import "./tableStyles.js";
import "./extenstion.css";
import { tableStyles } from "./tableStyles.js";

export default function Table(props) {
  const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };
  return (
    <>
      <DataTableExtensions export={false} print={false} {...props}>
        <DataTable
          pagination
          selectableRowsComponentProps={selectProps}
          selectableRowsHighlight
          striped
          customStyles={tableStyles}
          {...props}
        />
      </DataTableExtensions>
    </>
  );
}
