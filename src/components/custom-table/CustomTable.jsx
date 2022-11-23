import React, {useEffect, useState} from "react";
import "react-data-table-component-extensions/dist/index.css";
import "./tableStyles.css";
import PropTypes from "prop-types";
import {Form, FormControl, InputGroup} from "react-bootstrap";
import Pagination from "./pagination";
import Select from "../select/Select";

function CustomTable({columns, data, size, responsive, onDataSort,pagination}) {
    const selectProps = {indeterminate: (isIndeterminate) => isIndeterminate};
    const [sortDirection, setSortDirection] = useState({});
    const [columnMapping, setColumnMapping] = useState({});
    const [tableRows, setTableRows] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(() => {
        console.log(data)
        setTableRows(pagination?data?.slice(0,5):data)
        setPageNumber(1);
        setSortDirection(columns.reduce((c, p) => ({...c, [p.name]: -1}), {}))
        setColumnMapping(columns.map((v, i) => data?.reduce((c, p) => ({...c, [v.name]: Object.keys(p)[i]}), {}))
            .reduce((c, p) => ({...c, ...p}), []));
    }, [data])
    const getHeaderCell = (column) => {
        if (column.sortable) {
            return (<a className="list-sort text-muted" onClick={(e) => sortTableData(e, column.name)}
                       data-sort={column.name} href="#">{column.name}</a>)
        }
        return column.name;
    }
    const sortTableData = (event, columnName) => {
        event.preventDefault();
        data.sort((a, b) => {
            const type = typeof a[columnMapping[columnName]];
            // console.log(type);
            if (type === 'string') {
                if (a[columnMapping[columnName]] < b[columnMapping[columnName]]) return -sortDirection[columnName]
                if (a[columnMapping[columnName]] > b[columnMapping[columnName]]) return sortDirection[columnName]
                return 0;
            } else {
                return (a[columnMapping[columnName]] - b[columnMapping[columnName]]) * sortDirection[columnName];
            }
        })
        console.log(pageNumber);
        setTableRows(pagination?data?.slice((pageNumber-1)*5,pageNumber*5):data);
        setSortDirection({...sortDirection, [columnName]: -sortDirection[columnName]})
        // console.log(sortDirection)
        if (onDataSort) {
            onDataSort(data);
        }

    }
    const onPageChange = (page)=>{
        setTableRows(data?.slice((page-1)*5,page*5));
        setPageNumber(page)
    }
    return (
        <div className="card">
            <div className="card-header">
                <div className="row align-items-center">
                    <div className="col">
                        <Form>
                            <InputGroup className={"input-group-flush input-group-merge input-group-reverse"}>
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="list-search"
                                    aria-describedby="search_table"/>
                                <InputGroup.Text id="search_table">
                                    <i className="fe fe-search"></i>
                                </InputGroup.Text>
                            </InputGroup>
                        </Form>
                    </div>
                    <div className="col-auto me-n3">
                        <Form>
                            {pagination && <Select/>}
                        </Form>
                    </div>
                </div>
            </div>
            <div className={responsive ? 'table-responsive' : ''}>
                {(data && Array.isArray(data)) && (
                    <table className={`table card-table table-nowrap table-${size}`}>
                        <thead>
                        <tr>
                            {columns.map(column => (<th>{getHeaderCell(column)}</th>))}
                        </tr>
                        </thead>
                        <tbody>
                        {tableRows.map((v, i) => {
                            return (<tr>
                                {columns.map(column => (<td>
                                    {column.selector ? (
                                        <span
                                            className="item-title">{column.selector(v, (pageNumber-1)*5+i)}</span>) : column.cell(v, pageNumber)}
                                </td>))}
                            </tr>);
                        })}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="card-footer d-flex justify-content-between">
                {pagination && <Pagination data={data} rowPerPage={5} onPageChange={onPageChange}/>}
            </div>
        </div>
    );
}

CustomTable.propsType = {
    columns: PropTypes.array,
    data: PropTypes.array,
    size: PropTypes.oneOf(['sm']),
    responsive: PropTypes.bool,
    onDataSort: PropTypes.func
}
export default CustomTable
