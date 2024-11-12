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
import { useGetSections } from "./useGetSections";
import { useGetCourses } from "./useGetCourses";
import { useCreateRegisteredCourses } from "./useCreateRegisteredCourses";

const Label = styled.label`
  font-weight: 500;
`;

// const Error = styled.span`
//   font-size: 1rem;
//   color: var(--color-red-700);
// `;

function RegisterCourses({ roll_no, part, onCloseModal, group: groupEdit }) {
  // console.log("🚀 ~ RegisterCourses ~ roll_no:", roll_no);
  const [group, setGroup] = useState("");
  const [sectionId, setSectionId] = useState(null);
  const [filteredSections, setFilteredSections] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courseLength, setCourseLength] = useState(3);

  const deletePrv = groupEdit ? true : false; //This is to check if the courses are to be changed or registered

  const { isLoading: isLoadingSections, data: sections } = useGetSections();
  const { isLoading: isLoadingCourses, data: courses } = useGetCourses(part);
  const { isCreating, createRegisteredCourses } = useCreateRegisteredCourses();
  // console.log("🚀 ~ RegisterCourses ~ courses:", courses);
  // const { register, handleSubmit, formState, reset } = useForm({});
  const { handleSubmit } = useForm({});
  // const { errors: formErrors } = formState;

  const handleGroupChange = (event) => {
    setGroup(event.target.value);
    // console.log("Group: ", group);
    if (event.target.value === "I.Com") setCourseLength(4);
    // console.log("🚀 ~ handleGroupChange ~ courseLength:", courseLength);
    setFilteredSections(sections.filter((v) => v.group === event.target.value));
    // console.log("🚀 ~ RegisterCourses ~ filteredSections:", filteredSections);
    setSelectedCourses([]);
    setFilteredCourses([]);
  };
  const handleSectionChange = (event) => {
    setSectionId(Number(event.target.value));
    // console.log("SectionID", sectionId);
    setFilteredCourses(
      courses.filter((v) => v.group === group || v.group.includes(group))
    );
    // console.log("🚀 ~ RegisterCourses ~ filteredCourses:", filteredCourses);
    setSelectedCourses([]);
  };

  const handleChange = (event) => {
    if (event.target.checked) {
      if (!selectedCourses.length)
        setSelectedCourses([Number(event.target.value)]);
      else setSelectedCourses([...selectedCourses, Number(event.target.value)]);
    } else {
      setSelectedCourses(
        selectedCourses.filter((e) => e !== Number(event.target.value))
      );
    }
    // console.log("🚀 ~ handleChange ~ selectedCourses:", selectedCourses);
  };

  function handleClick() {
    setSelectedCourses([]);
    setFilteredCourses([]);
    setGroup("");
  }

  function onSubmit() {
    const compulsoryCourses = courses.filter((val) => val.isCompulsory);
    const ids = compulsoryCourses.map((val) => val.id);

    const newCourses = [];

    selectedCourses.map((val) => newCourses.push({ roll_no, course_id: val }));
    ids.map((val) => newCourses.push({ roll_no, course_id: val }));
    createRegisteredCourses(
      { newCourses, group, sectionId, roll_no, deletePrv },
      //   { ...data },
      {
        onSuccess: () => {
          // reset();
          //   navigate(`/dashboard`);
          onCloseModal();
        },
      }
    );
  }

  if (isLoadingSections || isLoadingCourses) return <Spinner />;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading type="h3">Select Group and Courses to Register:</Heading>
      <FormRow>
        <Label htmlFor="group">Select the Group</Label>
        <select
          id="group"
          name="group"
          value={group}
          onChange={handleGroupChange}
        >
          <option>Select the Group</option>
          <option value={"Humanities"}>Humanities</option>
          <option value={"Pre-Engineering"}>Pre-Engineering</option>
          <option value={"Pre-Medical"}>Pre-Medical</option>
          <option value={"General Science"}>General Science</option>
          <option value={"ICS"}>ICS</option>
          <option value={"I.Com"}>I.Com</option>
        </select>
      </FormRow>
      <FormRow>
        <label htmlFor="section">Select Section</label>
        <select
          id="section"
          name="section"
          value={sectionId}
          onChange={handleSectionChange}
          aria-placeholder="select section"
          // {...register("section", {
          //   required: "This field is required!",
          // })}
          disabled={isLoadingSections}
        >
          <option>Select...</option>
          {filteredSections?.map((val) => (
            <option value={val.id} key={val.id}>
              {val.section_name}
            </option>
          ))}
        </select>
        {/* {formErrors?.priority?.message && (
          <Error>{formErrors.priority.message}</Error>
        )} */}
      </FormRow>

      {filteredCourses.length && (
        <fieldset>
          <legend>Pick THREE Elective Subjects</legend>

          {filteredCourses.map((val) => (
            <div key={val.id}>
              <Input
                type="checkbox"
                id={val.course_name}
                // checked={islStd}
                onChange={handleChange}
                name={val.course_name}
                value={val.id}
                disabled={selectedCourses.length >= courseLength}
              />
              <label htmlFor={val.course_name}>{val.course_name}</label>
            </div>
          ))}
        </fieldset>
      )}

      {selectedCourses.length >= courseLength && (
        <FormRow>
          <Button variation="green" onClick={handleClick}>
            Change Selection
          </Button>

          <Button disabled={isCreating}>Register</Button>
        </FormRow>
      )}
    </Form>
  );
}
export default RegisterCourses;
