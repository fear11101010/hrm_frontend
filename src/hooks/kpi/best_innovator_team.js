import { BEST_INNOVATOR_TEAM_GET } from "../../utils/routes/api_routes/API_ROUTES";
import useFetch from "../useFetch";

export default function useBestInnovatorTeam() {
  const { data } = useFetch(BEST_INNOVATOR_TEAM_GET);
  return data?.data;
}
