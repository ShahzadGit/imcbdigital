/* eslint-disable react/prop-types */
// import BookingRow from "./BookingRow";
import { Table } from "../../ui/Table";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useCoursesApplied } from "./useCoursesApplied";
import CourseRow from "./CourseRow";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

function CourseTable() {
  const { isLoading, courses_applied } = useCoursesApplied();
  const navigate = useNavigate();
  const { studentId } = courses_applied[0] || 0;

  if (isLoading) return <Spinner />;
  if (!courses_applied.length) return <Empty resourceName="Courses" />;
  return (
    <>
      <Table columns="1fr 2fr 2fr 1fr">
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
      {courses_applied.length < 3 && (
        <Button onClick={() => navigate(`/applyonline/${studentId}`)}>
          Apply for another program
        </Button>
      )}
    </>
  );
}

export default CourseTable;
