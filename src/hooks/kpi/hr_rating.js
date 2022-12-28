import { HR_RATING_GET } from "../../utils/routes/api_routes/API_ROUTES";
import useFetch from "../useFetch";

export default function useHrRating() {
  const { data } = useFetch(HR_RATING_GET);
  return data?.data;
}
