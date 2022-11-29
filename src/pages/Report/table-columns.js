import moment from "moment";
import {getDurations} from "../../utils/helper";

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
      sortable:true,
      selector: (row, index) => Object.values(row)[0]?.employee?.name,
    },
    {
      name: "Designation",
      sortable:true,
      selector: (row, index) => Object.values(row)[0]?.employee?.designation,
    },
    {
      name: "ID No",
      sortable:true,
      selector: (row, index) => Object.values(row)[0]?.employee?.employee_id,
    },
    {
      name: "DOJ",
      sortable:true,
      selector: (row, index) => moment(Object.values(row)[0]?.employee?.date_of_joining).toDate(),
      cell: (row, index) => (<span className="item-title">
        {moment(Object.values(row)[0]?.employee?.date_of_joining).format("DD MMM,YYYY")}
      </span>),
    },
    {
      name: "Durations",
      sortable:true,
      selector: (row, index) => {
        const durations = getDurations(Object.values(row)[0]?.employee?.date_of_joining);
        return durations.years()+durations.months()/12;
      },
      cell: (row, index) => (<span className="item-title">
        {`${getDurations(Object.values(row)[0]?.employee?.date_of_joining).years()} years, ${getDurations(Object.values(row)[0]?.employee?.date_of_joining).months()} months`}
      </span>),
    },
    {
      name: "SBU",
      sortable:true,
      selector: (row, index) => Object.values(row)[0]?.employee?.sbu?.name,
    },
    {
      name: "Sub SBU",
      sortable:true,
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

      selector: (row, index) => row?.[year]?.kpi_selector?.name,
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
