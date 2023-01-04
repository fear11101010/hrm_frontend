import React, {useEffect, useState} from "react";
import "react-data-table-component-extensions/dist/index.css";
import "./tableStyles.css";
import PropTypes from "prop-types";
import {Form, FormControl, InputGroup} from "react-bootstrap";
import Pagination from "./pagination";
import Select from "../select/Select";
import TableHeader from "./TableHeader";

function CustomTable({columns, data,total, size, responsive, onDataSort, pagination:{show,perPageList,onPageOrLimitChange}}) {
    const [dummy, setDummy] = useState(1);

    const paginationOption = perPageList.map(p=>({value:p,label:`${p} per page`}))
    const [showPerPage, setShowPerPage] = useState(paginationOption[0]);
    const [tableRows, setTableRows] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(() => {
        // debugger
        console.log(data);
        setTableRows(data);
    }, [data]);

    const onPageChange = (page,data) => {
        setPageNumber(page);
        if(data){
            setTableRows(data);
        }
        if(onPageOrLimitChange){
            onPageOrLimitChange(showPerPage.value,(page-1)*showPerPage.value)
        }
    };
    const afterDataSort = (d) => {
        setTableRows((show && !total) ? d?.slice((pageNumber - 1) * showPerPage.value, pageNumber * showPerPage.value) : d);
        setDummy(t => -t);
    }
    const onPageLimitChange = (l)=>{
        debugger
        setShowPerPage(l)
        if(onPageOrLimitChange){
            onPageOrLimitChange(l.value,pageNumber-1)
        }
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
                                               onChange={onPageLimitChange}
                                               value={showPerPage}/>}
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
                                                column.cell(v, (pageNumber - 1) * showPerPage.value + i)
                                            ) : (
                                                <span
                                                    className="item-title">{column.selector(v, (pageNumber - 1) * showPerPage.value + i)}</span>
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
                {show && <Pagination data={data} total={total} rowPerPage={showPerPage.value} onPageChange={onPageChange}/>}
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
