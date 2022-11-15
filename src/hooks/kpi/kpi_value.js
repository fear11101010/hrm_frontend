import { KPI_VALUE_GET } from "../../utils/API_ROUTES";
import useFetch from "../useFetch";

export default function useKpiValue() {
  const { data } = useFetch(KPI_VALUE_GET);

  return data?.data;
}
