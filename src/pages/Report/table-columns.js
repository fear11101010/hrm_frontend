import moment from "moment";

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
    selector: (row, index) => row.sbu ?? "Grand Total",
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
    selector: (row, index) => row[`gross_monthly_salary${year - 1}`]?.toLocaleString("en-IN"),
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
    selector: (row, index) => row[`gross_monthly_salary${year}`]?.toLocaleString("en-IN"),
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
    selector: (row, index) => row["yoy"]?.toLocaleString("en-IN"),
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
    selector: (row, index) => row.sbu ?? "Grand Total",
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
    selector: (row, index) => row[`increment ${year}`]?.toLocaleString("en-IN"),
  },
  {
    name: `Increment ${year} %`,
    sortable: true,
    selector: (row, index) => row[`increment${year}%`],
  },
];

export const SALARY_FULL_REPORT_TABLE_COLUMN = (years) => {
  const info = [
    {
      name: `#`,
      selector: (row, index) => index + 1,
    },
    {
      name: "Employee Name",

      selector: (row, index) => Object.values(row)[0]?.employee?.name,
    },
    {
      name: "Designation",

      selector: (row, index) => Object.values(row)[0]?.employee?.designation,
    },
    {
      name: "ID No",

      selector: (row, index) => Object.values(row)[0]?.employee?.employees_id,
    },
    {
      name: "DOJ",

      selector: (row, index) => moment(Object.values(row)[0]?.employee?.date_of_joining).format("DD MMM,YYYY"),
    },
    {
      name: "Durations",
      selector: (row, index) => {
        const diff = moment().diff(Object.values(row)[0]?.employee?.date_of_joining);
        const duration = moment.duration(diff);
        return `${duration.years()} years, ${duration.months()} months`;
      },
    },
    {
      name: "SBU",

      selector: (row, index) => Object.values(row)[0]?.employee?.sbu?.name,
    },
    {
      name: "Sub SBU",

      selector: (row, index) => Object.values(row)[0]?.employee?.sub_sbu?.name,
    },
  ];

  const arr = years.map((year) => [
    {
      name: `I Objective ${year}`,
      selector: (row, index) => row?.[year]?.kpi_objective?.name,
    },

    {
      name: `KPI-Value ${year}`,

      // selector: (row, index) => row?.[year]?.kpi_selector?.name,
      selector: (row, index) => row?.[year]?.kpi_value?.name,
    },

    {
      name: `KPI-HR ${year}`,
      selector: (row, index) => row?.[year]?.hr_rating?.name,
    },

    {
      name: `KPI-Overall ${year}`,
      selector: (row, index) => row?.[year]?.kpi_overall,
    },

    {
      name: `% of KPI-Objective ${year}`,
      selector: (row, index) => row?.[year]?.percentage_kpi_objective,
    },

    {
      name: `% of KPI-HR ${year}`,
      selector: (row, index) => row?.[year]?.percentage_kpi_hr,
    },

    {
      name: `Weighted Average of KPI % ${year}`,
      selector: (row, index) => row?.[year]?.weighted_average_kpi,
    },

    {
      name: `Criticality ${year}`,
      selector: (row, index) => row?.[year]?.criticality?.name,
    },

    {
      name: `Potential for Improvement ${year}`,
      selector: (row, index) => row?.[year]?.potential_for_improvement?.name,
    },

    {
      name: `Technical/Implementation/Operational ${year}`,
      selector: (row, index) => row?.[year]?.technical_implementation_operational?.name,
    },

    {
      name: `Top/Average/Bottom Performer ${year}`,
      selector: (row, index) => row?.[year]?.top_average_bottom_performer?.name,
    },

    {
      name: `Best performer inside team ${year}`,
      selector: (row, index) => row?.[year]?.best_performer_team?.name,
    },

    {
      name: `Best innovator inside team ${year}`,
      selector: (row, index) => row?.[year]?.best_innovator_team?.name,
    },

    {
      name: `Best Performer in the organization ${year}`,
      selector: (row, index) => row?.[year]?.best_performer_org?.name,
    },

    {
      name: `Proposed Designation ${year}`,
      selector: (row, index) => row?.[year]?.proposed_designation,
    },

    {
      name: `Best Performer among all PM ${year}`,
      selector: (row, index) => row?.[year]?.best_performer_pm?.name,
    },

    {
      name: `Increment Amount (HR) ${year} (A)`,
      selector: (row, index) => row?.[year]?.hr_rating?.name,
    },

    {
      name: `HR New Gross Salary ${year} (A)`,
      selector: (row, index) => row?.[year]?.hr_new_gross_salary_a?.toLocaleString("en-IN"),
    },

    {
      name: `HR % ${year}`,
      selector: (row, index) => row?.[year]?.percentage_hr_a,
    },

    {
      name: `Fixed Increment (%) ${year} (B)`,
      selector: (row, index) => row?.[year]?.fixed_increment_b?.toLocaleString("en-IN"),
    },

    {
      name: `Fixed Increment New Gross Salary B ${year} (B)`,
      selector: (row, index) => row?.[year]?.fixed_increment_new_gross_salary_b?.toLocaleString("en-IN"),
    },

    {
      name: `Team Distribution (%) ${year} (C)`,
      selector: (row, index) => row?.[year]?.team_distribution_percentage_c?.toLocaleString("en-IN"),
    },

    {
      name: `Difference = New salary A- New salary B ${year}`,
      selector: (row, index) => row?.[year]?.difference_new_salary_a_new_salary_b?.toLocaleString("en-IN"),
    },

    {
      name: `Proposed By SBU Director/PM/Self ${year}`,
      selector: (row, index) => row?.[year]?.proposed_by_sbu_director_pm_self?.toLocaleString("en-IN"),
    },

    {
      name: `% of Increment ${year}`,
      selector: (row, index) => row?.[year]?.percentage_of_increment,
    },

    {
      name: `New Gross Salary B ${year}`,
      selector: (row, index) => row?.[year]?.new_gross_salary_b?.toLocaleString("en-IN"),
    },

    {
      name: `CAGR 3 years ${year}`,
      selector: (row, index) => row?.[year]?.cagr_three_years,
    },

    {
      name: `Avarage 3 Years ${year}`,
      selector: (row, index) => row?.[year]?.average_three_years,
    },

    {
      name: `Average Actual ${year}`,
      selector: (row, index) => row?.[year]?.average_actual,
    },

    {
      name: `Weighted Average of KPI % ${year}`,
      selector: (row, index) => row?.[year]?.weighted_average_kpi,
    },

    {
      name: `Increment with KPI % ${year}`,
      selector: (row, index) => row?.[year]?.increment_with_kpi_percentage?.toLocaleString("en-IN"),
    },

    {
      name: `New Gross Salary KPI % % ${year}`,
      selector: (row, index) => row?.[year]?.increment_with_kpi_percentage,
    },

    {
      name: `Increment with KPI % ${year}`,
      selector: (row, index) => row?.[year]?.increment_with_kpi_percentage,
    },

    {
      name: `New Gross Salary KPI % ${year}`,
      selector: (row, index) => row?.[year]?.increment_with_kpi_percentage?.toLocaleString("en-IN"),
    },

    {
      name: `Gap Manual vs Formula ${year}`,
      selector: (row, index) => row?.[year]?.gap_manual_formula,
    },

    {
      name: `Remarks ${year}`,
      selector: (row, index) => row?.[year]?.remark,
    },

    {
      name: `Remarks 2 ${year}`,
      selector: (row, index) => row?.[year]?.remarks_two,
    },
  ]);
  console.log(info.concat(...arr));
  return info.concat(...arr);
};

