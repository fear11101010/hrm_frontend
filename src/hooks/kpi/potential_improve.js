import { POTENTIAL_FOR_IMPROVEMENT_GET } from "../../utils/API_ROUTES";
import useFetch from "../useFetch";

export default function usePotentialForImprovement() {
  const { data } = useFetch(POTENTIAL_FOR_IMPROVEMENT_GET);
  return data?.data;
}
