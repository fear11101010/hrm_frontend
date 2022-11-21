import { useEffect, useState } from "react";
import { GET_SBU_API, ROLE_LIST_GET } from "../../utils/API_ROUTES";
import { API } from "../../utils/axios/axiosConfig";

export default function useRole() {
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    API.get(ROLE_LIST_GET)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return { data, isLoading };
}
