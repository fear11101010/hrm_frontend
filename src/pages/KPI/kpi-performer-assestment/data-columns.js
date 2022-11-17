export const dataColumns = [
  {
    name: "status",
    selector: (row) => row.employee?.status,
    cell: (row) => (
      <div>
        {row.employee?.status === 1 ? (
          <h5 className="text-info mb-0" style={{ fontSize: "12px" }}>
            {" "}
            In Progress{" "}
          </h5>
        ) : (
          <h5 className="text-success mb-0" style={{ fontSize: "12px" }}>
            {" "}
            Complete{" "}
          </h5>
        )}
      </div>
    ),
    width: "90px",
    wrap: true,
  },
  { name: "Employee ID", selector: (row) => row.employee?.employee_id, width: "120px", wrap: true },
  { name: "Employee Name", selector: (row) => row.employee?.name, minWidth: "180px", wrap: true },
  { name: "Designation", selector: (row) => row.employee?.designation, minWidth: "180px", wrap: true },
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
    name: <div>Proposed By SBU Director/PM/Self</div>,
    selector: (row) => row?.proposed_by_sbu_director_pm_self,
    width: "140px",
    wrap: true,
  },
];
