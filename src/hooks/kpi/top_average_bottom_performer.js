import { TOP_AVG_BOTTOM_GET } from "../../utils/routes/api_routes/API_ROUTES";
import useFetch from "../useFetch";

export default function useTopAvgBotPerformer() {
  const { data } = useFetch(TOP_AVG_BOTTOM_GET);
  return data?.data;
}
