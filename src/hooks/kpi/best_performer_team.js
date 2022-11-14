import { BEST_PERFORMER_TEAM_GET } from "../../utils/API_ROUTES";
import useFetch from "../useFetch";

export default function useBestPerformerTeam() {
  const { data } = useFetch(BEST_PERFORMER_TEAM_GET);
  return data?.data;
}
