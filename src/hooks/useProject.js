import {PROJECT_LIST_GET} from "../utils/API_ROUTES";
import useFetch from "./useFetch";

export default function useProject() {
    const employeeList = useFetch(PROJECT_LIST_GET);
    return employeeList?.data?.data;
}
