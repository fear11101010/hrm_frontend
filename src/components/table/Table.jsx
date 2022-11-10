import React from "react";
import DataTable from "react-data-table-component";
import "./tableStyles.js";
import { tableStyles } from "./tableStyles.js";

export default function Table(props) {
  const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };
  return (
    <>
      <DataTable
        pagination
        selectableRowsComponentProps={selectProps}
        selectableRowsHighlight
        striped
        customStyles={tableStyles}
        {...props}
      />
    </>
  );
}
