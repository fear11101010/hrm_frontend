export const PIVOT_EXCEL_COLUMN = (year) => [
  {
    key: "SL. No",
    value: (row, index) => index + 1,
  },
  {
    key: "All Employees",
    value: (row, index) => row.sbu,
  },
  {
    key: "# Employee",
    value: (row, index) => row["#employee"],
  },
  {
    key: "# Employee %",
    value: (row, index) => row["#employee%"],
  },
  {
    key: `Gross Monthly Salary ${year - 1}`,
    value: (row, index) => row[`gross_monthly_salary${year - 1}`],
  },
  {
    key: `Gross Monthly Salary ${year - 1} %`,
    value: (row, index) => row[`gross_monthly_salary${year - 1}%`],
  },
  {
    key: `Gross Monthly Salary ${year}`,
    value: (row, index) => row[`gross_monthly_salary${year}`],
  },
  {
    key: `Gross Monthly Salary ${year} %`,
    value: (row, index) => row[`gross_monthly_salary${year}%`],
  },
  {
    key: `yoy`,
    value: (row, index) => row["yoy"],
  },
  {
    key: `% yoy`,
    value: (row, index) => row["yoy%"],
  },
];

export const ELIGIBLE_EXCEL_COLUMN = (year) => [
  {
    key: "#",
    value: (row, index) => index + 1,
  },
  {
    key: "Increment Eligible Employees Only",
    value: (row, index) => row.sbu,
  },
  {
    key: "# Employee",
    value: (row, index) => row["#employee"],
  },
  {
    key: "# Employee %",
    value: (row, index) => row["#employee%"],
  },
  {
    key: `Increment ${year}`,
    value: (row, index) => row[`increment ${year}`],
  },
  {
    key: `Increment ${year} %`,
    value: (row, index) => row[`increment${year}%`],
  },
];

export const ASSESTMENT_EMPLOYER_COLUMN = (year) => [
  {
    key: "#",
    value: (row, index) => index + 1,
  },
  {
    key: "Name",
    value: (row, index) => row.employee,
  },
];
