/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Heading from "../../ui/Heading";
// import { Table } from "../../ui/Table";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useGetAssignedCourses } from "./useGetAssignedCourses";
import Spinner from "../../ui/Spinner";
// import { useGetSections } from "./useGetSections";

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
  width: 8rem;
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

export default function CoursesAndSections({ data, onCloseModal }) {
  const {
    id: faculty_id,
    avatar,
    designation,
    contact,
    fullName,
    cnic,
    teaches,
  } = data;

  const { isLoading, data: coursesAndSections } =
    useGetAssignedCourses(faculty_id);

  const generatePdf = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: `Details of-${fullName}`,
    // onAfterPrint: () => alert("Data saved successfully!"),
  });
  const componentPdf = useRef();
  if (isLoading) return <Spinner />;
  console.log("StudentDetails ~ coursesAndSections:", coursesAndSections);

  return (
    <div>
      <div
        ref={componentPdf}
        style={{ width: "100%", textAlign: "center", margin: "2rem" }}
      >
        <Heading type="h2">Islamabad Model College for Boys Sihala</Heading>
        <Heading type="h3">Faculty Details</Heading>
        <StyledTable>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{fullName}</td>
              <td rowSpan="2" colSpan="2">
                <Img src={avatar || "default-user.jpg"} />
              </td>
            </tr>
            <tr>
              <th>Designation</th>
              <td>{designation || "Not assigned yet!"}</td>
            </tr>
            <tr>
              <th>CNIC</th>
              <td>{cnic}</td>
            </tr>
            <tr>
              <th>Contact No</th>
              <td>{contact}</td>
            </tr>

            <tr>
              <th colSpan="3">Courses</th>
            </tr>
            <tr>
              <td colSpan="3">{teaches}</td>
            </tr>

            <tr colSpan="4">
              <th>Assigned Courses</th>
            </tr>
            <tr colSpan="4">
              <th colSpan="2">Course</th>
              <th>Section</th>
              <th>Session</th>
            </tr>
            {coursesAndSections.length ? (
              coursesAndSections.map((val, i) => (
                <tr key={i}>
                  <td colSpan="2">{val.courses.course_name}</td>
                  <td>{val.sections.section_name}</td>
                  <td>{val.session}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Courses assigned yet!</td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </div>
      <Button variation="secondary" onClick={() => onCloseModal()}>
        Cancel
      </Button>
      <Button onClick={generatePdf}>Download PDF</Button>
    </div>
  );
}
