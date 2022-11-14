import { BEST_PERFORMER_ORG_GET } from "../../utils/API_ROUTES";
import useFetch from "../useFetch";

export default function useBestPerformerOrganization() {
  const { data } = useFetch(BEST_PERFORMER_ORG_GET);
  return data?.data;
}
