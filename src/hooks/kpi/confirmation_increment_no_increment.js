import { CONF_INC_NOINC_GET } from "../../utils/API_ROUTES";
import useFetch from "../useFetch";

export default function useConfIncNoinc() {
  const { data } = useFetch(CONF_INC_NOINC_GET);
  return data?.data;
}
