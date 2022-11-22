export const PIVOT_TABLE_COLUMN = (year) => [
  {
    name: "#",
    width: "80px",
    selector: (row, index) => index + 1,
  },
  {
    name: "All Employees",
    sortable: true,
    width: "150px",
    selector: (row, index) => row.sbu,
  },
  {
    name: "# Employee",
    sortable: true,
    width: "150px",
    selector: (row, index) => row["#employee"],
  },
  {
    name: "# Employee %",
    sortable: true,
    width: "150px",
    selector: (row, index) => row["#employee%"],
  },
  {
    name: `Gross Monthly Salary ${year - 1}`,
    sortable: true,
    width: "250px",
    selector: (row, index) => row[`gross_monthly_salary${year - 1}`],
  },
  {
    name: `Gross Monthly Salary ${year - 1} %`,
    sortable: true,
    width: "250px",
    selector: (row, index) => row[`gross_monthly_salary${year - 1}%`],
  },
  {
    name: `Gross Monthly Salary ${year}`,
    sortable: true,
    width: "250px",
    selector: (row, index) => row[`gross_monthly_salary${year}`],
  },
  {
    name: `Gross Monthly Salary ${year} %`,
    sortable: true,
    width: "250px",
    selector: (row, index) => row[`gross_monthly_salary${year}%`],
  },
  {
    name: `yoy`,
    sortable: true,
    selector: (row, index) => row["yoy"],
  },
  {
    name: `% yoy`,
    sortable: true,
    selector: (row, index) => row["yoy%"],
  },
];
export const ELIGIBLE_TABLE_COLUMN = (year) => [
  {
    name: "#",
    sortable: true,
    width: "80px",
    selector: (row, index) => index + 1,
  },
  {
    name: "Increment Eligible Employees Only",
    sortable: true,
    selector: (row, index) => row.sbu,
  },
  {
    name: "# Employee",
    sortable: true,
    selector: (row, index) => row["#employee"],
  },
  {
    name: "# Employee %",
    sortable: true,
    selector: (row, index) => row["#employee%"],
  },
  {
    name: `Increment ${year}`,
    sortable: true,
    selector: (row, index) => row[`increment ${year}`],
  },
  {
    name: `Increment ${year} %`,
    sortable: true,
    selector: (row, index) => row[`increment${year}%`],
  },
];

export const ASSESTMENT_EMPLOYER_TABLE_COLUMN = (year) => [
  {
    name: "#",
    sortable: true,
    width: "80px",
    selector: (row, index) => index + 1,
  },
  {
    name: "Name",
    sortable: true,
    selector: (row, index) => row.sbu,
  },
];
