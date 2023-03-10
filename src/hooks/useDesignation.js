import { useEffect, useState } from "react";

import { API } from "../utils/axios/axiosConfig";
import { DESIGNATION_BAND_GET } from "../utils/routes/api_routes/API_ROUTES";

export default function useDesignation() {
  const [designationLoading, setDesignationLoading] = useState(false);
  const [designationData, setDesignationData] = useState([]);

  useEffect(() => {
    setDesignationLoading(true);
    API.get(DESIGNATION_BAND_GET)
      .then((res) => {
        setDesignationData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDesignationLoading(false);
      });
  }, []);

  return designationData;
}
