export const LUNCH_DASHBOARD_PAGE = "/lunch-management";
export const LUNCH_ORDER_PAGE = "/lunch-management/order";
export const SUBSIDY_LIST_PAGE = "/lunch-management/sub-sidy";
export const SUBSIDY_COST_LIST_PAGE = "/lunch-management/sub-sidy-cost";
export const BRANCH_LIST_PAGE = "/lunch-management/office-branch";
export const VENDOR_LIST_PAGE = "/lunch-management/vendor";
export const VENDOR_MENU_LIST_PAGE = "/lunch-management/vendor-menu";
export const ADMIN_MENU_ENTRY_LIST_PAGE = "/lunch-management/menu-entry";
export const ADMIN_MENU_ENTRY_CREATE_PAGE = "/lunch-management/menu-entry/create";
export const ADMIN_MENU_ENTRY_EDIT_PAGE =(id,mappingId)=> mappingId?`/lunch-management/menu-entry/${id}/edit/${mappingId}`:`/lunch-management/menu-entry/${id}/edit`;
export const ADMIN_MENU_ENTRY_EDIT_PAGE_URL =`/lunch-management/menu-entry/:id/edit`;
export const ADMIN_LUNCH_ORDER_TIME_CONFIG_PAGE_URL =`/lunch-management/config/time`;
export const SUBSIDY_COST_CREATE_PAGE = "/lunch-management/sub-sidy-cost/create";
export const HOLIDAY_CALENDER_PAGE = "/lunch-management/holiday-calender";
//reports
export const LUNCH_REPORT_EMPLOYEE_PAGE = "/lunch-management/reports/employee";
export const LUNCH_REPORT_ADMIN_PAGE = "/lunch-management/reports/admin";
export const LUNCH_REPORT_DAILY_PAGE = "/lunch-management/reports/daily";
export const LUNCH_ORDER_SUMMARY_REPORT_PAGE = "/lunch-management/reports/order-summary";
