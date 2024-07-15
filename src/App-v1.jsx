// import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

function App() {
  // const H1 = styled.h1`
  //   font-size: 32px;
  //   font-weight: bold;
  // `;
  return (
    <>
      <GlobalStyles />
      <Row type="vertical">
        <Row type="horizontal">
          <Heading as="h1">HelloWorld!</Heading>
          <Heading as="h2">HelloWorld!</Heading>
          <Heading as="h3">HelloWorld!</Heading>
        </Row>

        <Row type="vertical">
          <Heading as="h1">HelloWorld!</Heading>
          <Heading as="h2">HelloWorld!</Heading>
          <Heading as="h3">HelloWorld!</Heading>
        </Row>

        <Row>
          <Row type="horizontal">
            <Heading as="h1">Buttons</Heading>
            <Button variation="primary" size="large">
              Check In
            </Button>
            <Button variation="secondary" size="medium">
              Check Out
            </Button>
            <Button variation="danger" size="small">
              Danger
            </Button>
          </Row>
        </Row>
      </Row>
    </>
  );
}

export default App;
