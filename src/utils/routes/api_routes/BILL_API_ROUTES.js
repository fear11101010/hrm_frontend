export const BILL_LIST_GET = `/invoice/`;
export const BILL_POST = `/invoice/`;
export const BILL_APPROVE_LIST_GET = `/invoice/$/bill_approve_list/`;
export const BILL_EDIT = (id) => `/invoice/${id}/`;
export const BILL_EACH_GET = (id) => `/bill_invoice/${id}/`;
export const STATUS_CHANGE_API = `/bill_status/`;

export const CONVEYANCE_LIST_API = "/conveyance/";
export const CONVEYANCE_EACH_GET_API = (id) => `/conveyance/${id}/`;
export const CONVEYANCE_EACH_PUT_API = (id) => `/conveyance/${id}/`;
export const CONVEYANCE_APPROVE_LIST_GET = `/conveyance/$/bill_approve_list/`;
export const CONVEYANCE_POST = "/conveyance/";
