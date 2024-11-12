// import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateStudentForm from "./CreateStudentForm";

export default function AddStudent() {
  return (
    <Modal>
      <Modal.Open opens="add-form">
        <Button>Add a New Student</Button>
      </Modal.Open>
      <Modal.Window name="add-form">
        <CreateStudentForm />
      </Modal.Window>
    </Modal>
  );
}
