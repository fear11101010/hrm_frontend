import { BEST_INNOVATOR_TEAM_GET } from "../../utils/API_ROUTES";
import useFetch from "../useFetch";

export default function useBestInnovatorTeam() {
  const { data } = useFetch(BEST_INNOVATOR_TEAM_GET);
  return data?.data;
}
