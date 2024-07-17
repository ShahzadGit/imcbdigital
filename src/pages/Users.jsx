// import CompuondCounter from "../features/counter/CompuondCounter";
import styled from "styled-components";
import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
// import Row from "../ui/Row";

const Container = styled.div`
  /* margin: 0 auto; */
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

function NewUsers() {
  return (
    <>
      <Container>
        <Logo />
        <Heading type="h2">Welcome to APPLY-ONLINE portal.</Heading>
        <Heading type="h3">Create a new student account</Heading>
        {/* <CompuondCounter /> */}
      </Container>
      <SignupForm />
    </>
  );
}

export default NewUsers;
