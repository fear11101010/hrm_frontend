export const VENDOR_GET = (id) => `/vendor/${id}/get_by_branch/`;
export const OFFICE_BRANCH = `/office_branch/`;
export const WEEKLY_MENU_MAPPING = "/weekly_menu_mapping/";
export const LUNCH_ORDER_POST = "/order/";
export const LUNCH_ORDER_RETRIEVE = (id, month, year) => `/order/retrieve_by_employee/${id}/${month}/${year}/`;
export const MONTH_MAPPING = `/weekly_menu_mapping/$/lunch_mapping/`;
export const GUEST_LUNCH_POST = `/weekly_menu_mapping/$/lunch_mapping/`;
export const SUBSIDY_LIST_CREATE_API = "/subsidy/";
export const BRANCH_LIST_CREATE_API = "/office_branch/";
export const VENDOR_LIST_CREATE_API = "/vendor/";
export const VENDOR_MENU_LIST_CREATE_API = "/menu/";
export const MONTHLY_MENU_ENTRY_LIST_CREATE_API = "/menu_entry/";
export const MONTHLY_MENU_ENTRY_RETRIEVE_API =(id,mappingId=undefined)=> mappingId?`/menu_entry/${id}/${mappingId}/`:`/menu_entry/${id}/`;
export const MONTHLY_MENU_ENTRY_UPDATE_API =(id)=> `/menu_entry/${id}/`;
export const SUBSIDY_UPDATE_DELETE_API = (id) => `/subsidy/${id}/`;
export const BRANCH_UPDATE_DELETE_API = (id) => `/office_branch/${id}/`;
export const VENDOR_UPDATE_DELETE_API = (id) => `/vendor/${id}/`;
export const VENDOR_LIST_BY_BRANCH_API = (id) => `/vendor/${id}/get_by_branch/`;
export const VENDOR_MENU_UPDATE_DELETE_API = (id) => `/menu/${id}/`;
export const VENDOR_MENU_LIST_BY_VENDOR_API = (id) => `/menu/${id}/get_menu_list_by_vendor/`;
export const SUBSIDY_COST_LIST_CREATE_API = "/subsidy_cost/";

export const LUNCH_REORT_FOR_EMPLOYEE_POST = "/lunch_reports/$/employee_self_report/";
export const LUNCH_REORT_FOR_ADMIN_POST = "/lunch_reports/$/admin_lunch_report/";
export const DAILY_LUNCH_REPORT_GET = "/lunch_reports/$/daily_employee_lunch_orders/";
export const LUNCH_ORDER_SUMMARY = "";