export const SBU_ASSESTMENT_REPORT_TABLE_COLUMN = [
  {
    name: "Name",
    selector: (row) => row?.employee?.name,
    minWidth: "200px",
  },
  {
    name: "ID",
    selector: (row) => row?.employee?.employee_id,
    width: "100px",
  },
  {
    name: "Designation",
    selector: (row) => row?.employee?.designation,
    minWidth: "200px",
    wrap: true,
  },
  {
    name: "SBU",
    selector: (row) => row?.employee?.sbu?.name,
    minWidth: "200px",
  },
  {
    name: "Production",
    selector: (row) => row?.production,
    minWidth: "200px",
  },
  {
    name: "Support",
    selector: (row) => row?.support,
    minWidth: "200px",
  },
  {
    name: "Innovation",
    selector: (row) => row?.innovation,
    minWidth: "200px",
  },
  {
    name: "People",
    selector: (row) => row?.people,
    minWidth: "200px",
  },
  {
    name: "Other",
    selector: (row) => row?.other,
    minWidth: "200px",
  },
  {
    name: "Courageous",
    selector: (row) => row?.courageous,
    minWidth: "200px",
  },
  {
    name: "Teamwork",
    selector: (row) => row?.teamwork,
    minWidth: "200px",
  },
  {
    name: "Responsive",
    selector: (row) => row?.responsive,
    minWidth: "200px",
  },
  {
    name: "Creative",
    selector: (row) => row?.creative,
    minWidth: "200px",
  },
  {
    name: "Trustworthy",
    selector: (row) => row?.trustworthy,
    minWidth: "200px",
  },
  {
    name: "Other Sustainable Achievement",
    selector: (row) => row?.other_sustainable_achievement,
    minWidth: "200px",
  },
  {
    name: "Significant Issue",
    selector: (row) => row?.significant_issue,
    minWidth: "200px",
  },
  {
    name: "Individual Comment",
    selector: (row) => row?.individual_comment,
    minWidth: "200px",
  },
  {
    name: "Manager Comment",
    selector: (row) => row?.manager_comment,
    minWidth: "200px",
  },
  {
    name: "Senior Manager Functional Head Comment",
    selector: (row) => row?.senior_manager_functional_head_comment,
    minWidth: "200px",
  },
  {
    name: "Director Chief Operating Officer Comment",
    selector: (row) => row?.director_chief_operating_officer_comment,
    minWidth: "200px",
  },
  {
    name: "Overall Performance",
    selector: (row) => row?.overall_performance,
    minWidth: "200px",
  },
];
