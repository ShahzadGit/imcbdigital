import { useQuery } from "@tanstack/react-query";
import { getStudentsAndCourses } from "../../services/apiStudentOnline";

export function useGetStudentsAndCourses() {
  const { isLoading, data: { data, count } = {} } = useQuery({
    queryFn: () => getStudentsAndCourses(),
    queryKey: ["StudentsAndCourses"],
  });

  return { isLoading, data, count };
}
