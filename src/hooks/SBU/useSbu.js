import { useEffect, useState } from "react";
import { GET_SBU_API } from "../../utils/routes/api_routes/API_ROUTES";
import { API } from "../../utils/axios/axiosConfig";

export default function useSbu() {
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    API.get(GET_SBU_API)
      .then((res) => {
        if (res.data.statuscode === 200) {
          setData(res.data.data);
        } else {
          setData([]);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return { data, isLoading };
}
