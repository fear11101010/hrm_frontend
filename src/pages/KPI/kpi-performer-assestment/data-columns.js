export const dataColumns = [
  {
    name: "Status",
    selector: (row) => row?.flag,
    cell: (row) => (
      <div>
        {row?.flag ? (
          <h5 className="text-success mb-0" style={{ fontSize: "12px" }}>
            Complete
          </h5>
        ) : (
          <h5 className="text-info mb-0" style={{ fontSize: "12px" }}>
            In Progress
          </h5>
        )}
      </div>
    ),
    width: "100px",
    wrap: true,
  },
  { name: "Employee ID", selector: (row) => row.employee?.employee_id, width: "150px", wrap: true },
  { name: "Employee Name", selector: (row) => row.employee?.name, minWidth: "180px", wrap: true },
  { name: "Designation", selector: (row) => row.employee?.designation, minWidth: "200px", wrap: true },
  // {
  //   name: <div>Team Distribution (%) (C)</div>,
  //   selector: (row) => row?.team_distribution_percentage_c,
  //   minWidth: "150px",
  //   wrap: true,
  // },
  // {
  //   name: <div>New salary A - New salary B</div>,
  //   selector: (row) => row?.difference_new_salary_a_new_salary_b,
  //   minWidth: "150px",
  //   wrap: true,
  // },
  {
    name: <div className="text-end">Proposed Amount by Supervisor</div>,
    selector: (row) => row?.proposed_by_sbu_director_pm_self,
    cell: (row) => row?.proposed_by_sbu_director_pm_self?.toLocaleString("en-IN"),
    minWidth: "180px",
    wrap: false,
    right: true,
  },
];
