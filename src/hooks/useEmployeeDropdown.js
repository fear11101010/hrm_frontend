import { useEffect, useState } from "react";
import { API } from "../utils/axios/axiosConfig";

export default function useEmployeeDropdown() {
  const [employeeDropdownLoading, setEmployeeDropDownLoading] = useState(false);
  const [employeeDropdownList, setEmployeeDropdownList] = useState([]);

  useEffect(() => {
    setEmployeeDropDownLoading(true);
    API.get("employee_list_dropdown/")
      .then((res) => {
        setEmployeeDropdownList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEmployeeDropDownLoading(false);
      });
  }, []);

  return { employeeDropdownLoading, employeeDropdownList };
}

// useEmployeeDropdown;
