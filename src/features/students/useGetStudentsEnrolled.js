import { useQuery } from "@tanstack/react-query";
import { getStudentsEnrolled } from "../../services/apiStudentOnline";

export function useGetStudentsEnrolled() {
  const { isLoading, data: { data, count } = {} } = useQuery({
    queryFn: () => getStudentsEnrolled(),
    queryKey: ["StudentsEnrolled"],
  });

  return { isLoading, data, count };
}
