import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import Spinner from "../ui/Spinner";
import { useGetFaculty } from "../features/faculty/useGetFaculty";
import ViewAttendanceStd from "../features/attendance/ViewAttendanceStd";

export default function AttendanceViewPageStd() {
  const { courseId, sectionId, session, part, roll_no } = useParams();
  //   console.log("🚀 ~ AttendanceViewPageStd ~ roll_no:", roll_no);
  //   console.log("🚀 ~ MarkAttendance ~ part:", part);
  //   console.log("🚀 ~ MarkAttendance ~ session:", session);
  //   console.log("🚀 ~ MarkAttendance ~ sectionId:", sectionId);
  //   console.log("🚀 ~ MarkAttendance ~ courseId:", courseId);

  const { user, isLoading } = useUser();
  const { role } = user.user_metadata;
  const navigate = useNavigate();

  const { id: uuid } = user;

  const { faculty, isLoading: isLoadingFaculty } = useGetFaculty(uuid);

  useEffect(
    function () {
      if (role !== "faculty") navigate("/pagenotfound");
    },
    [role, isLoading, navigate]
  );

  if (isLoading || isLoadingFaculty) return <Spinner />;
  const faculty_id = faculty[0]?.id;
  return (
    <>
      <ViewAttendanceStd
        course_id={courseId}
        section_id={sectionId}
        session={session}
        part={part}
        faculty_id={faculty_id}
        roll_no={roll_no}
      />
    </>
  );
}
