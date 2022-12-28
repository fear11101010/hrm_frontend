import { KPI_OBJECTIVE_GET } from "../../utils/routes/api_routes/API_ROUTES";
import useFetch from "../useFetch";

export default function useKpiObjective() {
  const { data } = useFetch(KPI_OBJECTIVE_GET);

  return data?.data;
}
