import supabase from "./supabase";

export async function createStudent(newStudent) {
  //   console.log("createStudent ~ newStudent:", newStudent);

  let query = supabase.from("studentsapplied").insert([{ ...newStudent }]);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Form could not be created!");
  }
  return data;
}

export async function createCourses(newCourses) {
  // console.log("createCourses ~ newCourses:", newCourses);

  let query = supabase.from("courses_applied").insert([{ ...newCourses }]);

  const { data, error } = await query.select().single();

  if (error) {
    // console.log(error);
    throw new Error("Courses could not be added!");
  }
  return data;
}

// Fetches all Courses of a Students
export async function getCoursesApplied(id) {
  let query = supabase
    .from("courses_applied")
    .select("id, priority, group, courses, studentId", { count: "exact" })
    .eq("studentId", id);

  const { data: courses_applied, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Course not found");
  }

  return courses_applied;
}

// Fetches a student
export async function getStudent(uuid) {
  let query = supabase
    .from("studentsapplied")
    .select("*", { count: "exact" })
    .eq("uuid", uuid);

  const { data: currentStudent, error } = await query;
  console.log("getStudent ~ currentStudent:", currentStudent);

  if (error) {
    console.error(error);
    throw new Error("Student not found");
  }

  return currentStudent;
}
