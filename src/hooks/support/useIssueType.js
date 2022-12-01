import useFetch from "../useFetch";
import {ISSUE_TYPE_API} from "../../utils/support/SP_API_ROUTES";

export default function useIssueType() {
    const issueType = useFetch(ISSUE_TYPE_API);
    return issueType?.data?.data;
}
