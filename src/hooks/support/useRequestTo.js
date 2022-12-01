import useFetch from "../useFetch";
import {REQUEST_TO_API} from "../../utils/support/SP_API_ROUTES";

export default function useRequestTo() {
    const requestTo = useFetch(REQUEST_TO_API);
    return requestTo?.data?.data;
}
