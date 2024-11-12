import { useQuery } from "@tanstack/react-query";
import { getAllFaculty } from "../../services/apiFaculty";

export function useGetAllFaculty() {
  const { isLoading, data: { data, count } = {} } = useQuery({
    queryFn: () => getAllFaculty(),
    queryKey: ["Faculty-All"],
  });

  return { isLoading, data, count };
}
