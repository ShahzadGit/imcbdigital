import supabase from "./supabase";

// Fetches all Faculty Members
export async function getAllFaculty() {
  let query = supabase.from("faculty").select("*", {
    count: "exact",
  });

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Data not found");
  }

  return { data, count };
}

// Fetches a faculty
export async function getFaculty(uuid) {
  let query = supabase
    .from("faculty")
    .select("*", { count: "exact" })
    .eq("uuid", uuid);

  const { data: currentFaculty, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Faculty not found");
  }

  return currentFaculty;
}

// Fetches all Courses that a faculty member teaches
export async function getCourses(teaches) {
  // console.log("GetCourses ~ teaches:", teaches);
  let query = supabase.from("courses").select("*").in("course_name", teaches);
  // .in("course_name", [`${teaches}-I`, `${teaches}-II`]);
  // .like("course_name", `%${teaches}%`);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Data not found");
  }

  return data;
}

// Assign Courses and sections to a faculty member and updates the boolean coursesAssigned
export async function createAssignCourses({
  coursesAndSections,
  deletePrv,
  faculty_id,
}) {
  // This will Delete already assigned courses
  if (deletePrv) {
    const { error: errorDelete } = await supabase
      .from("assigned_courses")
      .delete()
      .eq("faculty_id", faculty_id);
    if (errorDelete) {
      console.log(errorDelete);
      throw new Error("Data could not be added!");
    }
  }

  // Insert new courses
  let query = supabase.from("assigned_courses").insert([...coursesAndSections]);
  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error("Data could not be added!");
  }

  return data;
}

// Fetches all Assigned Courses of a Faculty member (for current Session)
export async function getAssignedCourses(faculty_id) {
  // let currentSession = new Date().getFullYear();
  // currentSession += "-" + (currentSession + 1).toString().slice(2, 4);
  let query = supabase
    .from("assigned_courses")
    .select(
      "courses(id, course_name, part), sections(id, section_name), session"
    )
    .eq("faculty_id", faculty_id);
  // .eq("session", currentSession);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Data not found");
  }

  return data;
}

// Fetches all Students for Attendance
export async function getStudents(sectionId, session, part) {
  let query = supabase
    .from("students")
    .select("roll_no, fullName, avatar")
    .eq("section_id", Number(sectionId))
    .eq("session", session)
    .eq("class_year", `HSSC-${part}`);

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Data not found");
  }

  return { data, count };
}
