import React from "react";
import { useTable, usePagination, useGlobalFilter, filterTypes, useSortBy, useRowSelect } from "react-table";

/////////////////////////////////////////////////////////
// REACT-TABLE version 7.0
// Plese look at the documentation only for V7
/////////////////////////////////////////////////////////

export default function DataTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    rows,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    //Filter
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      useGlobalFilter, // useGlobalFilter!
      filterTypes,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination,
    useRowSelect
  );
  return (
    <table {...getTableProps()} className="table table-striped table-hover table-bordered">
      <thead className="bg-light shadow-sm table-head">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                {/* <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <i class="fas fa-caret-down ms-2"></i>
                    ) : (
                      <i class="fas fa-caret-up ms-2"></i>
                    )
                  ) : (
                    <i class="fas fa-sort ms-2"></i>
                  )}
                </span> */}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
