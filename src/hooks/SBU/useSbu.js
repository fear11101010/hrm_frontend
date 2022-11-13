import { useEffect, useState } from "react";
import { GET_SBU_API } from "../../utils/API_ROUTES";
import { API } from "../../utils/axios/axiosConfig";

export default function useSbu() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get(GET_SBU_API)
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
