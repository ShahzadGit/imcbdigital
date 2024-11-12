import { useQuery } from "@tanstack/react-query";
import { getAttendance } from "../../services/apiAttendance";

export function useGetAttendance(section_id, course_id, part, faculty_id) {
  const { isLoading, data = {} } = useQuery({
    queryFn: () => getAttendance(section_id, course_id, part, faculty_id),
    queryKey: ["Attendance"],
  });
  return { isLoading, data };
}
