/* eslint-disable react/prop-types */
import Course from "./Course";

export default function MyCourses({ coursesAndSections }) {
  return (
    <>
      {coursesAndSections.map((val, i) => (
        <Course
          course_id={val.courses.id}
          course_name={val.courses.course_name}
          part={val.courses.part}
          section_name={val.sections.section_name}
          section_id={val.sections.id}
          session={val.session}
          key={i}
        />
      ))}
    </>
  );
}
