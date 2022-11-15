export const columns = [
  {
    name: "status",
    selector: (row) => row.employee?.status,
    cell: (row) => (
      <span>
        {row.employee?.status === 1 ? (
          <h5 className="text-info mb-0"> In Progress </h5>
        ) : (
          <span className="text-success mb-0"> Complete </span>
        )}
      </span>
    ),
    minWidth: "120px",
    wrap: true,
  },
  { name: "Employee ID", selector: (row) => row.employee?.employee_id, minWidth: "120px", wrap: true },
  { name: "Employee Name", selector: (row) => row.employee?.name, minWidth: "120px", wrap: true },
  { name: "Desgination", selector: (row) => row.employee?.designation, minWidth: "120px", wrap: true },
  { name: "Date of Joining", selector: (row) => row.employee?.date_of_joining, minWidth: "120px", wrap: true },
];
