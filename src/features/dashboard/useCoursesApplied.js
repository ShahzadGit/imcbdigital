import { useQuery } from "@tanstack/react-query";
import { getCoursesApplied } from "../../services/apiStudent";
import { useParams } from "react-router-dom";

export function useCoursesApplied() {
  const { studentId } = useParams();

  const {
    isLoading,
    data: courses_applied = {}, //It will set it to an empty object to avoid the undefined error.
    count,
  } = useQuery({
    queryKey: ["courses_applied"],
    queryFn: () => getCoursesApplied(studentId),
    retry: false,
  });

  return { isLoading, courses_applied, count };
}
