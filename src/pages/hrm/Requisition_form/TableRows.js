function TableRows({ rowsData, deleteTableRows, handleChange }) {


    return (

        rowsData.map((data, index) => {
            let { project_invoice_amount, resources_involved, total_resource_cost,project_duration,project_cost } = data;
            project_cost = project_duration * total_resource_cost
            return (

                <tr key={index}>
                    <td>
                        <input type="text" value={project_invoice_amount} onChange={(evnt) => (handleChange(index, evnt))} name="project_invoice_amount" className="form-control" />
                    </td>
                    <td><input type="text" value={resources_involved} onChange={(evnt) => (handleChange(index, evnt))} name="resources_involved" className="form-control" /> </td>
                    <td><input type="text" value={total_resource_cost} onChange={(evnt) => (handleChange(index, evnt))} name="total_resource_cost" className="form-control" /> </td>
                    <td><input type="text" value={project_duration} onChange={(evnt) => (handleChange(index, evnt))} name="project_duration" className="form-control" /> </td>
                    <td><input type="text" value={project_cost} onChange={(evnt) => (handleChange(index, evnt))} name="project_cost" className="form-control" /> </td>
                    <td><button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}>x</button></td>
                </tr>

            )
        })

    )

}

export default TableRows;