export const MY_TICKETS_URL = '/support/my_tickets'
export const SUPPORT_DASHBOARD_URL = '/support'
export const SUPPORT_DASHBOARD_STATUS_WISE_URL = '/support/status_wise_list/:id/:type'
export const SUPPORT_DASHBOARD_STATUS_WISE_URL_FUNC = (id,type) =>`/support/status_wise_list/${id}/${type}`
export const ALL_TICKETS_URL = '/support/all_tickets'
export const OTHER_TICKETS_URL = '/support/other_tickets'
export const EDIT_TICKET_URL = '/support/edit_ticket/:id'
export const VIEW_TICKET_URL = '/support/view_ticket/:id'
export const EDIT_TICKET_URL_FUNC = (id)=> `/support/edit_ticket/${id}`
export const VIEW_TICKET_URL_FUNC = (id)=> `/support/view_ticket/${id}`
export const CREATE_TICKET_URL = '/support/create_ticket'