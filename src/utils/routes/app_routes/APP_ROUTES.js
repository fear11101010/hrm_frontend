/////////////////////////////////
// ROUTING
/////////////////////////////////
export const LANDING_PAGE = "/";
export const LOGIN_PAGE = "/login";

export const DASHBOARD_PAGE = "/hrm/dashboard";

// USER
export const USER_LIST_PAGE = "/hrm/user";
export const USER_ADD_PAGE = "/hrm/user/add";
export const USER_EDIT_PAGE_URL = "/hrm/user/edit/:id";
export const USER_EDIT_PAGE = (id) => `/hrm/user/edit/${id}`;
export const USER_ROLE_LIST_PAGE = "/hrm/role";
export const USER_ROLE_PRIVILEGE_PAGE_URL = "/hrm/role/:id";
export const USER_ROLE_PRIVILEGE_PAGE = (id) => `/hrm/role/${id}`;

export const EMPLOYEE_LIST_PAGE = "/hrm/employee";
export const EMPLOYEE_EDIT_PAGE_URL = `/hrm/employee/edit/:id`;
export const EMPLOYEE_EDIT_PAGE = (id) => `/hrm/employee/edit/${id}`;

// Configuration
export const CONFIG_DASHBOARD = "/hrm/configuration";
export const FILE_UPLOAD_PAGE = "/hrm/file-upload";

// KPI
export const KPI_EMPLOYEE_ASSIGN_PAGE = "/hrm/kpi-assign";
export const KPI_PERMORMANCE_FORM_PAGE = (id) => `/hrm/kpi-performance-form/${id}`;
export const KPI_PERMORMANCE_FORM_URL = `/hrm/kpi-performance-form/:id`;
export const KPI_ASSESTMENT_PAGE = "/hrm/kpi-assestment-page";
export const KPI_PERMORMER_ASSESTMENT_PAGE = "/hrm/kpi-performance-assestment";
export const KPI_ALL_EMPLOYEE_ASSESTMENT_PAGE = "/hrm/kpi-all-employee-assestment";
export const EMPLOYEE_ASSESTMENT_PAGE = "/hrm/employee-assestment";
export const SUPERVISOR_ASSESTMENT_PERFORMANE_PAGE = "/hrm/supervisor-assestment";
export const EMPLOYEE_ASSESTMENT_SINGLE_URL = "/hrm/employee-assestment/:id";
export const EMPLOYEE_ASSESTMENT_SINGLE_PAGE = (id) => `/hrm/employee-assestment/${id}`;
export const EMPLOYEE_PERFORMANCE_PAGE = "/hrm/employee-performance";

export const EMPLOYEE_PERFORMANCE_SINGLE_PAGE_URL = "/hrm/employee-performance/:id";
export const EMPLOYEE_PERFORMANCE_SINGLE_PAGE = (id) => `/hrm/employee-performance/${id}`;
export const EMPLOYEE_PERFORMANCE_PREV_YEAR_PAGE_URL = "/hrm/employee-performance-previous-year/:id";
export const EMPLOYEE_PERFORMANCE_PREV_YEAR_PAGE = (id) => `/hrm/employee-performance-previous-year/${id}`;
export const SUPERVISOR_APPRAISAL_REVIEW_PAGE = "/hrm/supervisor-appraisal-review";

export const EMPLOYEE_PERFORMANCE_INDEX_PAGE = "/hrm/employee-performance-index";
export const EMPLOYEE_PERFORMANCE_CREATE = "/hrm/employee-performance-create";
export const EMPLOYEE_PERFORMANCE_VIEW = (id) => `/hrm/employee-performance-view/${id}`;
export const EMPLOYEE_PERFORMANCE_VIEW_url = `/hrm/employee-performance-view/:id`;

//BILL
export const BILL_LIST = "/bill";
export const BILL_ADD = "/bill/add";

//REQUISITION FORM
export const REQUISITION_DASHBOARD = "/requisition/dashboard";
export const REQUISITION_RESOURCE_LIST = "/requisition/requisitionform/resource-request-list";
export const REQUISITION_RESOURCE_FORM = "/requisition/requisitionform/resource-request-form";
export const REQUISITION_FORM = "/requisition/requisitionfrom/request-form";
export const REQUISITION_LIST = "/requisition/requisitionfrom/request-list";
export const REQUISITION_LIST_PAGE = (id) => `/requisition/requisitionfrom/request-details/${id}`;
export const REQUISITION_LIST_URL = `/requisition/requisitionfrom/request-details/:id`;
export const REQUISITION_LIST_PAGE_EDIT = (id) => `/requisition/requisitionfrom/request-edit/${id}`;
export const REQUISITION_LIST_EDIT_URL = `/requisition/requisitionfrom/request-edit/:id`;

// Reports
export const SALARY_FULL_REPORT_URL = `/hrm/report/salary_full_report`;
export const ASSESSMENT_YEAR_REPORT = `/hrm/report/assessment_year_report`;
export const SALARY_PIVOT_SUMMARY_REPORT_URL = `/hrm/report/salary_pivot_summary`;
export const SALARY_INCREMENT_ELIGIBLE_REPORT_URL = `/hrm/report/salary_increment_eligible`;
export const ASSESTMENT_EMPLOYER_REPORT = `/hrm/report/assestment_employer_report`;
export const SALARY_INCREMENT_REPORT = `/hrm/report/performance-evaluation-and-salary-increment`;
export const SBU_ASSESTMENT_REPORT = `/hrm/report/sbu-assestment`;
export const ASSESTMENT_SUMMARY_REPORT = `/hrm/report/assestment-summary-report/`;

//Bill Management
export const BILL_LIST_URL = "/bill_management/bill_list";
export const BILL_ADD_URL = "/bill_management/add_bill";
export const CONVEYANCE_LIST_URL = "/bill_management/conveyance_list";
export const CONVEYANCE_ADD_URL = "/bill_management/add_conveyance";

// Others
export const UNAUTHORIZED = "/unauthorized";
export const INNER_LANDING = "/";
