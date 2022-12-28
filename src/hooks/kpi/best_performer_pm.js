import { BEST_PERFORMER_PM_GET } from "../../utils/routes/api_routes/API_ROUTES";
import useFetch from "../useFetch";

export default function useBestPerformerPm() {
  const { data } = useFetch(BEST_PERFORMER_PM_GET);
  return data?.data;
}
