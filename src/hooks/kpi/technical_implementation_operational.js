import { TECHNICAL_IMPLEMENTATION_OPERATIONAL_GET } from "../../utils/API_ROUTES";
import useFetch from "../useFetch";

export default function useTechnicalImplementationOperational() {
  const { data } = useFetch(TECHNICAL_IMPLEMENTATION_OPERATIONAL_GET);
  return data?.data;
}
