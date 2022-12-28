import { KPI_VALUE_GET } from "../../utils/routes/api_routes/API_ROUTES";
import useFetch from "../useFetch";

export default function useKpiValue() {
  const { data } = useFetch(KPI_VALUE_GET);

  return data?.data;
}
