import { KPI_OBJECTIVE_GET } from "../../utils/API_ROUTES";
import useFetch from "../useFetch";

export default function useKpiObjective() {
  const { data } = useFetch(KPI_OBJECTIVE_GET);

  return data?.data;
}
