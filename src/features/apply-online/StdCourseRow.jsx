/* eslint-disable react/prop-types */
import styled from "styled-components";
// import { format, isToday } from "date-fns";

// import Tag from "../../ui/Tag";
import { Table } from "../../ui/Table";

// import { formatCurrency } from "../../utils/helpers";
// import { formatDistanceFromNow } from "../../utils/helpers";
// import { useNavigate } from "react-router-dom";
import Menus from "../../ui/Menus";
import {
  //   HiArrowDownOnSquare,
  //   HiArrowUpOnSquare,
  HiEye,
  //   HiTrash,
} from "react-icons/hi2";
// import { useCheckout } from "../check-in-out/useChechout";
import Modal from "../../ui/Modal";
import StudentDetails from "./StudentDetails";
// import { useDeleteBooking } from "./useDeleteBooking";
// import ConfirmDelete from "../../ui/ConfirmDelete";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3/2.5;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5);

  @media only screen and (max-width: 576px) {
    transform: scale(3);
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

function StdCourseRow({ data }) {
  const {
    id,
    avatar,
    // board_rollNo,
    // cnic,
    // cnic_father,
    // contact,
    // contact_wtp,
    // dob,
    // father_name,
    fullName,
    // last_institute,
    marks_obtained,
    // occupation,
    // passing_year,
    // present_address,
    // quota,
    // total_marks,
    courses_applied, //: { priority },
  } = data;

  //   const navigate = useNavigate();

  const subjectCombIn1stPriority = courses_applied.filter(
    (c) => c.priority === "First"
  );
  const group = !subjectCombIn1stPriority.length
    ? "-"
    : subjectCombIn1stPriority.at(0)?.group;
  const courses = !subjectCombIn1stPriority.length
    ? "-"
    : subjectCombIn1stPriority.at(0)?.courses;

  return (
    <Table.Row role="row">
      <Img src={avatar} />
      <Cell>{fullName}</Cell>
      <Cell>{marks_obtained}</Cell>
      <Cell>{group}</Cell>
      <Cell>{courses}</Cell>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            {/* <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/studentsapplied/${id}`)}
            >
              See details
            </Menus.Button> */}

            <Modal.Open opens="details">
              <Menus.Button icon={<HiEye />}>See Details</Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name="details">
            <StudentDetails data={data} />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default StdCourseRow;
