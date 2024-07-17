import CourseTable from "../features/dashboard/CourseTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Dashboard</Heading>
      </Row>
      <Row>
        <Heading type="h3">
          You have applied for following groups and courses
        </Heading>
      </Row>
      <CourseTable />
    </>
  );
}

export default Dashboard;
