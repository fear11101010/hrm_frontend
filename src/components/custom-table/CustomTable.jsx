import React, {useEffect, useState} from "react";
import "react-data-table-component-extensions/dist/index.css";
import "./tableStyles.css";
import PropTypes from "prop-types";
import {Form, FormControl, InputGroup} from "react-bootstrap";
import Pagination from "./pagination";
import Select from "../select/Select";
import TableHeader from "./TableHeader";

function CustomTable({columns, data, size, responsive, onDataSort, pagination:{show,perPageList}}) {
    const [dummy, setDummy] = useState(1);
    const [showPerPage, setShowPerPage] = useState(show&&perPageList[0]);
    const paginationOption = perPageList.map(p=>({value:p,label:`${p} per page`}))
    const [tableRows, setTableRows] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(() => {
        console.log(data);
        // setTableRows(show ? data?.slice(0, showPerPage) : data);
        if(!(show)){
            setTableRows(data);
        }
        // setPageNumber(1);
    }, [data]);

    const onPageChange = (page,rows) => {
        setTableRows(rows);
        setPageNumber(page);
    };
    const afterDataSort = (d) => {
        setTableRows(show ? data?.slice((pageNumber - 1) * showPerPage, pageNumber * showPerPage) : data);
        setDummy(t => -t);
    }
    return (
        <div className="card">
            <div className="card-header">
                <div className="row align-items-center">
                    <div className="col">
                        <Form>
                            <InputGroup className={"input-group-flush input-group-merge input-group-reverse"}>
                                <FormControl type="search" placeholder="Search" className="list-search"
                                             aria-describedby="search_table"/>
                                <InputGroup.Text id="search_table">
                                    <i className="fe fe-search"></i>
                                </InputGroup.Text>
                            </InputGroup>
                        </Form>
                    </div>
                    <div className="col-auto me-n3">
                        <Form>{show && <Select options={paginationOption}
                                               onChange={e=>setShowPerPage(e.value)}
                                               value={paginationOption.find(v=>v.value===showPerPage)}/>}
                        </Form>
                    </div>
                </div>
            </div>
            <div id="custom-table-container" className={responsive ? "table-responsive" : ""}>

                <table className={`table card-table table-nowrap table-${size}`}>
                    <TableHeader columns={columns} data={data} afterDataSort={afterDataSort}/>
                    {tableRows && Array.isArray(tableRows) && tableRows.length > 0 ? (
                        <tbody>
                        {tableRows.map((v, i) => {
                            return (
                                <tr>
                                    {columns.map((column) => (
                                        <td>
                                            {column.cell ? (
                                                column.cell(v, (pageNumber - 1) * showPerPage + i)
                                            ) : (
                                                <span
                                                    className="item-title">{column.selector(v, (pageNumber - 1) * showPerPage + i)}</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                        </tbody>
                    ) : (<tbody>
                    <tr key="no_data_available_row">
                        <td key="no_data_available" colSpan={columns.length}>No Data Available</td>
                    </tr>
                    </tbody>)}
                </table>
            </div>
            <div className="card-footer d-flex justify-content-between">
                {show && <Pagination data={data} rowPerPage={showPerPage} onPageChange={onPageChange}/>}
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
