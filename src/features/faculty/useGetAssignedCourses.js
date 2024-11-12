import { useQuery } from "@tanstack/react-query";
import { getAssignedCourses } from "../../services/apiFaculty";

export function useGetAssignedCourses(faculty_id) {
  const { isLoading, data = {} } = useQuery({
    queryFn: () => getAssignedCourses(faculty_id),
    queryKey: ["AssignedCourses"],
  });
  return { isLoading, data };
}
