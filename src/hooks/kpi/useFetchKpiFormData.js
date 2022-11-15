import {useEffect, useState} from "react";
import {API} from "../../utils/axios/axiosConfig";
import {KPI_PERFORMANCE_FORM_SINGLE} from "../../utils/API_ROUTES";
import {toast} from "react-toastify";

function useFetchKpiFormData(id) {
    const [data,setData] = useState({});
    const [loading,setLoading] = useState(false);
    const [err,setErr] = useState(undefined);
    useEffect(()=>{
        setLoading(true)
        API.get(KPI_PERFORMANCE_FORM_SINGLE(id))
            .then((response)=>{
                console.log(response.data.data);
                setData(response.data.data);
            }).catch(err=>{
                setErr(err.response?.data)
        }).finally(()=>{
            setLoading(false);
        })
    },[])
    return {data,err,loading};
}
export default useFetchKpiFormData