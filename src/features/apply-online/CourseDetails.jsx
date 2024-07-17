import { useState } from "react";
import Form from "../../ui/Form";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateCourses } from "./useCreateCourses";
import { useCoursesApplied } from "../dashboard/useCoursesApplied";
import Spinner from "../../ui/Spinner";
import { useForm } from "react-hook-form";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1rem;
  color: var(--color-red-700);
`;

export default function CourseDetails() {
  const [group, setGroup] = useState("");
  const [priority, setPriority] = useState("");
  const { studentId } = useParams();
  const [state, setState] = useState({
    islStd: true,
    history: true,
    civics: false,
    hAndP: false,
    geo: false,
    eco: false,
  });
  const [subjects, setSubjects] = useState([]);

  const [stateForCS, setstateForCS] = useState({
    eco_cs: false,
    stats: false,
    physics: false,
  });
  const [subjectsCS, setSubjectsCS] = useState([]);

  const { isCreating, createCourses } = useCreateCourses();
  const navigate = useNavigate();

  const { islStd, history, civics, hAndP, geo, eco } = state;
  const error =
    [islStd, history, civics, hAndP, geo, eco].filter((v) => v).length >= 3;

  const { eco_cs, physics, stats } = stateForCS;
  const errorCS = [eco_cs, physics, stats].filter((v) => v).length >= 1;

  const { isLoading, courses_applied } = useCoursesApplied();

  // const { register, handleSubmit, getValues, formState, reset } = useForm({});
  const { register, handleSubmit, formState, reset } = useForm({});

  const { errors: formErrors } = formState;

  const handleChange1 = (event) => {
    if (event.target.checked) {
      if (subjects[0] === "") setSubjects([event.target.value]);
      else setSubjects([...subjects, event.target.value]);
    } else {
      setSubjects(subjects.filter((e) => e !== event.target.value));
    }
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    // console.log("Subjects: ", subjects);
  };

  const handleChange2 = (event) => {
    if (event.target.checked) {
      if (subjectsCS[0] === "") setSubjectsCS([event.target.value]);
      else setSubjectsCS([...subjects, event.target.value]);
    } else {
      setSubjectsCS(subjectsCS.filter((e) => e !== event.target.value));
    }
    setstateForCS({
      ...stateForCS,
      [event.target.name]: event.target.checked,
    });
    // console.log("Subjects: ", subjects);
  };

  const handleSelectChange = (event) => {
    setGroup(event.target.value);
    // console.log("Group: ", group);
    setSubjects([""]);
    setState({
      history: false,
      civics: false,
      hAndP: false,
      geo: false,
      eco: false,
    });
    setPriority("");
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  function onSubmit() {
    // e.preventDefault();
    let courses;

    if (group === "Humanities")
      courses = subjects[0] + "-" + subjects[1] + "-" + subjects[2];
    else if (group === "Pre-Engineering") courses = "Chemistry-Maths-Physics";
    else if (group === "Pre-Medical") courses = "Chemistry-Bio-Physics";
    else if (group === "General Science")
      courses = "Economics-Maths-Statistics";
    else if (group === "ICS") courses = "Computer-Maths-" + subjectsCS[0];
    else if (group === "I.Com")
      courses = "Accounting-Commerce-Bus.Math-Economics";
    // console.log("Priority-in OnSubmit-->", priority);
    createCourses(
      { courses, group, studentId, priority },
      {
        // onSuccess: () => {
        //   reset();
        //   // console.log("Data after submission...", data);
        //   navigate(`/dashboard/${studentId}`);
        // },
        onSettled: () => {
          reset();
          // console.log("Data after submission...", data);
          navigate(`/dashboard/${studentId}`);
        },
      }
    );
  }
  if (isLoading || isCreating) return <Spinner />;
  const courseCount = courses_applied.length;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading type="h3">Select the group and courses to apply for:</Heading>
      <FormRow>
        <Label htmlFor="group">Select the Group</Label>
        <select
          id="group"
          name="group"
          value={group}
          //   label="Group"
          onChange={handleSelectChange}
          //   error={Boolean(touched.group) && Boolean(errors.group)}
          //   helperText={touched.group && errors.group}
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
        <label htmlFor="priority">Select Priority</label>
        <select
          id="priority"
          name="priority"
          value={priority}
          aria-placeholder="select priority"
          // onChange={handlePriorityChange}
          {...register("priority", {
            required: "This field is required!",
            onChange: handlePriorityChange,
          })}
        >
          <option value="">Select...</option>
          {courseCount === 0 ? (
            <>
              <option value={"First"}>First</option>
              {/* <option value={"Second"}>Second</option>
              <option value={"Third"}>Third</option> */}
            </>
          ) : courseCount === 1 ? (
            <>
              <option value={"Second"}>Second</option>
              {/* <option value={"Third"}>Third</option> */}
            </>
          ) : courseCount === 2 ? (
            <>
              <option value={"Third"}>Third</option>
            </>
          ) : null}
        </select>
        {formErrors?.priority?.message && (
          <Error>{formErrors.priority.message}</Error>
        )}
      </FormRow>

      <FormRow>
        {group === "Humanities" && (
          <fieldset>
            <legend>Pick THREE elective subjects</legend>
            <div>
              <input
                type="checkbox"
                id="islStd"
                checked={islStd}
                onChange={handleChange1}
                name="islStd"
                value="islStd"
                disabled={error & !islStd}
              />
              <label htmlFor="islStd">Islamic Studies</label>
            </div>
            <div>
              <input
                disabled={error & !history}
                type="checkbox"
                id="history"
                checked={history}
                onChange={handleChange1}
                name="history"
                value="history"
              />
              <label htmlFor="history">Islamic History</label>
            </div>
            <div>
              <input
                disabled={error & !civics}
                type="checkbox"
                checked={civics}
                onChange={handleChange1}
                id="civics"
                name="civics"
                value="civics"
              />
              <label htmlFor="civics">Civics</label>
            </div>
            <div>
              <input
                disabled={error & !hAndP}
                type="checkbox"
                checked={hAndP}
                onChange={handleChange1}
                id="hAndP"
                name="hAndP"
                value="hAndP"
              />
              <label htmlFor="hAndP">Health and Physical Edu.</label>
            </div>
            <div>
              <input
                disabled={error & !geo}
                type="checkbox"
                id="geo"
                checked={geo}
                onChange={handleChange1}
                name="geo"
                value="geo"
              />
              <label htmlFor="geo">Geography</label>
            </div>
            <div>
              <input
                disabled={error & !eco}
                type="checkbox"
                id="eco"
                checked={eco}
                onChange={handleChange1}
                name="eco"
                value="eco"
              />
              <label htmlFor="eco">Economics</label>
            </div>
          </fieldset>
        )}

        {group === "Pre-Engineering" && (
          <fieldset>
            <legend>THREE elective subjects are:</legend>
            <div>
              <input
                type="checkbox"
                id="Chemistry"
                checked={true}
                name="Chemistry"
                value="Chemistry"
                disabled
              />
              <label htmlFor="Chemistry">Chemistry</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Maths"
                checked={true}
                name="Maths"
                value="Maths"
                disabled
              />
              <label htmlFor="Maths">Mathematics</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Physics"
                checked={true}
                name="Physics"
                value="Physics"
                disabled
              />
              <label htmlFor="Physics">Physics</label>
            </div>
          </fieldset>
        )}

        {group === "Pre-Medical" && (
          <fieldset>
            <legend>THREE elective subjects are:</legend>
            <div>
              <input
                type="checkbox"
                id="Chemistry"
                checked={true}
                name="Chemistry"
                value="Chemistry"
                disabled
              />
              <label htmlFor="Chemistry">Chemistry</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Biology"
                checked={true}
                name="Biology"
                value="Biology"
                disabled
              />
              <label htmlFor="Biology">Biology</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Physics"
                checked={true}
                name="Physics"
                value="Physics"
                disabled
              />
              <label htmlFor="Physics">Physics</label>
            </div>
          </fieldset>
        )}

        {group === "General Science" && (
          <fieldset>
            <legend>THREE elective subjects are:</legend>
            <div>
              <input
                type="checkbox"
                id="Economics"
                checked={true}
                name="Economics"
                value="Economics"
                disabled
              />
              <label htmlFor="Economics">Economics</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Maths"
                checked={true}
                name="Maths"
                value="Maths"
                disabled
              />
              <label htmlFor="Maths">Mathematics</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Statistics"
                checked={true}
                name="Statistics"
                value="Statistics"
                disabled
              />
              <label htmlFor="Statistics">Statistics</label>
            </div>
          </fieldset>
        )}

        {group === "ICS" && (
          <fieldset>
            <legend>Pick One elective subject</legend>
            <div>
              <input
                disabled={true}
                type="checkbox"
                checked={true}
                id="Computer Science"
                name="Computer Science"
                value="CompScience"
              />
              <label htmlFor="Computer Science">Computer Science</label>
            </div>
            <div>
              <input
                disabled={true}
                type="checkbox"
                checked={true}
                id="Maths"
                name="Maths"
                value="Maths"
              />
              <label htmlFor="Maths">Maths</label>
            </div>
            <div>
              <input
                disabled={errorCS & !physics}
                type="checkbox"
                checked={physics}
                onChange={handleChange2}
                id="physics"
                name="physics"
                value="Physics"
              />
              <label htmlFor="physics">Physics</label>
            </div>
            <div>
              <input
                disabled={errorCS & !stats}
                type="checkbox"
                id="stats"
                checked={stats}
                onChange={handleChange2}
                name="stats"
                value="Statistics"
              />
              <label htmlFor="stats">Statistics</label>
            </div>
            <div>
              <input
                disabled={errorCS & !eco_cs}
                type="checkbox"
                id="eco"
                checked={eco_cs}
                onChange={handleChange2}
                name="eco"
                value="eco"
              />
              <label htmlFor="eco">Economics</label>
            </div>
          </fieldset>
        )}

        {group === "I.Com" && (
          <fieldset>
            <legend>Elective subjects are:</legend>
            <div>
              <input
                type="checkbox"
                id="Economics"
                checked={true}
                name="Economics"
                value="Economics"
                disabled
              />
              <label htmlFor="Economics">Economics</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Buss_Maths"
                checked={true}
                name="Buss_Maths"
                value="Buss_Maths"
                disabled
              />
              <label htmlFor="Buss_Maths">Buss_Mathematics</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Accounting"
                checked={true}
                name="Accounting"
                value="Accounting"
                disabled
              />
              <label htmlFor="Accounting">Accounting</label>
            </div>
          </fieldset>
        )}
      </FormRow>
      {error && (
        <FormRow>
          <Button disabled={isCreating}>Apply</Button>
        </FormRow>
      )}
      {errorCS && (
        <FormRow>
          <Button disabled={isCreating}>Apply</Button>
        </FormRow>
      )}
      {(group === "Pre-Engineering" ||
        group === "Pre-Medical" ||
        group === "General Science" ||
        group === "I.Com") && (
        <FormRow>
          <Button disabled={isCreating}>Apply</Button>
        </FormRow>
      )}
    </Form>
  );
}
