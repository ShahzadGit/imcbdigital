import { useQuery } from "@tanstack/react-query";
import { getStudent } from "../../services/apiStudentOnline";

export function useGetStudent(uuid) {
  const { isLoading, data: student = {} } = useQuery({
    queryFn: () => getStudent(uuid),
    queryKey: ["student"],
  });
  // console.log("🚀 ~ useGetStudent ~ student:", student);

  return { isLoading, student };
}
