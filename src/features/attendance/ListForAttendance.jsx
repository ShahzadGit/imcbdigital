/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { Table } from "../../ui/Table";
import AttendanceRow from "./AttendanceRow";
import { useGetStudents } from "./useGetStudents";
import Heading from "../../ui/Heading";
import { useCreateAttendance } from "./useCreateAttendance";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";

export default function ListForAttendance({
  courseId,
  sectionId,
  session,
  part,
  faculty_id,
}) {
  const { isLoading, data } = useGetStudents(sectionId, session, part);
  const { isCreating, createAttendance } = useCreateAttendance();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const currentDate = new Date();
  // Format date as DD-MM-YYYY
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = currentDate.getFullYear();
  const date = `${day}-${month}-${year}`;
  // Full month name
  const fullMonth = currentDate.toLocaleString("default", { month: "long" });

  // Format time as HH:MM AM/PM
  let hours = currentDate.getHours();
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12; // Convert to 12-hour format
  hours = hours ? String(hours).padStart(2, "0") : "12"; // The hour '0' should be '12'
  const marked_on = `${hours}:${minutes} ${ampm}`;
  function handleClick() {
    if (attendance.length > 0) {
      // Below code will add other properties to each object. roll_no and status is added at render of each AttendanceRow
      const updatedAttendance = attendance.map((item) => ({
        ...item,
        faculty_id,
        date: date,
        month: fullMonth,
        marked_on,
        course_id: Number(courseId),
        section_id: Number(sectionId),
        part,
      }));

      console.log(
        "🚀 ~ updatedAttendance ~ updatedAttendance:",
        updatedAttendance
      );

      createAttendance(
        { attendance: updatedAttendance }, //It should have the same property name as is in the query api, i.e apiAttendance
        {
          onSuccess: () => {
            // reset();
            navigate(`/dashboard`);
          },
        }
      );
    }
    // console.log("Attendace: ", attendance);
  }
  if (isLoading) return <Spinner />;
  console.log("🚀 ~ courseId:", courseId);
  //   console.log("🚀 ~ data:", data);
  return (
    <>
      <Heading type="h3">
        Month: {fullMonth} <br /> Date: {date}
      </Heading>
      <Table columns="1fr 1fr 2fr 0.5fr">
        <Table.Header>
          <div></div>
          <div>Roll No.</div>
          <div>Name</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={data}
          render={(val) => (
            <AttendanceRow
              key={val.id}
              data={val}
              attendance={attendance}
              setAttendance={setAttendance}
            />
          )}
        />
      </Table>
      <Button onClick={handleClick} disabled={isCreating}>
        {isCreating ? <SpinnerMini /> : "Save Attendance"}
      </Button>
    </>
  );
}
