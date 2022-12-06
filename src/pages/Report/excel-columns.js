import moment from "moment";

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

export const SALARY_FULL_REPORT = (years) => {
  const info = [
    {
      key: `#`,
      value: (row, index) => index + 1,
    },
    {
      key: "Employee Name",
      value: (row, index) => Object.values(row)[0]?.employee?.name,
    },
    {
      key: "Designation",
      value: (row, index) => Object.values(row)[0]?.employee?.designation,
    },
    {
      key: "ID No",
      value: (row, index) => Object.values(row)[0]?.employee?.employees_id,
    },
    {
      key: "DOJ",
      value: (row, index) => moment(Object.values(row)[0]?.employee?.date_of_joining).format("DD MMM,YYYY"),
    },
    {
      key: "Durations",
      value: (row, index) => {
        const diff = moment().diff(Object.values(row)[0]?.employee?.date_of_joining);
        const duration = moment.duration(diff);
        return `${duration.years()} years, ${duration.months()} months`;
      },
    },
    {
      key: "SBU",
      value: (row, index) => Object.values(row)[0]?.employee?.sbu?.name,
    },
    {
      key: "Sub SBU",
      value: (row, index) => Object.values(row)[0]?.employee?.sub_sbu?.name,
    },
    // {
    //   name: "Supervisor",
    //   selector: (row, index) => Object.values(row)[0]?.employee?.supervisor?.name,
    // },
  ];
  const arr = years.map((year) => [
    {
      key: `I Objective ${year}`,
      value: (row, index) => row?.[year]?.kpi_objective?.name,
    },

    {
      key: `KPI-Value ${year}`,
      value: (row, index) => row?.[year]?.kpi_value?.name,
    },

    {
      key: `KPI-HR ${year}`,
      value: (row, index) => row?.[year]?.hr_rating?.name,
    },

    {
      key: `KPI-Overall ${year}`,
      value: (row, index) => row?.[year]?.kpi_overall,
    },

    {
      key: `% of KPI-Objective ${year}`,
      value: (row, index) => row?.[year]?.percentage_kpi_objective,
    },

    {
      key: `% of KPI-HR ${year}`,
      value: (row, index) => row?.[year]?.percentage_kpi_hr,
    },

    {
      key: `Weighted Average of KPI % ${year}`,
      value: (row, index) => row?.[year]?.weighted_average_kpi,
    },

    {
      key: `Criticality ${year}`,
      value: (row, index) => row?.[year]?.criticality?.name,
    },

    {
      key: `Potential for Improvement ${year}`,
      value: (row, index) => row?.[year]?.potential_for_improvement?.name,
    },

    {
      key: `Technical/Implementation/Operational ${year}`,
      value: (row, index) => row?.[year]?.technical_implementation_operational?.name,
    },

    {
      key: `Top/Average/Bottom Performer ${year}`,
      value: (row, index) => row?.[year]?.top_average_bottom_performer?.name,
    },

    {
      key: `Best performer inside team ${year}`,
      value: (row, index) => row?.[year]?.best_performer_team?.name,
    },

    {
      key: `Best innovator inside team ${year}`,
      value: (row, index) => row?.[year]?.best_innovator_team?.name,
    },

    {
      key: `Best Performer in the organization ${year}`,
      value: (row, index) => row?.[year]?.best_performer_org?.name,
    },

    {
      key: `Proposed Designation ${year}`,
      value: (row, index) => row?.[year]?.proposed_designation,
    },

    {
      key: `Best Performer among all PM ${year}`,
      value: (row, index) => row?.[year]?.best_performer_pm?.name,
    },

    {
      key: `Increment Amount (HR) ${year} (A)`,
      value: (row, index) => row?.[year]?.hr_rating?.name,
    },

    {
      key: `HR New Gross Salary ${year} (A)`,
      value: (row, index) => row?.[year]?.hr_new_gross_salary_a,
    },

    {
      key: `HR % ${year}`,
      value: (row, index) => row?.[year]?.percentage_hr_a,
    },

    {
      key: `Fixed Increment (%) ${year} (B)`,
      value: (row, index) => row?.[year]?.fixed_increment_b,
    },

    {
      key: `Fixed Increment New Gross Salary B ${year} (B)`,
      value: (row, index) => row?.[year]?.fixed_increment_new_gross_salary_b,
    },

    {
      key: `Team Distribution (%) ${year} (C)`,
      value: (row, index) => row?.[year]?.team_distribution_percentage_c,
    },

    {
      key: `Difference = New salary A- New salary B ${year}`,
      value: (row, index) => row?.[year]?.difference_new_salary_a_new_salary_b,
    },

    {
      key: `Proposed By SBU Director/PM/Self ${year}`,
      value: (row, index) => row?.[year]?.proposed_by_sbu_director_pm_self,
    },

    {
      key: `% of Increment ${year}`,
      value: (row, index) => row?.[year]?.percentage_of_increment,
    },

    {
      key: `New Gross Salary B ${year}`,
      value: (row, index) => row?.[year]?.new_gross_salary_b,
    },

    {
      key: `CAGR 3 years ${year}`,
      value: (row, index) => row?.[year]?.cagr_three_years,
    },

    {
      key: `Avarage 3 Years ${year}`,
      value: (row, index) => row?.[year]?.average_three_years,
    },

    {
      key: `Average Actual ${year}`,
      value: (row, index) => row?.[year]?.average_actual,
    },

    {
      key: `Weighted Average of KPI % ${year}`,
      value: (row, index) => row?.[year]?.weighted_average_kpi,
    },

    {
      key: `Increment with KPI % ${year}`,
      value: (row, index) => row?.[year]?.increment_with_kpi_percentage,
    },

    {
      key: `New Gross Salary KPI % % ${year}`,
      value: (row, index) => row?.[year]?.increment_with_kpi_percentage,
    },

    {
      key: `Increment with KPI % ${year}`,
      value: (row, index) => row?.[year]?.increment_with_kpi_percentage,
    },

    {
      key: `New Gross Salary KPI % ${year}`,
      value: (row, index) => row?.[year]?.increment_with_kpi_percentage,
    },

    {
      key: `Gap Manual vs Formula ${year}`,
      value: (row, index) => row?.[year]?.gap_manual_formula,
    },

    {
      key: `Remarks ${year}`,
      value: (row, index) => row?.[year]?.remark,
    },

    {
      key: `Remarks 2 ${year}`,
      value: (row, index) => row?.[year]?.remarks_two,
    },
  ]);
  console.log(info.concat(...arr));
  return info.concat(...arr);
};

