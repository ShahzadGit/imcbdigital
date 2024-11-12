import CourseDetails from "./CourseDetails";
import Modal from "../../ui/Modal";

export default function Courses() {
  return (
    <Modal>
      <Modal.Open opens="course-details"></Modal.Open>
      <Modal.Window opens="course-details">
        <CourseDetails />
      </Modal.Window>
    </Modal>
  );
}
