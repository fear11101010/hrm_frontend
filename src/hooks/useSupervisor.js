import { useEffect, useState } from "react";

import { GET_SUPERVISOR } from "../utils/routes/api_routes/API_ROUTES";
import { API } from "../utils/axios/axiosConfig";

export default function useSupervisor() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get(GET_SUPERVISOR)
      .then((res) => {
        if (res.data.statuscode === 200) {
          setData(res.data.data);
        } else {
          setData([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return data;
}
