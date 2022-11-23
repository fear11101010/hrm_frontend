import { useEffect, useState } from "react";
import { DESIGNATION_BAND_GET } from "../utils/API_ROUTES";
import { API } from "../utils/axios/axiosConfig";

export default function useDesignation() {
  const [designationLoading, setDesignationLoading] = useState(false);
  const [designationData, setDesignationData] = useState([]);

  useEffect(() => {
    setDesignationLoading(true);
    API.get(DESIGNATION_BAND_GET)
      .then((res) => {
        console.log(res.data.data);
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
