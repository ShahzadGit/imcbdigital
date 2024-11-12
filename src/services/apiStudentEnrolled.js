import supabase, { supabaseUrl } from "./supabase";

export async function createEditStudent(newStudent, id) {
  console.log("createStudent ~ newStudent:", newStudent);

  const hasImagePath = typeof newStudent.avatar === "string"; //This will determine if data contains a URL or a FileType
  const imageName = `${Math.random()}-${newStudent.avatar.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newStudent.avatar
    : `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;

  // 1. Create/Edit student
  let query = supabase.from("students");

  // Create record if there is no id
  if (!id) query = query.insert([{ ...newStudent, avatar: imagePath }]);

  // Edit record if there exist an id
  if (id)
    query = query.update({ ...newStudent, avatar: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Data could not be added!");
  }

  // 2. Upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(imageName, newStudent.avatar);

  // 3. Delete record if there is error while uploading image
  if (storageError) {
    await supabase.from("students").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Image could not be uploaded!");
  }

  return data;
}

export async function deleteStudent(id) {
  const { data, error } = await supabase.from("students").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Record could not be deleted!");
  }

  return data;
}

// Fetches all Sections
export async function getSections() {
  let query = supabase.from("sections").select("id, section_name,group");

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Data not found");
  }

  return data;
}

// Fetches all Courses
export async function getCourses(part) {
  console.log("🚀 ~ getCourses ~ part:", part);
  let query = supabase.from("courses").select("*").eq("part", part);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Data not found");
  }

  return data;
}

// Registers Courses (XI) and Updates group and section columns in students table
export async function createRegisteredCourses({
  newCourses,
  group,
  sectionId,
  roll_no,
  deletePrv,
}) {
  // This will Delete already registered courses
  if (deletePrv) {
    const { error: errorDelete } = await supabase
      .from("registered_courses")
      .delete()
      .eq("roll_no", roll_no);
    if (errorDelete) {
      console.log(errorDelete);
      throw new Error("Data could not be added!");
    }
  }

  // Update group and section of a student
  let queryStd = supabase
    .from("students")
    .update({ group, section_id: sectionId })
    .eq("roll_no", roll_no);

  const { error: errorStd } = await queryStd.select();

  if (errorStd) {
    console.log(errorStd);
    throw new Error("Data could not be added!");
  } else {
    // Insert new courses
    let query = supabase.from("registered_courses").insert([...newCourses]);
    const { data, error } = await query.select();

    if (error) {
      console.log(error);
      throw new Error("Data could not be added!");
    }

    return data;
  }
}

// Registers Courses (XII) and Updates class_year column in students table
export async function createRegisteredCoursesXII({
  newCourses,
  roll_no,
  class_year,
}) {
  // Update class_year of a student
  let queryStd = supabase
    .from("students")
    .update({ class_year })
    .eq("roll_no", roll_no);

  const { error: errorStd } = await queryStd.select();

  if (errorStd) {
    console.log(errorStd);
    throw new Error("Data could not be added!");
  } else {
    // Insert new courses
    let query = supabase.from("registered_courses").insert([...newCourses]);
    const { data, error } = await query.select();

    if (error) {
      console.log(error);
      throw new Error("Data could not be added!");
    }

    return data;
  }
}

// Fetches all Registered Courses of a Students
export async function getRegisteredCourses(roll_no) {
  let query = supabase
    .from("registered_courses")
    .select("courses(course_name)")
    .eq("roll_no", roll_no);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Data not found");
  }

  return data;
}

// Fetches all Courses of ICOM-II
export async function getCoursesIComXii() {
  let query = supabase
    .from("courses")
    .select("id")
    .eq("group", "I.Com")
    .eq("part", "II");

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Data not found");
  }

  return data;
}
