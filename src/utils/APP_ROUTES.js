/////////////////////////////////
// ROUTING
/////////////////////////////////
export const LOGIN_PAGE = "/";

export const DASHBOARD_PAGE = "/dashboard";

// KPI
export const KPI_EMPLOYEE_ASSIGN_PAGE = "/kpi-assign";
export const KPI_PERMORMANCE_FORM_PAGE = id=> `/kpi-performance-form/${id}`;
export const KPI_PERMORMANCE_FORM_URL = `/kpi-performance-form/:id`;
export const KPI_ASSESTMENT_PAGE = "/kpi-assestment-page";
export const KPI_PERMORMER_ASSESTMENT_PAGE = "/kpi-performance-assestment";
export const KPI_ALL_EMPLOYEE_ASSESTMENT_PAGE = "/kpi-all-employee-assestment";
export const EMPLOYEE_ASSESTMENT_PAGE = "/employee-assestment";
export const EMPLOYEE_ASSESTMENT_SINGLE_URL = "/employee-assestment/:id";
export const EMPLOYEE_ASSESTMENT_SINGLE_PAGE = (id) => `/employee-assestment/${id}`;
export const EMPLOYEE_PERFORMANCE_PAGE = "/employee-performance";
export const EMPLOYEE_PERFORMANCE_INDEX_PAGE = "/employee-performance-index";

// Others
export const UNAUTHORIZED = "/unauthorized";
