import { TECHNICAL_IMPLEMENTATION_OPERATIONAL_GET } from "../../utils/routes/api_routes/API_ROUTES";
import useFetch from "../useFetch";

export default function useTechnicalImplementationOperational() {
  const { data } = useFetch(TECHNICAL_IMPLEMENTATION_OPERATIONAL_GET);
  return data?.data;
}
