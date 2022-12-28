import { CRITICALITY_GET } from "../../utils/routes/api_routes/API_ROUTES";
import useFetch from "../useFetch";

export default function useCiritcality() {
  const { data } = useFetch(CRITICALITY_GET);
  return data?.data;
}
