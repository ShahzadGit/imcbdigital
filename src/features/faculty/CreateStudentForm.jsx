/* eslint-disable react/prop-types */
import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import { useCreateStudent } from "./useCreateStudent";
// import { useUser } from "../authentication/useUser";
import Heading from "../../ui/Heading";
// import { useNavigate } from "react-router-dom";
import { useHookFormMask } from "use-mask-input";
import FileInput from "../../ui/FileInput";
import useEditStudent from "./useEditStudent";

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1rem;
  color: var(--color-red-700);
`;

function CreateStudentForm({ studentToEdit = {}, onCloseModal }) {
  // console.log("🚀 ~ CreateStudentForm ~ studentToEdit:", studentToEdit);
  const { id: editId, ...editValues } = studentToEdit;
  const isEditSession = Boolean(editId); //If there is an id than Edit student record

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const registerWithMask = useHookFormMask(register);

  const { errors } = formState;

  const { isCreating, createStudent } = useCreateStudent();

  const { isEditing, editStudent } = useEditStudent();

  // This boolean will combine booth LOADING states for creating and editing
  const isWorking = isCreating || isEditing;

  const currentSession = new Date().getFullYear();
  //   const navigate = useNavigate();

  function onSubmit(data) {
    console.log("🚀 ~ onSubmit ~ data:", data);
    const avatar =
      typeof data.avatar === "string" ? data.avatar : data.avatar[0]; //This will determine if data contains a URL or a FileType

    console.log("🚀 ~ onSubmit ~ avatar:", avatar);

    if (isEditSession)
      editStudent(
        { newStudentData: { ...data, avatar }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.(); //This prop is comming from Modal Component
          },
        }
      );
    else
      createStudent(
        //   { ...data, uuid, fullName, avatar },
        { ...data, avatar: data.avatar[0] },
        //   { ...data },
        {
          onSuccess: () => {
            reset();
            //   navigate(`/dashboard`);
            onCloseModal();
          },
        }
      );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <Heading type="h3">Student Information</Heading>

      <FormRow>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required!",
          })}
        />
        {errors?.fullName?.message && <Error>{errors.fullName.message}</Error>}
        <Label htmlFor="roll_no">Roll No.</Label>
        <Input
          type="number"
          id="roll_no"
          {...register("roll_no", {
            required: "This field is required!",
          })}
        />
        {errors?.roll_no?.message && <Error>{errors.roll_no.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="cnic">CNIC of Candidate</Label>
        <Input
          type="text"
          id="cnic"
          {...registerWithMask("cnic", ["99999-9999999-9"], {
            required: "This field is required!",
          })}
          disabled={isCreating}
        />
        {errors?.cnic?.message && <Error>{errors.cnic.message}</Error>}

        <Label htmlFor="dob">Date of Birth</Label>
        <Input
          type="date"
          id="dob"
          {...register("dob", {
            required: "This field is required!",
          })}
        />
        {errors?.dob?.message && <Error>{errors.dob.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="session">Session</Label>
        <Input
          type="text"
          id="session"
          defaultValue={
            currentSession + "-" + (currentSession + 1).toString().slice(2, 4)
          }
          {...register("session", {
            required: "This field is required!",
          })}
        />
        {errors?.session?.message && <Error>{errors.session.message}</Error>}

        <Label htmlFor="class_year">Class</Label>
        <select
          id="class_year"
          name="class_year"
          {...register("class_year", {
            required: "This field is required!",
          })}
        >
          <option>Select Class</option>
          <option value={"HSSC-I"}>HSSC-I</option>
          <option value={"HSSC-II"}>HSSC-II</option>
        </select>

        {/* <Input
          type="text"
          id="class_year"
          defaultValue={"HSSC-I"}
          {...register("class_year", {
            required: "This field is required!",
          })}
        /> */}
        {errors?.class_year?.message && (
          <Error>{errors.class_year.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="avatar">Passport Size Photo</Label>
        <FileInput
          id="avatar"
          accept="image/*"
          {...register("avatar", {
            // required: "This field is required!",
            required: isEditSession ? false : "This field is required!",
          })}
        />
        {errors?.avatar?.message && <Error>{errors.avatar.message}</Error>}
      </FormRow>

      <Heading type="h3">Father/Gaurdian Information</Heading>
      <FormRow>
        <Label htmlFor="father_name">Father Name</Label>
        <Input
          type="text"
          id="father_name"
          {...register("father_name", {
            required: "This field is required!",
          })}
          disabled={isCreating}
        />
        {errors?.father_name?.message && (
          <Error>{errors.father_name.message}</Error>
        )}

        <Label htmlFor="contact">Contact No.(eg. 03123456789)</Label>
        <Input
          type="number"
          id="contact"
          defaultValue={"03"}
          {...register("contact", {
            required: "This field is required!",
            maxLength: {
              value: 11,
              message: "Can not exceed 11 digits",
            },
          })}
        />
        {errors?.contact?.message && <Error>{errors.contact.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="contact_wtp">WhatsApp No.(eg. 03123456789)</Label>
        <Input
          type="number"
          id="contact_wtp"
          defaultValue={"03"}
          {...register("contact_wtp", {
            required: "This field is required!",
            maxLength: {
              value: 11,
              message: "Can not exceed 11 digits",
            },
          })}
        />
        {errors?.contact_wtp?.message && (
          <Error>{errors.contact_wtp.message}</Error>
        )}
        <Label htmlFor="present_address">Present Address</Label>
        <Textarea
          type="number"
          id="present_address"
          defaultValue=""
          {...register("present_address", {
            required: "This field is required!",
          })}
        />
        {errors?.present_address?.message && (
          <Error>{errors.present_address.message}</Error>
        )}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={isWorking}>Save</Button>
      </FormRow>
    </Form>
  );
}

export default CreateStudentForm;
