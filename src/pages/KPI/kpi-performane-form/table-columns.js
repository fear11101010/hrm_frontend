import {Link} from "react-router-dom";
import {EMPLOYEE_ASSESTMENT_SINGLE_PAGE, KPI_PERMORMANCE_FORM_PAGE} from "../../../utils/APP_ROUTES";
import React from "react";

export const kpiPerformanceFormColumns = [
    {
        name:'#',
        selector:(row,index)=>index+1
    },
    {
        name:'Year',
        selector:row=>row.year
    },
    {
        name:'ID',
        selector:row=>row.employee.employee_id
    },
    {
        name:'Name',
        selector:row=>row.employee.name
    },
    {
        name:'Designation',
        selector:row=>row.employee.designation
    },
    {
        name: "Action",
        cell: (row) => (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <Link className={`btn btn-rounded-circle btn-sm btn-primary ${row.flag?"disabled":""}`} to={KPI_PERMORMANCE_FORM_PAGE(row.id)}>
                        <i className="fe fe-edit"></i>
                    </Link>
                </div>
        ),
        width:'80px',
        wrap: true,
    },
]