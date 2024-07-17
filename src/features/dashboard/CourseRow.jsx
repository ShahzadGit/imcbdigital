/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Table } from "../../ui/Table";

const MyDiv = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";

  @media only screen and (max-width: 576px) {
    font-size: 1rem;
    font-weight: 500;
  }
`;
/*
const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;
*/
function CourseRow({
  course: { priority, group, courses, status = "Application Received" },
}) {
  return (
    <Table.Row role="row">
      <MyDiv>{priority}</MyDiv>
      <MyDiv>{group}</MyDiv>
      <MyDiv>{courses}</MyDiv>
      <MyDiv>{status}</MyDiv>
    </Table.Row>
  );
}

export default CourseRow;
