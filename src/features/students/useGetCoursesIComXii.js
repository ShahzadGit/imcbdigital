import { useQuery } from "@tanstack/react-query";
import { getCoursesIComXii } from "../../services/apiStudentEnrolled";

export function useGetCoursesIComXii() {
  const { isLoading, data = {} } = useQuery({
    queryFn: () => getCoursesIComXii(),
    queryKey: ["Courses", "IComXII"],
  });

  return { isLoading, data };
}
