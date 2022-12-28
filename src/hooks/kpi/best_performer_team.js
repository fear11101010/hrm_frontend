import { BEST_PERFORMER_TEAM_GET } from "../../utils/routes/api_routes/API_ROUTES";
import useFetch from "../useFetch";

export default function useBestPerformerTeam() {
  const { data } = useFetch(BEST_PERFORMER_TEAM_GET);
  return data?.data;
}
