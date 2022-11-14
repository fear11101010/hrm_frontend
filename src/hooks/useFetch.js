import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../utils/axios/axiosConfig";

function useFetch(url) {
  const [isloading, setIsLoading] = useState(null);
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    setIsLoading("loading...");
    setData([]);
    setErr("");
    const source = axios.CancelToken.source();

    API.get(url)
      .then((res) => setData(res.data))
      .catch((err) => {
        setErr(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    //cleanup Function
    return () => {
      source.cancel();
    };
  }, [url]);

  return { data, isloading, err };
}

export default useFetch;
