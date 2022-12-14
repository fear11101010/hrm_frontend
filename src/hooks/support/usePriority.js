import useFetch from "../useFetch";
import {PRIORITY_API} from "../../utils/support/SP_API_ROUTES";

export default function usePriority() {
    const issueType = useFetch(PRIORITY_API);
    return issueType?.data?.data;
}
