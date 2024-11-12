import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import AddStudent from "../features/students/AddStudent";
import StdTableOperations from "../features/students/StdTableOperations";
import StudentsTable from "../features/students/StudentsTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useEffect } from "react";
import Spinner from "../ui/Spinner";

function StudentsEnrolled() {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const { role } = user.user_metadata;

  useEffect(
    function () {
      if (role !== "admin") navigate("/pagenotfound");
    },
    [role, isLoading, navigate]
  );

  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h3">Students Enrolled</Heading>
        <StdTableOperations />
      </Row>
      <StudentsTable />
      <AddStudent />
    </>
  );
}

export default StudentsEnrolled;
