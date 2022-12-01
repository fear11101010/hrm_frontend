import React, {useEffect,useState} from "react";

function TableHeader({columns, afterDataSort, data}) {
    const [sortDirection, setSortDirection] = useState({});
    const [columnMapping, setColumnMapping] = useState({});
    useEffect(() => {
        setSortDirection(columns.reduce((c, p) => ({...c, [p.name]: -1}), {}));
        setColumnMapping(columns.map((v, i) => v.name));
    }, [columns])
    const getHeaderCell = (column) => {
        if (column.sortable) {
            return (
                <a className="list-sort text-muted" onClick={(e) => sortTableData(e, column.name)}
                   data-sort={column.name} href="#">
                    {column.name}
                </a>
            );
        }
        return column.name;
    };
    const sortTableData = (event, columnName) => {
        event.preventDefault();
        const colIndex = columnMapping.findIndex(v => v === columnName);
        console.log(colIndex)
        if (colIndex >= 0) {
            data.sort((a, b) => {
                const valueA = columns[colIndex]?.selector ? columns[colIndex]?.selector(a, colIndex) : null;
                const valueB = columns[colIndex]?.selector ? columns[colIndex]?.selector(b, colIndex) : null;
                const type = typeof valueA;
                if (type === "string") {
                    if (valueA < valueB) return -sortDirection[columnName];
                    if (valueA > valueB) return sortDirection[columnName];
                    return 0;
                } else {
                    return (valueA - valueB) * sortDirection[columnName];
                }
            })
            setSortDirection({...sortDirection, [columnName]: -sortDirection[columnName]});
            if (afterDataSort) {
                afterDataSort(data);
            }
        }

    };
    return (
        <thead>
            <tr>
                {columns.map((column) => (
                    <th>{getHeaderCell(column)}</th>
                ))}
            </tr>
        </thead>
    );
}
export default TableHeader;