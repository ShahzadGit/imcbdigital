import { useNavigate } from "react-router-dom";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import { useUser } from "../features/authentication/useUser";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useEffect } from "react";
import Spinner from "../ui/Spinner";

function Account() {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const { role } = user.user_metadata;

  useEffect(
    function () {
      if (role !== "faculty") navigate("/pagenotfound");
    },
    [role, isLoading, navigate]
  );

  if (isLoading) return <Spinner />;
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update User Name</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
