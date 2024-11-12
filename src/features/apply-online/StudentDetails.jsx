/* eslint-disable react/prop-types */

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Heading from "../../ui/Heading";
// import { Table } from "../../ui/Table";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useCreateRegStudent } from "./useCreateRegStudent";

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
  const { isCreating, createRegStudent } = useCreateRegStudent();
  const {
    id,
    avatar,
    board_rollNo,
    cnic,
    cnic_father,
    contact,
    contact_wtp,
    dob,
    father_name,
    fullName,
    last_institute,
    marks_obtained,
    occupation,
    passing_year,
    present_address,
    quota,
    total_marks,
    courses_applied,
    isRegistered,
  } = data;
  //   console.log("Data--->", data);

  const generatePdf = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: `Admission-Form-${fullName}`,
    // onAfterPrint: () => alert("Data saved successfully!"),
  });
  function handleClick() {
    const newStudent = {
      id,
      avatar,
      cnic,
      contact,
      contact_wtp,
      dob,
      father_name,
      cnic_father,
      fullName,
      present_address,
    };

    createRegStudent(
      { ...newStudent },
      {
        onSuccess: () => {
          // console.log("Data after submission...", data);
          onCloseModal?.(); //This prop is comming from Modal Component
        },
      }
    );
  }

  const componentPdf = useRef();
  return (
    <div>
      <div
        ref={componentPdf}
        style={{ width: "100%", textAlign: "center", margin: "2rem" }}
      >
        <Heading type="h2">Islamabad Model College for Boys Sihala</Heading>
        <Heading as="h3">Online Admission Form</Heading>
        {/* <Heading type="h3">Candidate Information</Heading> */}
        <StyledTable>
          <tr>
            <th>Candidate Name</th>
            <td>{fullName}</td>
            <td rowSpan="2" colSpan="2">
              <Img src={avatar} />
            </td>
          </tr>
          <tr>
            <th>CNIC</th>
            <td>{cnic}</td>
          </tr>
          <tr>
            <th>DoB</th>
            <td>{dob}</td>
          </tr>
          <tr>
            <th>Total Marks</th>
            <th>Marks Obtained</th>
            <th>Board RollNo</th>
            <th>Passing Year</th>
          </tr>
          <tr>
            <td>{total_marks}</td>
            <td>{marks_obtained}</td>
            <td>{board_rollNo}</td>
            <td>{passing_year}</td>
          </tr>
          <tr>
            <th colSpan="4">Last Institure Attended</th>
          </tr>
          <tr>
            <td colSpan="4">{last_institute}</td>
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
            <th>Occupation</th>
            <th>Quota</th>
            <th colSpan="2">Present Address</th>
          </tr>
          <tr>
            <td>{occupation}</td>
            <td>{quota}</td>
            <td colSpan="2">{present_address}</td>
          </tr>
          <tr colSpan="4">
            <th>Applied for Groups and Courses</th>
          </tr>
          <tr>
            <th>Priority</th>
            <th>Group</th>
            <th colSpan="2">Subject Combination</th>
          </tr>
          {courses_applied.map((val, i) => (
            <tr key={i}>
              <td>{val.priority}</td>
              <td>{val.group}</td>
              <td colSpan="2">{val.courses}</td>
            </tr>
          ))}
        </StyledTable>
      </div>
      <Button onClick={generatePdf} disabled={isCreating}>
        Download PDF
      </Button>
      {isRegistered ? (
        <Button variation="green" disabled>
          Admission already Confirmed!
        </Button>
      ) : (
        <Button variation="green" onClick={handleClick} disabled={isCreating}>
          Confirm Admission
        </Button>
      )}
    </div>
  );
}
