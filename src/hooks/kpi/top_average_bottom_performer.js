import { TOP_AVG_BOTTOM_GET } from "../../utils/API_ROUTES";
import useFetch from "../useFetch";

export default function useTopAvgBotPerformer() {
  const { data } = useFetch(TOP_AVG_BOTTOM_GET);
  return data?.data;
}
