/* eslint-disable react/prop-types */
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useForm } from "react-hook-form";
import { useGetCourses } from "./useGetCourses";
import { useGetRegisteredCourses } from "./useGetRegisteredCourses";
import { useGetCoursesIComXii } from "./useGetCoursesIComXii";
import { useCreateRegisteredCoursesXII } from "./useCreateRegisteredCoursesXII";

function PromoteToXII({ roll_no, part, onCloseModal, group }) {
  part = part === "I" && "II"; // Change part from I to II
  const { isLoading: isLoadingCourses, data: courses } = useGetCourses(part);
  const { isLoading: isLoadingCoursesInXI, data: coursesInXi } =
    useGetRegisteredCourses(roll_no);
  const { isLoading: isLoadingIComXii, data: coursesIComXii } =
    useGetCoursesIComXii();

  const { isCreating, createRegisteredCoursesXII } =
    useCreateRegisteredCoursesXII();
  const { handleSubmit } = useForm({});
  // const { errors: formErrors } = formState;

  function onSubmit() {
    const filteredCourses = courses.filter(
      (v) => v.group === group || v.group.includes(group)
    );
    const compulsoryCourses = courses.filter((val) => val.isCompulsory);
    let myCourses;
    if (group === "I.Com") {
      myCourses = coursesIComXii.map((val) => val);
    } else {
      const courseNamesInXi = coursesInXi
        .map((val) => val.courses.course_name)
        .filter(
          (v) => v !== "English-I" && v !== "Urdu-I" && v !== "Islamiat (Comp)"
        );

      myCourses = courseNamesInXi
        .map((v) =>
          filteredCourses.filter((val) => val.course_name.includes(v))
        )
        .flat();
    }

    const ids = compulsoryCourses.map((val) => val.id);

    const newCourses = [];

    myCourses.map((val) => newCourses.push({ roll_no, course_id: val.id }));
    ids.map((val) => newCourses.push({ roll_no, course_id: val }));

    createRegisteredCoursesXII(
      { newCourses, class_year: "HSSC-II", roll_no },
      {
        onSuccess: () => {
          onCloseModal();
        },
      }
    );
  }

  if (isLoadingCourses || isLoadingCoursesInXI || isLoadingIComXii)
    return <Spinner />;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading type="h3">Promoting to HSSC-II</Heading>
      <FormRow>
        <Button variation="secondary" onClick={() => onCloseModal()}>
          Cancel
        </Button>

        <Button disabled={isCreating}>Register</Button>
      </FormRow>
    </Form>
  );
}
export default PromoteToXII;
