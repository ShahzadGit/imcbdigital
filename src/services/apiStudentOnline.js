import supabase from "./supabase";
// import { PAGE_SIZE } from "../utils/constants";

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
export async function getCoursesApplied(uuid) {
  // const { data: currentStudent, errorStd } = await supabase
  //   .from("studentsapplied")
  //   .select("id")
  //   .eq("uuid", id);

  // console.log("getStudent ~ currentStudent:", currentStudent[0].id);

  // if (errorStd) {
  //   console.error(errorStd);
  //   throw new Error("Student ID not found");
  // } else {
  //   let query = supabase
  //     .from("courses_applied")
  //     .select("id, priority, group, courses, studentId", { count: "exact" })
  //     .eq("studentId", currentStudent[0].id);

  //   const { data: courses_applied, error } = await query;

  //   if (error) {
  //     console.error(error);
  //     throw new Error("Course not found");
  //   }

  //   return courses_applied;
  // }

  let query = supabase
    .from("courses_applied")
    .select("id, priority, group, courses, studentId", { count: "exact" })
    .eq("student_uuid", uuid);

  const { data: courses_applied, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Course not found");
  }

  return courses_applied;
}

// Fetches all Students and Courses
export async function getStudentsAndCourses() {
  let query = supabase
    .from("studentsapplied")
    .select("*,courses_applied(priority, group, courses, studentId)", {
      count: "exact",
    });

  // if (page) {
  //   const from = (page - 1) * PAGE_SIZE;
  //   const to = from + PAGE_SIZE - 1;
  //   query = query.range(from, to);
  // }
  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Data not found");
  }

  return { data, count };
}

// Fetches a student
export async function getStudent(uuid) {
  // console.log("getStudent ~ uuid:", uuid);

  let query = supabase
    .from("studentsapplied")
    .select("*", { count: "exact" })
    .eq("uuid", uuid);

  const { data: currentStudent, error } = await query;
  // console.log("getStudent ~ currentStudent:", currentStudent);

  if (error) {
    console.error(error);
    throw new Error("Student not found");
  }

  return currentStudent;
}

// This will add all the data from studentsapplied table to students table, as a registered student.
export async function createRegisteredStudent(newStudent) {
  //   console.log("createStudent ~ newStudent:", newStudent);
  const {
    id,
    avatar,
    cnic,
    cnic_father,
    contact,
    contact_wtp,
    dob,
    father_name,
    fullName,
    present_address,
  } = newStudent;

  let query = supabase.from("students").insert([
    {
      avatar,
      cnic,
      contact,
      contact_wtp,
      dob,
      father_name,
      cnic_father,
      fullName,
      present_address,
    },
  ]);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Data could not be transfered!");
  }

  let queryUpdate = supabase
    .from("studentsapplied")
    .update({ isRegistered: true })
    .eq("id", id);

  const { data2, error2 } = await queryUpdate.select().single();
  console.log("🚀 ~ createRegisteredStudent ~ data2:", data2);

  if (error2) {
    console.log(error);
    throw new Error("Registered status could not be updated!");
  }
  return data;
}

// Fetches all Students Enrolled
export async function getStudentsEnrolled() {
  let query = supabase.from("students").select("*", {
    count: "exact",
  });

  // if (page) {
  //   const from = (page - 1) * PAGE_SIZE;
  //   const to = from + PAGE_SIZE - 1;
  //   query = query.range(from, to);
  // }
  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Data not found");
  }

  return { data, count };
}
