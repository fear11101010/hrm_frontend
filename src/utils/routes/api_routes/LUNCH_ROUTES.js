export const VENDOR_GET = (id) => `/vendor/${id}/get_by_branch/`;
export const OFFICE_BRANCH = `/office_branch/`;
export const WEEKLY_MENU_MAPPING = "/weekly_menu_mapping/";
export const LUNCH_ORDER_POST = "/order/";
export const LUNCH_ORDER_RETRIEVE = (id, month, year) => `/order/retrieve_by_employee/${id}/${month}/${year}/`;
export const MONTH_MAPPING = `/weekly_menu_mapping/$/lunch_mapping/`;
export const GUEST_LUNCH_POST = `/weekly_menu_mapping/$/lunch_mapping/`;
export const SUBSIDY_LIST_CREATE_API = '/subsidy/'
export const SUBSIDY_UPDATE_DELETE_API = id=> `/subsidy/${id}/`


export const SUBSIDY_COST_LIST_CREATE_API = '/subsidy_cost/'