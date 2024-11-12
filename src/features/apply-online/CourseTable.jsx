/* eslint-disable react/prop-types */
import { Table } from "../../ui/Table";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useCoursesApplied } from "./useCoursesApplied";
import CourseRow from "./CourseRow";
import Button from "../../ui/Button";
// import { useParams, useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import CourseDetails from "./CourseDetails";
import { useUser } from "../authentication/useUser";

function CourseTable() {
  const { user, isLoading: isLoadingUser } = useUser();
  const { id: uuid } = user;

  // const navigate = useNavigate();
  // const { studentId } = useParams();

  // const { studentId } = courses_applied[0] || 0;
  const { isLoading, courses_applied } = useCoursesApplied(uuid);
  const checkBtn = courses_applied.length < 3 || courses_applied.length == 0;

  if (isLoading || isLoadingUser) return <Spinner />;

  // if (!courses_applied.length || isLoading)
  //   return <Empty resourceName="Courses" />;
  return (
    <>
      {!courses_applied.length || isLoading ? (
        <Empty resourceName="Courses" />
      ) : (
        <Table columns="1fr 1fr 2fr 2fr">
          <Table.Header>
            <div>Priority</div>
            <div>Group</div>
            <div>Subject Combination</div>
            <div>Status</div>
          </Table.Header>

          <Table.Body
            data={courses_applied}
            render={(course) => <CourseRow key={course.id} course={course} />}
          />
        </Table>
      )}
      {checkBtn && (
        // <Button onClick={() => navigate(`/applyonline/${studentId}`)}>
        //   Apply for another program
        // </Button>
        <Modal>
          <Modal.Open opens="course-details">
            <Button>Apply for another program</Button>
          </Modal.Open>
          <Modal.Window name="course-details">
            <CourseDetails />
          </Modal.Window>
        </Modal>
      )}
    </>
  );
}

export default CourseTable;
