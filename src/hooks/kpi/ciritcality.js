import { CRITICALITY_GET } from "../../utils/API_ROUTES";
import useFetch from "../useFetch";

export default function useCiritcality() {
  const { data } = useFetch(CRITICALITY_GET);
  return data?.data;
}
