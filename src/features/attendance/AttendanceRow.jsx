/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Table } from "../../ui/Table";
import Input from "../../ui/Input";
import { useState, useEffect } from "react";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3/2.5;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5);

  @media only screen and (max-width: 576px) {
    /* transform: scale(3); */
    width: 3rem;
    aspect-ratio: 2/2;
  }
`;

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

const Label = styled.label`
  font-weight: 600;
  padding: 0.3rem;
  text-transform: capitalize;
`;

function AttendanceRow({ data, setAttendance }) {
  const { avatar, roll_no, fullName } = data;
  const [status, setStatus] = useState("present"); //It will have only two states: present/absent
  //   const navigate = useNavigate();
  // Effect will run on mount and assign student's data in the attendance object of parent component through setAttendance
  useEffect(() => {
    setAttendance((prevAttendance) => [...prevAttendance, { roll_no, status }]);
    console.log("Status in Effect:", status);
  }, []);

  function handleChange(event) {
    // Both If and Else will update the status property of current student record
    if (event.target.checked) {
      setAttendance((prevAttendance) =>
        prevAttendance.map((item) =>
          item.roll_no === roll_no ? { ...item, status: "present" } : item
        )
      );
      setStatus("present");
    } else {
      setAttendance((prevAttendance) =>
        prevAttendance.map((item) =>
          item.roll_no === roll_no ? { ...item, status: "absent" } : item
        )
      );
      setStatus("absent");
    }
    // The below code was not receiving the status value. Therefore in the above if-else statement hardcoded values of present/absent are being assigned
    // setAttendance((prevAttendance) =>
    //   prevAttendance.map((item) =>
    //     item.roll_no === roll_no ? { ...item, status } : item
    //   )
    // );
    // console.log("Status in handleChange:", status);
  }

  return (
    <Table.Row role="row">
      <Cell>
        <Input
          type="checkbox"
          id={roll_no}
          checked={status === "present" ? true : false}
          onChange={handleChange}
          name={status}
          value={status}
        />
        <Label htmlFor={roll_no}>{status}</Label>
      </Cell>

      <Cell>{roll_no}</Cell>

      <Cell>{fullName}</Cell>
      <Img src={avatar || "default-user.jpg"} alt={`Avatar of ${fullName}`} />
    </Table.Row>
  );
}

export default AttendanceRow;
