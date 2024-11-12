import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../services/apiStudentEnrolled";

export function useGetCourses(part) {
  const { isLoading, data = {} } = useQuery({
    queryFn: () => getCourses(part),
    queryKey: ["Courses"],
  });

  return { isLoading, data };
}
