import {SBUDIRNAME_LIST_GET} from "../utils/routes/api_routes/API_ROUTES";
import useFetch from "./useFetch";

export default function useSbuDirName() {
    const sbu_dir_name = useFetch(SBUDIRNAME_LIST_GET);
    return sbu_dir_name?.data?.data;
}
