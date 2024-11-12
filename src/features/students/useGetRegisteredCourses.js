import { useQuery } from "@tanstack/react-query";
import { getRegisteredCourses } from "../../services/apiStudentEnrolled";

export function useGetRegisteredCourses(roll_no) {
  const { isLoading, data = {} } = useQuery({
    queryFn: () => getRegisteredCourses(roll_no),
    queryKey: ["RegisteredCourses"],
  });
  return { isLoading, data };
}
