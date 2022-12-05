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

export const EMPLOYEE_LIST_PAGE = "/employee";
export const EMPLOYEE_EDIT_PAGE_URL = `/employee/edit/:id`;
export const EMPLOYEE_EDIT_PAGE = (id) => `/employee/edit/${id}`;

// KPI
export const KPI_EMPLOYEE_ASSIGN_PAGE = "/kpi-assign";
export const KPI_PERMORMANCE_FORM_PAGE = (id) => `/kpi-performance-form/${id}`;
export const KPI_PERMORMANCE_FORM_URL = `/kpi-performance-form/:id`;
export const KPI_ASSESTMENT_PAGE = "/kpi-assestment-page";
export const KPI_PERMORMER_ASSESTMENT_PAGE = "/kpi-performance-assestment";
export const KPI_ALL_EMPLOYEE_ASSESTMENT_PAGE = "/kpi-all-employee-assestment";
export const EMPLOYEE_ASSESTMENT_PAGE = "/employee-assestment";
export const SUPERVISOR_ASSESTMENT_PERFORMANE_PAGE = "/supervisor-assestment";
export const EMPLOYEE_ASSESTMENT_SINGLE_URL = "/employee-assestment/:id";
export const EMPLOYEE_ASSESTMENT_SINGLE_PAGE = (id) => `/employee-assestment/${id}`;
export const EMPLOYEE_PERFORMANCE_PAGE = "/employee-performance";

export const EMPLOYEE_PERFORMANCE_SINGLE_PAGE_URL = "/employee-performance/:id";
export const EMPLOYEE_PERFORMANCE_SINGLE_PAGE = (id) => `/employee-performance/${id}`;

export const EMPLOYEE_PERFORMANCE_INDEX_PAGE = "/employee-performance-index";
export const EMPLOYEE_PERFORMANCE_CREATE = "/employee-performance-create";
export const EMPLOYEE_PERFORMANCE_VIEW = (id) => `/employee-performance-view/${id}`;
export const EMPLOYEE_PERFORMANCE_VIEW_url = `/employee-performance-view/:id`;

//REQUISITION FORM
export const REQUISITION_RESOURCE_LIST = "/requisitionform/resource-request-list";
export const REQUISITION_RESOURCE_FORM = "/requisitionform/resource-request-form";

// Reports
export const SALARY_FULL_REPORT_URL = `/report/salary_full_report`;
export const ASSESSMENT_YEAR_REPORT = `/report/assessment_year_report`;
export const SALARY_PIVOT_SUMMARY_REPORT_URL = `/report/salary_pivot_summary`;
export const SALARY_INCREMENT_ELIGIBLE_REPORT_URL = `/report/salary_increment_eligible`;
export const ASSESTMENT_EMPLOYER_REPORT = `/report/assestment_employer_report`;
export const SALARY_INCREMENT_REPORT = `/report/performance-evaluation-and-salary-increment`;
export const SBU_ASSESTMENT_REPORT = `/report/sbu-assestment`;

// Others
export const UNAUTHORIZED = "/unauthorized";
