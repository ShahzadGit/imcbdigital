import { useQuery } from "@tanstack/react-query";
import { getStudent } from "../../services/apiStudent";

export function useGetStudent(uuid) {
  console.log("useGetStudent ~ uuid:", uuid);

  const { isLoading, data: student } = useQuery({
    queryFn: () => getStudent(uuid),
    queryKey: ["student"],
  });

  return { isLoading, student };
}
