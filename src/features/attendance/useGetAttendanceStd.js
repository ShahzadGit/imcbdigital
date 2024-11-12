import { useQuery } from "@tanstack/react-query";
import { getAttendanceStd } from "../../services/apiAttendance";

export function useGetAttendanceStd(
  section_id,
  course_id,
  part,
  faculty_id,
  roll_no
) {
  const { isLoading, data = {} } = useQuery({
    queryFn: () =>
      getAttendanceStd(section_id, course_id, part, faculty_id, roll_no),
    queryKey: ["AttendanceStd"],
  });
  return { isLoading, data };
}
