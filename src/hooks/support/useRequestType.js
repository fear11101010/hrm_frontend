import useFetch from "../useFetch";
import {REQUEST_TYPE_API} from "../../utils/routes/api_routes/SP_API_ROUTES";

export default function useRequestType() {
    const requestType = useFetch(REQUEST_TYPE_API);
    return requestType?.data?.data;
}
