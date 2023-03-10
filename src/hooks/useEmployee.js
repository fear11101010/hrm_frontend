import { EMPLOYEE_LIST_GET } from "../utils/routes/api_routes/API_ROUTES";
import useFetch from "./useFetch";

export default function useEmployee() {
  const employeeList = useFetch(EMPLOYEE_LIST_GET);
  return employeeList?.data?.data;
}
