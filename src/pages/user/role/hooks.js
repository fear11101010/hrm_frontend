import { useEffect, useState } from "react";
import { FUNCTIONNAME_GET, MODULE_NAME_GET, MODULE_URL_GET } from "../../../utils/routes/api_routes/API_ROUTES";
import { API } from "../../../utils/axios/axiosConfig";

// FUNCTIONNAME_GET
// MODULE_NAME_GET
// MODULE_URL_GET

export const useFunction = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get(FUNCTIONNAME_GET)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return data;
};
export const useModuleName = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get(MODULE_NAME_GET)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return data;
};
export const useModuleUrl = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get(MODULE_URL_GET)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return data;
};
