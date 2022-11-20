import React, {useEffect, useState} from "react";
import "react-data-table-component-extensions/dist/index.css";
import "./tableStyles.css";
import PropTypes from "prop-types";
import {Form, FormControl, InputGroup} from "react-bootstrap";

function CustomTable({columns, data, size, responsive, onDataSort}) {
    const selectProps = {indeterminate: (isIndeterminate) => isIndeterminate};
    const [sortDirection, setSortDirection] = useState({});
    const [columnMapping, setColumnMapping] = useState({});
    useEffect(() => {
        setSortDirection(columns.reduce((c, p) => ({...c, [p.name]: -1}), {}))
        setColumnMapping(columns.map((v, i) => data?.reduce((c, p) => ({...c, [v.name]: Object.keys(p)[i]}), {}))
            .reduce((c, p) => ({...c, ...p}), []));
    }, [columns])
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
            console.log(type);
            if (type === 'string') {
                if (a[columnMapping[columnName]] < b[columnMapping[columnName]]) return -sortDirection[columnName]
                if (a[columnMapping[columnName]] > b[columnMapping[columnName]]) return sortDirection[columnName]
                return 0;
            } else {
                return (a[columnMapping[columnName]] - b[columnMapping[columnName]]) * sortDirection[columnName];
            }
        })
        setSortDirection({...sortDirection, [columnName]: -sortDirection[columnName]})
        console.log(sortDirection)
        if (onDataSort) {
            onDataSort(data);
        }

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
                        {data.map((v, i) => {
                            return (<tr>
                                {columns.map(column => (<td>
                                    {column.selector ? (
                                        <span
                                            className="item-title">{column.selector(v, i)}</span>) : column.cell(v, i)}
                                </td>))}
                            </tr>);
                        })}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="card-footer d-flex justify-content-between">
                <>
                    <ul className="list-pagination-prev pagination pagination-tabs card-pagination">
                        <li className="page-item"><a href="#" className="page-link ps-0 pe-4 border-end"><i
                            className="fe fe-arrow-left me-1"></i> Prev
                        </a></li>
                    </ul>
                    <ul className="list-pagination pagination pagination-tabs card-pagination">
                        <li className="active">
                            <a href="#" className="page">1</a>
                        </li>
                        <li>
                            <a href="#" className="page">2</a>
                        </li>
                        <li>
                            <a href="#" className="page">3</a>
                        </li>
                    </ul>
                    <ul className="list-pagination-next pagination pagination-tabs card-pagination">
                        <li className="page-item">
                            <a href="#" className="page-link ps-4 pe-0 border-start"><i
                                className="fe fe-arrow-right ms-1"></i> Next
                            </a></li>
                    </ul>
                </>
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
