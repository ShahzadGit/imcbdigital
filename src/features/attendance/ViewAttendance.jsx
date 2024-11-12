/* eslint-disable react/prop-types */
import styled from "styled-components";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import { formatAttendanceData } from "../../utils/helpers";
import { useGetAttendance } from "./useGetAttendance";
import { Link } from "react-router-dom";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  padding: 1rem;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;

  @media only screen and (max-width: 576px) {
    font-size: 1rem;
    overflow: visible;
  }
`;

const Thead = styled.thead`
  background-color: var(--color-grey-50);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);

  @media only screen and (max-width: 576px) {
    letter-spacing: 0px;
    font-weight: 500;
  }
`;

const TableRow = styled.tr`
  border: 1px solid var(--color-grey-200);
`;

const RowHead = styled.th`
  padding-left: 0.5rem;
`;

const TableCell = styled.td`
  padding-left: 0.5rem;
`;

export default function ViewAttendance({
  course_id,
  section_id,
  part,
  faculty_id,
}) {
  const { data, isLoading } = useGetAttendance(
    section_id,
    course_id,
    part,
    faculty_id
  );
  //   const [attendanceData, setAttendanceData] = useState([]);

  if (isLoading) return <Spinner />;
  //   console.log("Data: ", data);
  const formattedData = formatAttendanceData(data);
  //   console.log("🚀 ~ formattedData:", formattedData);
  return (
    <>
      <Heading type="h3">Attendance Report</Heading>
      <Table role="table">
        <Thead>
          <TableRow>
            <RowHead>Roll No</RowHead>
            {formattedData.length > 0 &&
              Object.keys(formattedData[0].statuses).map((date) => (
                <RowHead key={date}>{date.slice(0, 5)}</RowHead> //This will set dates as column headings.
              ))}
          </TableRow>
        </Thead>
        <tbody>
          {formattedData.map((record) => (
            <TableRow key={record.roll_no}>
              <TableCell style={{ fontWeight: "bold" }}>
                {/* stdattendance/:courseId/:sectionId/:session/:part/:roll_no */}
                <Link
                  to={`/stdattendance/${course_id}/${section_id}/2024-25/${part}/${record.roll_no}`}
                >
                  {record.roll_no}
                </Link>
              </TableCell>
              {Object.keys(record.statuses).map((date) => (
                <TableCell key={date} style={{ textTransform: "capitalize" }}>
                  {record.statuses[date].slice(0, 1)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
        <p style={{ fontSize: "small" }}>
          *Click on RollNo. for detailed view...
        </p>
      </Table>
    </>
  );
}
