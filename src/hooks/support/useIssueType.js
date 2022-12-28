import useFetch from "../useFetch";
import {ISSUE_TYPE_API} from "../../utils/routes/api_routes/SP_API_ROUTES";

export default function useIssueType() {
    const issueType = useFetch(ISSUE_TYPE_API);
    return issueType?.data?.data;
}