export const SBU_ASSESTMENT_REPORT_EXCEL_COLUMN = [
  {
    key: "Name",
    value: (row) => row?.employee?.name,
  },
  {
    key: "ID",
    value: (row) => row?.employee?.employee_id,
  },
  {
    key: "Designation",
    value: (row) => row?.employee?.designation,
  },
  {
    key: "SBU",
    value: (row) => row?.employee?.sbu?.name,
  },
  {
    key: "Supervisor",
    value: (row) => row?.employee?.supervisor?.name,
  },
  {
    key: "Objective",
    value: (row) => row?.kpi_objective?.name,
  },
  {
    key: "Value",
    value: (row) => row?.kpi_value?.name,
  },
  {
    key: "HR Rating",
    value: (row) => row?.hr_rating?.name,
  },
  {
    key: "KPI",
    value: (row) => row?.kpi_overall,
  },
  {
    key: "Criticality ",
    value: (row) => row?.criticality?.name,
  },
  {
    key: "Top/Average/Bottom Performer",
    value: (row) => row?.top_average_bottom_performer?.name,
  },
  {
    key: "Best performer inside team",
    value: (row) => row?.best_performer_team?.name,
  },
  {
    key: "Best performer in the organization",
    value: (row) => row?.best_performer_org?.name,
  },
  {
    key: "Best performer among all PM",
    value: (row) => row?.best_performer_pm?.name,
  },
  {
    key: "Best innovator inside team",
    value: (row) => row?.best_innovator_team?.name,
  },
  {
    key: "Potential for Improvement",
    value: (row) => row?.potential_for_improvement?.name,
  },
  // {
  //   key: "Technical/Implementation/Operational",
  //   value: (row) => row?.technical_implementation_operational,
  // },
  {
    key: "Confirmation/Increment/No Increment",
    value: (row) => row?.confirmation_increment_noincrement?.name,
  },
  {
    key: "Proposed Designation",
    value: (row) => row?.proposed_designation,
  },
  {
    key: "Proposed Amount By Supervisor",
    value: (row) => row?.proposed_by_sbu_director_pm_self,
  },
  {
    key: "Remarks ",
    value: (row) => row?.remarks,
  },
];
