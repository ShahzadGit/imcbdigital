/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Table } from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import { HiBookmark, HiEye, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import { useDeleteStudent } from "./useDeleteStudent";
import { useUser } from "../authentication/useUser";
import AssignCourses from "./AssignCourses";
import CoursesAndSections from "./CoursesAndSections";

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

function FacultyRow({ data }) {
  const { id, avatar, designation, contact, fullName, teaches } = data;
  //   const navigate = useNavigate();
  const { isDeleting, deleteStudent } = useDeleteStudent();

  const { user } = useUser();
  const { role } = user.user_metadata;

  return (
    <Table.Row role="row">
      <Img src={avatar || "default-user.jpg"} alt={`Avatar of ${fullName}`} />
      <Cell>{fullName}</Cell>
      <Cell>{designation}</Cell>
      <Cell>{contact}</Cell>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="details">
              <Menus.Button icon={<HiEye />}>See Details</Menus.Button>
            </Modal.Open>
            {role === "admin" && (
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            )}
            {role === "admin" && (
              <Modal.Open opens="assign">
                <Menus.Button icon={<HiBookmark />}>
                  Assign Courses
                </Menus.Button>
              </Modal.Open>
            )}
          </Menus.List>
          <Modal.Window name="details">
            <CoursesAndSections data={data} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="student"
              disabled={isDeleting}
              onConfirm={() => deleteStudent(id)}
            />
          </Modal.Window>
          <Modal.Window name="assign">
            <AssignCourses teaches={teaches} faculty_id={id} />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default FacultyRow;
