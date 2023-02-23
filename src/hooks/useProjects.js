import useFetch from "./useFetch";

export default function useProjects() {
  const data = useFetch("/sub_sbu/");

  return data?.data?.data;
}
