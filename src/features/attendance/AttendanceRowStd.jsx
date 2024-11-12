/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Table } from "../../ui/Table";

const Cell = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
  font-family: "Sono";
  @media only screen and (max-width: 576px) {
    font-size: 1rem;
    font-weight: 400;
  }
`;

function AttendanceRowStd({ data }) {
  const { date, month, status: attendance } = data;

  return (
    <Table.Row role="row">
      <Cell>{date}</Cell>

      <Cell>{month}</Cell>

      <Cell style={{ textTransform: "capitalize" }}>{attendance}</Cell>
    </Table.Row>
  );
}

export default AttendanceRowStd;
