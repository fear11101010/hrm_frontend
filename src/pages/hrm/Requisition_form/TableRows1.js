import { useState } from "react";
import Select from "react-select";

function TableRows1({ employee_data, rowsData, deleteTableRows, handleChange,handleChange2 }) {

    return (

        rowsData.map((data, index) => {
            let { emp_name,employee_name, designation, id_no, sbu, sbu_project, allocated_hour, common, skill, project_revenue } = data;
            return (

                <tr key={index}>
                    {/* <td>{index+1}</td> */}
                    <td>
                        <Select
                            options={employee_data?.map((d) => ({ label: d.name, value: d.id, designation: d.designation,ds_id: d.employee_id,sbu: d.sbu.name,sub_sbu:d.sbu_director_id.name }))}
                            onChange={(e) => {
                                handleChange2(index,"employee_name", e.value)
                                handleChange2(index,"emp_name", e.label)
                                handleChange2(index,"designation", e.designation)
                                handleChange2(index,"id_no", e.ds_id)
                                handleChange2(index,"sbu", e.sbu)
                                handleChange2(index,"sbu_project", e.sub_sbu)
                            }}
                            placeholder={emp_name !== "" ? emp_name : employee_name}
                            styles={{ border: "1px solid red" }}
                            value={employee_name}
                        />
                    </td>
                    <td><input type="text" value={designation} onChange={(evnt) => (handleChange(index, evnt))} name="designation" className="form-control" /> </td>
                    <td><input type="text" value={id_no} onChange={(evnt) => (handleChange(index, evnt))} name="id_no" className="form-control" /> </td>
                    <td><input type="text" value={sbu} onChange={(evnt) => (handleChange(index, evnt))} name="sbu" className="form-control" /> </td>
                    <td><input type="text" value={sbu_project} onChange={(evnt) => (handleChange(index, evnt))} name="sbu_project" className="form-control" /> </td>
                    <td><input type="text" value={allocated_hour} onChange={(evnt) => (handleChange(index, evnt))} name="allocated_hour" className="form-control" /> </td>
                    <td><input type="text" value={common} onChange={(evnt) => (handleChange(index, evnt))} name="common" className="form-control" /> </td>
                    <td><input type="text" value={skill} onChange={(evnt) => (handleChange(index, evnt))} name="skill" className="form-control" /> </td>
                    <td><input type="text" value={project_revenue} onChange={(evnt) => (handleChange(index, evnt))} name="project_revenue" className="form-control" /> </td>
                    <td><button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}>x</button></td>
                </tr>

            )
        })

    )

}

export default TableRows1;