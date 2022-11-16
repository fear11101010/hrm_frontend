export const LOGIN_API = "/login";
export const LOGOUT_API = "/logout";

// SBU
export const GET_SBU_API = "/sbu/";
export const GET_EMPLOYEE_BY_SBU_API = (id) => `/retrieve_employee_by_sbu/${id}/`;

//User
export const USER_GET = "/user/userlist/";
export const USER_POST = "/user/userlist/";
export const USER_EACH_GET = (id) => `/user/userlist/${id}/`;

// KPI
export const KPI_VALUE_GET = "/kpi_value/";
export const KPI_OBJECTIVE_GET = "/kpi_objective/";
export const HR_RATING_GET = "/hr_rating/";
export const CRITICALITY_GET = "/criticality/";
export const POTENTIAL_FOR_IMPROVEMENT_GET = "/potential_for_improvement/";
export const TECHNICAL_IMPLEMENTATION_OPERATIONAL_GET = "/technical_implementation_operational/";
export const TOP_AVG_BOTTOM_GET = "/top_average_bottom_performer/";
export const BEST_PERFORMER_TEAM_GET = "/best_performer_team/";
export const BEST_INNOVATOR_TEAM_GET = "/best_innovator_team/";
export const BEST_PERFORMER_ORG_GET = "/best_performer_organization/";
export const BEST_PERFORMER_PM_GET = "/best_performer_pm/";
export const CONF_INC_NOINC_GET = "/confirmation_increment_no_increment/";

export const EMPLOYEE_ASSIGN_POST = "/employee_assign/";
export const EMPLOYEE_ASSIGN_RETRIVE_AND_PUT = (id) => `/employee_assign/${id}/`;
export const EMPLOYEE_ASSESTMENT_GET = "/assessment/";
export const EMPLOYEE_PERFORMANCE_GET = "/kpi_performance/";
export const EMPLOYEE_PERFORMANCE_EACH_GET = (id) => `/kpi_performance/${id}/`;
export const EMPLOYEE_PERFORMANCE_EACH_PUT = (id) => `/kpi_performance/${id}/`;
export const EMPLOYEE_ASSESTMENT_SINGLE_GET = (id) => `/assessment/${id}/`;
export const EMPLOYEE_ASSESTMENT_SINGLE_POST = (id) => `/assessment/${id}/`;

export const GET_SUPERVISOR = "/supervisor/";
export const KPI_PERFORMANCE_FORM = "/kpi_performance/";
export const KPI_PERFORMANCE_FORM_DATE_VALIDATE = "kpi_performance/$/get_date_range/";
export const KPI_PERFORMANCE_FORM_DRAFT = "/kpi_performance/";
export const KPI_PERFORMANCE_FORM_SINGLE = (id) => `/kpi_performance/${id}/`;
export const KPI_PERFORMANCE_FORM_SUBMIT = (id) => `/kpi_performance/${id}/`;

export const KPI_PERMORMER_ASSESTMENT_BY_SBU_GET = (id) => `/performer_assessment/${id}/search_by_sbu/`;
export const KPI_PERMORMER_ASSESTMENT_INDIVIDUAL_GET = (id) => `/assessment/${id}/`;
export const KPI_PERMORMER_ASSESTMENT_INDIVIDUAL_PUT = (id) => `/performer_assessment/${id}/`;

// report api

export const REPORT_FULL_SUMMERY_API = (id) => `reports/${id}/salary_full_report_search_by_sbu/`;
export const REPORT_PIVOT_SALARY_SUMMERY_API = (year) => `reports/${year}/salary_pivot_summery_by_year/`;
export const REPORT_INCREMENT_ELIGIBLE_SALARY_SUMMERY_API = (year) => `reports/${year}/increment_eligible_by_year/`;
export const REPORT_GET_YEARS_DROPDOWN = `reports/$/get_available_years/`;
