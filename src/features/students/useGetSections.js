import { useQuery } from "@tanstack/react-query";
import { getSections } from "../../services/apiStudentEnrolled";

export function useGetSections() {
  const { isLoading, data = {} } = useQuery({
    queryFn: () => getSections(),
    queryKey: ["Sections"],
  });

  return { isLoading, data };
}
