import { useNavigate } from "react-router-dom";
import StdTableOperations from "../features/apply-online/StdTableOperations";
import StudentsTable from "../features/apply-online/StudentsTable";
import { useUser } from "../features/authentication/useUser";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";

function StudentsApplied() {
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
        <Heading as="h3">Students Applied</Heading>
        <StdTableOperations />
      </Row>
      <StudentsTable />
    </>
  );
}

export default StudentsApplied;
