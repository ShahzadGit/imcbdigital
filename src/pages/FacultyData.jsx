import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
// import AddStudent from "../features/students/AddStudent";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useEffect } from "react";
import Spinner from "../ui/Spinner";
import FacultyTableOperations from "../features/faculty/FacultyTableOperations";
import FacultyTable from "../features/faculty/FacultyTable";

function FacultyData() {
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
        <Heading as="h3">List of Faculty Members</Heading>
        <FacultyTableOperations />
      </Row>
      <FacultyTable />
      {/* <AddStudent /> */}
    </>
  );
}

export default FacultyData;
