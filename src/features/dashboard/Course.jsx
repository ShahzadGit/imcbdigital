/* eslint-disable react/prop-types */
import styled from "styled-components";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1rem;
  display: grid;
  /* grid-template-columns: 6.4rem 1fr 1fr; */
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;
`;

const Title = styled.h2`
  align-self: end;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  font-size: 1%.5;
  line-height: 1;
  font-weight: 300;
`;
// function Course({ icon, course_name, section_name, id, color }) {
function Course({
  course_name,
  section_name,
  course_id,
  section_id,
  session,
  part,
}) {
  const navigate = useNavigate();
  return (
    <StyledStat>
      <div>
        <Title>Course Name: {course_name}</Title>
        <Value>Section: {section_name}</Value>
      </div>
      <div>
        <Button
          size="small"
          onClick={() =>
            navigate(
              `/markattendance/${course_id}/${section_id}/${session}/${part}`
            )
          }
        >
          Mark Attendance
        </Button>
        <Button size="small">Mark Test Scores</Button>
        <Button
          size="small"
          onClick={() =>
            navigate(
              `/viewattendance/${course_id}/${section_id}/${session}/${part}`
            )
          }
        >
          View Attendance
        </Button>
      </div>
    </StyledStat>
  );
}

export default Course;
