/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Heading from "../../ui/Heading";
// import { Table } from "../../ui/Table";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useGetRegisteredCourses } from "./useGetRegisteredCourses";
import Spinner from "../../ui/Spinner";
import { useGetSections } from "./useGetSections";

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

// const TableHeader = styled.th`
//   /* padding: 1.6rem 2.4rem; */
//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   /* font-weight: 600; */
//   color: var(--color-grey-600);

//   @media only screen and (max-width: 576px) {
//     padding: 1rem 1rem;
//     letter-spacing: 0px;
//     font-weight: 500;
//   }
// `;

// const TableRow = styled.tr`
//   border: 1px solid var(--color-grey-300);
//   background-color: var(--color-grey-0);
// `;

// const TableFooter = styled.footer`
//   background-color: var(--color-grey-50);
//   display: flex;
//   justify-content: center;
//   padding: 1.2rem;

//   &:not(:has(*)) {
//     display: none;
//   }
// `;

// const Cell = styled.div`
//   font-size: 1.4rem;
//   font-weight: 500;
//   color: var(--color-grey-600);
//   font-family: "Sono";

//   @media only screen and (max-width: 576px) {
//     font-size: 1rem;
//     font-weight: 400;
//   }
// `;

export default function StudentDetails({ data, onCloseModal }) {
  const {
    // id,
    avatar,
    roll_no,
    group,
    section_id,
    session,
    cnic,
    cnic_father,
    contact,
    contact_wtp,
    dob,
    father_name,
    fullName,
    class_year,
    // last_institute,
    // marks_obtained,
    // occupation,
    // passing_year,
    present_address,
    // quota,
    // total_marks,
    // courses_applied,
    // isRegistered,
  } = data;

  const { isLoading, data: courses } = useGetRegisteredCourses(roll_no);
  const { isLoading: isLoadingSec, data: sections } = useGetSections();

  const generatePdf = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: `Details of-${fullName}-(${roll_no})`,
    // onAfterPrint: () => alert("Data saved successfully!"),
  });
  const componentPdf = useRef();
  if (isLoading || isLoadingSec) return <Spinner />;
  // It grabs the section name from all sections
  const section =
    sections.filter((val) => val.id === section_id).at(0).section_name ||
    section_id;
  return (
    <div>
      <div
        ref={componentPdf}
        style={{ width: "100%", textAlign: "center", margin: "2rem" }}
      >
        <Heading type="h2">Islamabad Model College for Boys Sihala</Heading>
        <Heading type="h3">Student Details</Heading>
        <Heading as="h3">Session: {session}</Heading>
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
              <th>Roll No.</th>
              <td>{roll_no || "Not assigned yet!"}</td>
            </tr>
            <tr>
              <th>DoB</th>
              <td>{dob}</td>
            </tr>
            <tr>
              <th>CNIC</th>
              <th>Group</th>
              <th>Section</th>
              <th>Class</th>
            </tr>
            <tr>
              <td>{cnic}</td>
              <td>{group || "Not assigned yet!"}</td>
              <td>{section}</td>
              <td>{class_year}</td>
            </tr>

            <tr>
              <th>Father/Gaurdian Name</th>
              <th>CNIC</th>
              <th>Contact No.</th>
              <th>WhatsApp No.</th>
            </tr>
            <tr>
              <td>{father_name}</td>
              <td>{cnic_father}</td>
              <td>{contact}</td>
              <td>{contact_wtp}</td>
            </tr>
            <tr>
              <th colSpan="3">Present Address</th>
            </tr>
            <tr>
              <td colSpan="3">{present_address}</td>
            </tr>

            <tr colSpan="4">
              <th>Registered Courses</th>
            </tr>
            <tr colSpan="4">
              <td colSpan="4">
                {courses.length ? (
                  courses.map((val, i) => (
                    <span key={i}>
                      {val.courses.course_name}
                      {",  "}
                    </span>
                  ))
                ) : (
                  <tr>
                    <td>No Courses registered yet!</td>
                  </tr>
                )}
              </td>
            </tr>
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
