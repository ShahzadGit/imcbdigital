import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../services/apiFaculty";

export function useGetCourses(teaches) {
  const { isLoading, data = {} } = useQuery({
    queryFn: () => getCourses(teaches),
    queryKey: ["Courses", "For Faculty"],
  });

  return { isLoading, data };
}
