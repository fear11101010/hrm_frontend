import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import "./tableStyles.js";
import "./extenstion.css";
import { tableStyles } from "./tableStyles.js";
import { BiSort } from "react-icons/bi";
import { Form } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

export default function Table({ ...props }) {
  const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };
  const sortIcon = <BiSort size={0.5} />;

  return (
    <div>
      <DataTableExtensions export={false} print={false} {...props}>
        <DataTable
          pagination
          selectableRowsComponentProps={selectProps}
          selectableRowsHighlight
          // striped
          // data={data}
          // columns={columns}
          customStyles={tableStyles}
          sortIcon={sortIcon}
          {...props}
        />
      </DataTableExtensions>
    </div>
  );
}

// const [searchedData, setSearchedData] = useState([]);
// const [seachedQ, setSearchedQ] = useState("");

// const handleSearching = (e) => {
//   setSearchedQ(e.target.value.toLowerCase());
//   const search_result = data.filter((d) => d);
//   console.log(search_result);
// };
// const filter_template = () => (
//   <div className="mb-2 d-flex justify-content-between">
//     <div class="input-group input-group-flush input-group-merge input-group-reverse border rounded px-3">
//       <input
//         class="form-control list-search"
//         type="search"
//         placeholder="Search"
//         onChange={(e) => {
//           handleSearching(e);
//         }}
//       />
//       <span class="input-group-text">
//         <i class="fe fe-search"></i>
//       </span>
//     </div>
//     <Dropdown className="text-end ms-2">
//       <Dropdown.Toggle variant="light" id="dropdown-basic" className="fw-bold">
//         <i className="fe fe-sliders"></i> Filter
//       </Dropdown.Toggle>
//       <Dropdown.Menu style={{ minWidth: "300px" }}>
//         <div className="">
//           <h3 className="mb-0 px-3">Filters</h3>
//           <hr className="mt-2" />
//         </div>
//         <div className="px-3">{children}</div>
//       </Dropdown.Menu>
//     </Dropdown>
//   </div>
// );
