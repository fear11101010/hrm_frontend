import useFetch from "./useFetch";

export default function useProjects() {
  const data = useFetch("/project/");

  return data?.data?.data;
}
