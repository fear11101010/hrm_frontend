export const LOGIN_API = "/login";
export const LOGOUT_API = "/logout";

// SBU
export const GET_SBU_API = "/sbu/";
export const GET_EMPLOYEE_BY_SBU_API = (id) => `/retrieve_employee_by_sbu/${id}/`;

// KPI
export const EMPLOYEE_ASSIGN_POST = "/employee_assign/";
export const EMPLOYEE_ASSESTMENT_GET = "/assessment/";
export const EMPLOYEE_ASSESTMENT_SINGLE_GET = (id) => `/assessment/${id}/`;

export const GET_SUPERVISOR = "/supervisor/";
export const KPI_PERFORMANCE_FORM = "/kpi_performance/";
export const KPI_PERFORMANCE_FORM_DATE_VALIDATE = "kpi_performance/$/get_date_range/";
export const KPI_PERFORMANCE_FORM_DRAFT = "/kpi_performance/";
export const KPI_PERFORMANCE_FORM_SINGLE = id=> `/kpi_performance/${id}/`;
export const KPI_PERFORMANCE_FORM_SUBMIT = id=> `/kpi_performance/${id}/`;
