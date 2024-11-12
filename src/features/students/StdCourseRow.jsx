/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Table } from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import {
  HiBookmark,
  HiEye,
  HiPencil,
  HiTrash,
  HiArrowUpOnSquare,
} from "react-icons/hi2";
import Modal from "../../ui/Modal";
import CreateStudentForm from "./CreateStudentForm";
import { useDeleteStudent } from "./useDeleteStudent";
import { useUser } from "../authentication/useUser";
import RegisterCourses from "./RegisterCourses";
import StudentDetails from "./StudentDetails";
import PromoteToXII from "./PromoteToXII";

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
    // marks_obtained,
    // occupation,
    // passing_year,
    // present_address,
    // quota,
    // total_marks,
    group,
    roll_no,
    class_year,
  } = data;
  //   const navigate = useNavigate();
  const { isDeleting, deleteStudent } = useDeleteStudent();

  const { user } = useUser();
  const { role } = user.user_metadata;

  let part = class_year.split("-").at(1);
  return (
    <Table.Row role="row">
      <Img src={avatar} />
      <Cell>{roll_no || "Please assign value"}</Cell>
      <Cell>{fullName}</Cell>
      <Cell>{class_year || "Please assign value"}</Cell>
      <Cell>{group || "Please assign value"}</Cell>

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
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="details">
              <Menus.Button icon={<HiEye />}>See Details</Menus.Button>
            </Modal.Open>
            {role === "admin" && (
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            )}
            <Modal.Open opens="register">
              <Menus.Button icon={<HiBookmark />}>
                {!group ? "Register " : "Change "}Courses
              </Menus.Button>
            </Modal.Open>
            {part === "I" && (
              <Modal.Open opens="promote">
                <Menus.Button icon={<HiArrowUpOnSquare />}>
                  Promote to XII
                </Menus.Button>
              </Modal.Open>
            )}
          </Menus.List>
          <Modal.Window name="edit">
            <CreateStudentForm studentToEdit={data} />
          </Modal.Window>
          <Modal.Window name="details">
            {!roll_no ? (
              <p>Please assign Roll No.</p>
            ) : (
              <StudentDetails data={data} />
            )}
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="student"
              disabled={isDeleting}
              onConfirm={() => deleteStudent(id)}
            />
          </Modal.Window>
          <Modal.Window name="register">
            {!roll_no ? (
              <p>Please assign Roll No.</p>
            ) : (
              <RegisterCourses roll_no={roll_no} part={part} group={group} />
            )}
          </Modal.Window>
          <Modal.Window name="promote">
            {!roll_no ? (
              <p>Please assign Roll No.</p>
            ) : (
              <PromoteToXII roll_no={roll_no} part={part} group={group} />
            )}
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default StdCourseRow;
