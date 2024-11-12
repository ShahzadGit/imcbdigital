/* eslint-disable react/prop-types */
// import styled from "styled-components";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import { Table } from "../../ui/Table";
import AttendanceRowStd from "./AttendanceRowStd";
import { useGetAttendanceStd } from "./useGetAttendanceStd";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const StyledTable = styled.table`
  width: 100%;
  border: 1px solid var(--color-grey-300);
  border-collapse: collapse;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  text-align: left;
  /* margin: 1rem; */

  @media only screen and (max-width: 576px) {
    font-size: 1rem;
    overflow: visible;
    margin: 1rem;
  }
`;

const Img = styled.img`
  /* display: block; */
  width: 7rem;
  aspect-ratio: 3/4;
  object-fit: cover;
  /* object-position: center; */
  transform: scale(1.5);
  padding: 1rem;
  float: right;
  margin-right: 4rem;
  /* text-align: right; */
  @media only screen and (max-width: 576px) {
    transform: scale(1);
  }
`;
export default function ViewAttendanceStd({
  course_id,
  section_id,
  part,
  faculty_id,
  roll_no,
}) {
  const { data, isLoading } = useGetAttendanceStd(
    section_id,
    course_id,
    part,
    faculty_id,
    roll_no
  );
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  console.log("Data: ", data);
  const fullName = data[0]?.students.fullName || "";
  const avatar = data[0]?.students.avatar || "";
  const courseName = data[0]?.courses.course_name || "";
  return (
    <>
      <Heading type="h3">Attendance Report of {fullName}</Heading>
      <StyledTable>
        <tr>
          <th>Roll No</th>
          <td>{roll_no}</td>
          <th>Course Name</th>
          <td>{courseName}</td>
          <td rowSpan="2" colSpan="2">
            <Img
              src={avatar || "default-user.jpg"}
              alt={`Avatar of ${fullName}`}
            />
          </td>
        </tr>
      </StyledTable>

      {/* <div>
        <span>RollNo: {roll_no}</span>
        <span>Course Name: {courseName}</span>
        <Img src={avatar || "default-user.jpg"} alt={`Avatar of ${fullName}`} />
      </div> */}
      <Table columns="1fr 1fr 1fr">
        <Table.Header>
          <div>Date</div>
          <div>Month</div>
          <div>Attendance</div>
        </Table.Header>

        <Table.Body
          data={data}
          render={(val) => <AttendanceRowStd key={val.id} data={val} />}
        />
      </Table>
      <Button variation="secondary" onClick={() => navigate(-1)}>
        Back
      </Button>
    </>
  );
}
