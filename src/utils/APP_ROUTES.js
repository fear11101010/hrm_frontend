/////////////////////////////////
// ROUTING
/////////////////////////////////
export const LOGIN_PAGE = "/";

export const DASHBOARD_PAGE = "/dashboard";

// USER
export const USER_LIST_PAGE = "/user";
export const USER_ADD_PAGE = "/user/add";
export const USER_EDIT_PAGE_URL = "/user/edit/:id";
export const USER_EDIT_PAGE = (id) => `/user/edit/$id}`;
export const USER_ROLE_LIST_PAGE = "/role";
export const USER_ROLE_PRIVILEGE_PAGE_URL = "/role/:id";
export const USER_ROLE_PRIVILEGE_PAGE = (id) => `/role/${id}`;

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

export const EMPLOYEE_PERFORMANCE_SINGLE_PAGE_URL = "/employee-performance/:id";
export const EMPLOYEE_PERFORMANCE_SINGLE_PAGE = (id) => `/employee-performance/${id}`;

export const EMPLOYEE_PERFORMANCE_INDEX_PAGE = "/employee-performance-index";
export const EMPLOYEE_PERFORMANCE_CREATE = "/employee-performance-create";
export const EMPLOYEE_PERFORMANCE_VIEW = id => `/employee-performance-view/${id}`;
export const EMPLOYEE_PERFORMANCE_VIEW_url = `/employee-performance-view/:id`;

// Others
export const UNAUTHORIZED = "/unauthorized";

// Reports
export const SALARY_FULL_REPORT_URL = `/report/salary_full_report`;
export const SALARY_PIVOT_SUMMARY_REPORT_URL = `/report/salary_pivot_summary`;
export const SALARY_INCREMENT_ELIGIBLE_REPORT_URL = `/report/salary_increment_eligible`;

