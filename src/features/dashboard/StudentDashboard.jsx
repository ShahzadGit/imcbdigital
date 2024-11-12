import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import CourseTable from "../apply-online/CourseTable";

export default function StudentDashboard() {
  return (
    <>
      <Row>
        <Heading type="h3">
          You have applied for following groups and courses
        </Heading>
      </Row>
      <CourseTable />
    </>
  );
}
