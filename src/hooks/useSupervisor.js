import { useEffect, useState } from "react";
import { API } from "../utils/axios/axiosConfig";
import { GET_SUPERVISOR } from "../utils/routes/api_routes/API_ROUTES";

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
