import React, { useEffect, useState } from "react";
import { API } from "../utils/axios/axiosConfig";

export default function useFetch(url) {
  const [isloading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    setIsLoading(true);
    API.get(url)
      .then((res) => setData(res.data))
      .catch((err) => {
        setErr(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return { isloading, data, err };
}
