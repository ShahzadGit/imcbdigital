import supabase from "./supabase";

// Create attendance records for a particular date, month, section, part and etc. for a faculty member
export async function createAttendance({ attendance }) {
  //   console.log("createAttendance ~ attendance:", attendance);
  //   Insert new courses
  let query = supabase.from("attendance").insert([...attendance]);
  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error("Data could not be added!");
  }

  return data;
}

// Fetches all Attendance marked by a Faculty member
export async function getAttendance(section_id, course_id, part, faculty_id) {
  //   console.log(
  //     "🚀 ~ getAttendance ~ section_id, course_id, part, faculty_id:",
  //     section_id,
  //     course_id,
  //     part,
  //     faculty_id
  //   );

  let query = supabase
    .from("attendance")
    .select("*")
    .eq("faculty_id", Number(faculty_id))
    .eq("section_id", Number(section_id))
    .eq("course_id", Number(course_id))
    .eq("part", part);
  // .eq("session", currentSession);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Data not found");
  }

  return data;
}

// Fetches Attendance of a Student marked by a Faculty member
export async function getAttendanceStd(
  section_id,
  course_id,
  part,
  faculty_id,
  roll_no
) {
  let query = supabase
    .from("attendance")
    .select(
      "date, month, status, roll_no, courses(course_name), students(fullName, avatar)"
    )
    .eq("faculty_id", Number(faculty_id))
    .eq("section_id", Number(section_id))
    .eq("course_id", Number(course_id))
    .eq("part", part)
    .eq("roll_no", Number(roll_no));
  // .eq("session", currentSession);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Data not found");
  }

  return data;
}
