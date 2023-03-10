import { CONF_INC_NOINC_GET } from "../../utils/routes/api_routes/API_ROUTES";
import useFetch from "../useFetch";

export default function useConfIncNoinc() {
  const { data } = useFetch(CONF_INC_NOINC_GET);
  return data?.data;
}
