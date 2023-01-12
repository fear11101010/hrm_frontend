import React, { useEffect, useState } from "react";
import { API } from "../../utils/axios/axiosConfig";
import { SUB_SBU_GET } from "../../utils/routes/api_routes/API_ROUTES";

export default function useSubSbu() {
  const [subSbuLoading, setSubSbuLoading] = useState(false);
  const [subSbudata, setSubSbuData] = useState([]);

  useEffect(() => {
    setSubSbuLoading(true);
    API.get(SUB_SBU_GET)
      .then((res) => {
        if (res.data.statuscode === 200) {
          setSubSbuData(res.data.data);
        } else {
          setSubSbuData([]);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setSubSbuLoading(false);
      });
  }, []);
  return { subSbudata, subSbuLoading };
}
