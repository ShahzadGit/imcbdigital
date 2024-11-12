import { useQuery } from "@tanstack/react-query";
import { getFaculty } from "../../services/apiFaculty";

export function useGetFaculty(uuid) {
  const { isLoading, data: faculty = {} } = useQuery({
    queryFn: () => getFaculty(uuid),
    queryKey: ["Faculty"],
  });

  return { isLoading, faculty };
}
