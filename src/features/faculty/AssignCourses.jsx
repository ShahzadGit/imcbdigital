/* eslint-disable react/prop-types */
import { useState } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useForm } from "react-hook-form";
import { useGetCourses } from "./useGetCourses";
import { useGetSections } from "../students/useGetSections";
import { useCreateAssignCourses } from "./useCreateAssignCourses";
import { useGetAssignedCourses } from "./useGetAssignedCourses";

const Label = styled.label`
  font-weight: 600;
  padding: 0.5rem;
`;

const Error = styled.span`
  font-size: 1rem;
  color: var(--color-red-700);
`;

function AssignCourses({ teaches, faculty_id, onCloseModal }) {
  // State to manage which courses and sections are checked
  const [checkedCourses, setCheckedCourses] = useState({});
  const [checkedSections, setCheckedSections] = useState({});

  const { isLoading: isLoadingSections, data: sections } = useGetSections(); //Fetched from students feature
  const { isLoading: isLoadingCourses, data: courses } = useGetCourses(teaches); //Fetches courses taught by a faculty member
  const { isLoading: isLoadingPreCourses, data: coursesAndSections } =
    useGetAssignedCourses(faculty_id);
  const { isCreating, createAssignCourses } = useCreateAssignCourses();
  // console.log("🚀 ~ Courses ~ courses:", courses);
  // const { register, handleSubmit, formState, reset } = useForm({});
  const { handleSubmit } = useForm({});
  // const { errors: formErrors } = formState;
  const currentSession = new Date().getFullYear();

  const handleCourseChange = (courseId) => {
    setCheckedCourses((prev) => {
      const isCourseChecked = !prev[courseId];
      const newCheckedCourses = { ...prev, [courseId]: isCourseChecked };

      // Update section checkboxes for this course based on course check status
      const course = filteredCourses.find((course) => course.id === courseId);
      const newCheckedSections = { ...checkedSections };

      course.sections.forEach((section) => {
        if (isCourseChecked) {
          newCheckedSections[`${courseId}-${section.id}`] = true;
        } else {
          delete newCheckedSections[`${courseId}-${section.id}`];
        }
      });

      setCheckedSections(newCheckedSections);
      return newCheckedCourses;
    });
  };

  // Handle section checkbox change
  const handleSectionChange = (courseId, sectionId) => {
    setCheckedSections((prev) => {
      const newCheckedSections = {
        ...prev,
        [`${courseId}-${sectionId}`]: !prev[`${courseId}-${sectionId}`],
      };
      return newCheckedSections;
    });
  };

  // function handleClick() {
  //   setSelectedCourses([]);
  //   setFilteredCourses([]);
  //   setGroup("");
  // }

  function onSubmit() {
    // console.log("checkedCourses:", checkedCourses);
    // console.log("checkedSections:", checkedSections);
    const trueKeys = Object.entries(checkedSections)
      .filter(([key, value]) => {
        if (!key) console.log("No-key:", key); //This line just brings variable key in usage to escape the warning
        return value === true;
      })
      .map(([key]) => key); // Extract the keys

    console.log(trueKeys); // Output: ["24-1", "25-1"]

    // This will extract courseIds and sections ids and pushes them into this array
    const coursesAndSections = [];
    trueKeys.map((val) =>
      coursesAndSections.push({
        course_id: Number(val.split("-").at(0)),
        section_id: Number(val.split("-").at(1)),
        faculty_id,
        session:
          currentSession + "-" + (currentSession + 1).toString().slice(2, 4),
      })
    );
    // console.log("coursesAndSections:", coursesAndSections);
    const deletePrv = courseLength > 0 ? true : false; //This is to check if the courses are to be changed or registered
    // console.log("🚀 ~ onSubmit ~ deletePrv:", deletePrv);
    createAssignCourses(
      { coursesAndSections, deletePrv, faculty_id },
      {
        onSuccess: () => {
          // reset();
          //   navigate(`/dashboard`);
          onCloseModal();
        },
      }
    );
  }

  if (isLoadingCourses || isLoadingSections || isLoadingPreCourses)
    return <Spinner />;
  // This code will filter all sections and  adds them as property to each object
  const filteredCourses = courses.map((course) => ({
    ...course,
    sections: sections.filter(
      (section) =>
        course.group.includes(section.group) || course.group === "All"
    ),
  }));
  const courseLength = coursesAndSections.length; // This variable is access in onSubmit
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading type="h3">Select Section and Courses to Assign:</Heading>
      {courseLength > 0 ? (
        <Error>
          There are {courseLength} courses already assigned. Adding new Courses
          will delete previous and insert new ones!
        </Error>
      ) : null}
      <FormRow>
        <Label htmlFor="session">Session</Label>
        <Input
          type="text"
          id="session"
          defaultValue={
            currentSession + "-" + (currentSession + 1).toString().slice(2, 4)
          }
          readOnly={true}
        />
      </FormRow>

      {filteredCourses.length && (
        <fieldset>
          <legend>List of Subjects</legend>
          {filteredCourses.map((course, row) => (
            <div key={course.id}>
              <Input
                type="checkbox"
                id={course.course_name}
                checked={checkedCourses[course.id] || false}
                onChange={() => handleCourseChange(course.id)}
                name={course.course_name}
                // value={course.id}
                // disabled={selectedCourses.length >= courseLength}
              />
              <Label htmlFor={course.course_name}>{course.course_name}</Label>
              <fieldset>
                {/* <legend>{val.course_name}</legend> */}
                {course.sections.map((section) => (
                  <div
                    key={section.id}
                    style={{ display: "inline", marginLeft: "5px" }}
                  >
                    <Input
                      type="checkbox"
                      id={section.section_name + row}
                      checked={
                        checkedSections[`${course.id}-${section.id}`] || false
                      }
                      onChange={() =>
                        handleSectionChange(course.id, section.id)
                      }
                      disabled={!checkedCourses[course.id]} // Disable if parent course is not checked
                      name={section.section_name}
                      // value={section.id}
                    />
                    <label htmlFor={section.section_name + row}>
                      {section.section_name}
                    </label>
                  </div>
                ))}
              </fieldset>
            </div>
          ))}
        </fieldset>
      )}
      {Object.keys(checkedSections).length > 0 && (
        <FormRow>
          <Button onClick={() => onCloseModal()}>Cancel</Button>

          <Button disabled={isCreating}>Assign</Button>
        </FormRow>
      )}
    </Form>
  );
}
export default AssignCourses;
