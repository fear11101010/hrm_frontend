import useFetch from "../useFetch";
import {REQUEST_STATUS_API} from "../../utils/routes/api_routes/SP_API_ROUTES";

export default function useTicketStatus() {
    const requestStatus = useFetch(REQUEST_STATUS_API);
    return requestStatus?.data?.data;
}
