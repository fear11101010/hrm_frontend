import useFetch from "../useFetch";
import {REQUEST_TO_API} from "../../utils/routes/api_routes/SP_API_ROUTES";

export default function useRequestTo() {
    const requestTo = useFetch(REQUEST_TO_API);
    return requestTo?.data?.data;
}
