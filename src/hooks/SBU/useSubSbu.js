import React, { useEffect, useState } from "react";
import { SUB_SBU_GET } from "../../utils/API_ROUTES";
import { API } from "../../utils/axios/axiosConfig";

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
