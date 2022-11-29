import React, { useEffect, useState } from "react";
import "react-data-table-component-extensions/dist/index.css";
import "./tableStyles.css";
import PropTypes from "prop-types";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import Pagination from "./pagination";
import Select from "../select/Select";

function CustomTable({ columns, data, size, responsive, onDataSort, pagination }) {
  const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };
  const [sortDirection, setSortDirection] = useState({});
  const [columnMapping, setColumnMapping] = useState({});
  const [dataMapping, setDataMapping] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    console.log(data);
    setTableRows(pagination ? data?.slice(0, 5) : data);
    setPageNumber(1);
    setSortDirection(columns.reduce((c, p) => ({ ...c, [p.name]: -1 }), {}));
    setColumnMapping(columns.map((v, i) => v.name));
  }, [data]);
  const getHeaderCell = (column) => {
    if (column.sortable) {
      return (
        <a className="list-sort text-muted" onClick={(e) => sortTableData(e, column.name)} data-sort={column.name} href="#">
          {column.name}
        </a>
      );
    }
    return column.name;
  };
  const sortTableData = (event, columnName) => {
    event.preventDefault();
    const colIndex = columnMapping.findIndex(v=>v===columnName);
    console.log(colIndex)
    if(colIndex>=0){
      data.sort((a,b)=>{
        const valueA = columns[colIndex]?.selector?columns[colIndex]?.selector(a,colIndex):null;
        const valueB = columns[colIndex]?.selector?columns[colIndex]?.selector(b,colIndex):null;
        const type = typeof valueA;
        if (type === "string") {
          if (valueA < valueB) return -sortDirection[columnName];
          if (valueA > valueB) return sortDirection[columnName];
          return 0;
        } else {
          return (valueA - valueB) * sortDirection[columnName];
        }
      })
      setTableRows(pagination ? data?.slice((pageNumber - 1) * 5, pageNumber * 5) : data);
      setSortDirection({ ...sortDirection, [columnName]: -sortDirection[columnName] });
      if (onDataSort) {
        onDataSort(data);
      }
    }

  };
  const onPageChange = (page) => {
    setTableRows(data?.slice((page - 1) * 5, page * 5));
    setPageNumber(page);
  };
  return (
    <div className="card">
      <div className="card-header">
        <div className="row align-items-center">
          <div className="col">
            <Form>
              <InputGroup className={"input-group-flush input-group-merge input-group-reverse"}>
                <FormControl type="search" placeholder="Search" className="list-search" aria-describedby="search_table" />
                <InputGroup.Text id="search_table">
                  <i className="fe fe-search"></i>
                </InputGroup.Text>
              </InputGroup>
            </Form>
          </div>
          <div className="col-auto me-n3">
            <Form>{pagination && <Select />}</Form>
          </div>
        </div>
      </div>
      <div className={responsive ? "table-responsive" : ""}>
        {data && Array.isArray(data) && (
          <table className={`table card-table table-nowrap table-${size}`}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th>{getHeaderCell(column)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((v, i) => {
                return (
                  <tr>
                    {columns.map((column) => (
                      <td>
                        {column.cell ? (
                            column.cell(v, (pageNumber - 1) * 5 + i)
                        ) : (
                            <span className="item-title">{column.selector(v, (pageNumber - 1) * 5 + i)}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="card-footer d-flex justify-content-between">
        {pagination && <Pagination data={data} rowPerPage={5} onPageChange={onPageChange} />}
      </div>
    </div>
  );
}

CustomTable.propsType = {
  columns: PropTypes.array,
  data: PropTypes.array,
  size: PropTypes.oneOf(["sm"]),
  responsive: PropTypes.bool,
  onDataSort: PropTypes.func,
};
export default CustomTable;
