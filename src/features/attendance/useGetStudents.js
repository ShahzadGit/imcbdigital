import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../../services/apiFaculty";

export function useGetStudents(sectionId, session, part) {
  const { isLoading, data: { data, count } = {} } = useQuery({
    queryFn: () => getStudents(sectionId, session, part),
    queryKey: ["Students"],
  });

  return { isLoading, data, count };
}
