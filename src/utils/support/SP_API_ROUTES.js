export const SUPPORT_DASHBOARD_API = '/support_dashboard/'
export const SUPPORT_DASHBOARD_LIST_STATUS_API =id=> `/support_dashboard/${id}/`
export const REQUEST_TYPE_API = '/request_type/'
export const ISSUE_TYPE_API = '/issue_type/'
export const REQUEST_STATUS_API = '/request_status/'
export const REQUEST_TO_API = '/request_to/'
export const PRIORITY_API = '/request_priority/'
export const TICKET_LIST_CREATE_API = '/request_detail/'
export const REQUEST_STATUS_UPDATE_API = '/request_detail_status_update/'
export const REQUEST_MESSAGE_SEND_API = '/request_queries/'
export const REQUEST_MESSAGE_REPLY_API = '/request_reply_queries/'
export const FETCH_TICKET_BY_ID_API = id=> `/individual_request_detail/${id}/`
export const UPDATE_TICKET_BY_ID_API = id=> `/request_detail_update/${id}/`
export const APPROVE_REQUEST_API = id=> `/support_request/${id}/request_approve/`