/* eslint-disable react/prop-types */
import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import { useCreateStudent } from "./useCreateStudent";
import { useUser } from "../authentication/useUser";
import Heading from "../../ui/Heading";
import { useNavigate } from "react-router-dom";

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1rem;
  color: var(--color-red-700);
`;

function CreateAddmissionForm() {
  // const { id: editId, ...editValues } = cabinToEdit;
  // const isEditSession = Boolean(editId); //If there is an id than Edit cabin

  const { register, handleSubmit, getValues, formState, reset } = useForm({
    // defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { isCreating, createStudent } = useCreateStudent();
  const { user } = useUser();
  const { id: uuid } = user;
  const { fullName } = user.user_metadata;
  const navigate = useNavigate();

  function onSubmit(data) {
    createStudent(
      { ...data, uuid, fullName },
      {
        onSuccess: (data) => {
          reset();
          // console.log("Data after submission...", data);
          navigate(`/applyonline/${data?.id}`);
        },
      }
    );
  }
  // function onError(errors) {
  //   console.log("errors", errors);
  // }
  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="regular">
      <Heading type="h3">Candidate Information</Heading>
      <FormRow>
        <Label htmlFor="cnic">CNIC of Candidate</Label>
        <Input
          type="text"
          id="cnic"
          {...register("cnic", {
            required: "This field is required!",
          })}
          disabled={isCreating}
        />
        {errors?.cnic?.message && <Error>{errors.cnic.message}</Error>}
      </FormRow>

      <FormRow>
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
        <Label htmlFor="passing_year">Passing Year</Label>
        <Input
          type="number"
          id="passing_year"
          {...register("passing_year", {
            required: "This field is required!",
            min: {
              value: 2022,
              message: "Passing Year should be between (2022-2024).",
            },
          })}
        />
        {errors?.passing_year?.message && (
          <Error>{errors.passing_year.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="last_institute">Last Institute Attended</Label>
        <Textarea
          type="number"
          id="last_institute"
          defaultValue=""
          {...register("last_institute", {
            required: "This field is required!",
          })}
        />
        {errors?.last_institute?.message && (
          <Error>{errors.last_institute.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="board_rollNo">Board Roll No.</Label>
        <Input
          type="number"
          id="board_rollNo"
          {...register("board_rollNo", {
            required: "This field is required!",
          })}
        />
        {errors?.board_rollNo?.message && (
          <Error>{errors.board_rollNo.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="total_marks">Total Marks</Label>
        <Input
          type="number"
          id="total_marks"
          defaultValue={0}
          {...register("total_marks", {
            required: "This field is required!",
          })}
        />
        {errors?.total_marks?.message && (
          <Error>{errors.total_marks.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="marks_obtained">Marks Obtained</Label>
        <Input
          type="number"
          id="marks_obtained"
          defaultValue={0}
          {...register("marks_obtained", {
            required: "This field is required!",
            validate: (value) =>
              value <= Number(getValues().total_marks) ||
              "Obtained-Marks should be less than Total Marks",
          })}
        />
        {errors?.marks_obtained?.message && (
          <Error>{errors.marks_obtained.message}</Error>
        )}
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
      </FormRow>

      <FormRow>
        <Label htmlFor="cnic_father">CNIC of Father</Label>
        <Input
          type="text"
          id="cnic_father"
          {...register("cnic_father", {
            required: "This field is required!",
          })}
          disabled={isCreating}
        />
        {errors?.cnic_father?.message && (
          <Error>{errors.cnic_father.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="occupation">
          Occupation of Father (e.g. Govt.
          Employee/Business/Self-Employeed/Other)
        </Label>
        <Input
          type="text"
          id="occupation"
          {...register("occupation", {
            required: "This field is required!",
          })}
          disabled={isCreating}
        />
        {errors?.occupation?.message && (
          <Error>{errors.occupation.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="contact">Contact No.(eg. 03123456789)</Label>
        <Input
          type="number"
          id="contact"
          {...register("contact", {
            required: "This field is required!",
          })}
        />
        {errors?.contact?.message && <Error>{errors.contact.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="contact_wtp">WhatsApp No.(eg. 03123456789)</Label>
        <Input
          type="number"
          id="contact_wtp"
          {...register("contact_wtp", {
            required: "This field is required!",
          })}
        />
        {errors?.contact_wtp?.message && (
          <Error>{errors.contact_wtp.message}</Error>
        )}
      </FormRow>

      <FormRow>
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
        <Label htmlFor="quota">
          Quota (e.g. FG-Employee/ICT-Resident/FATA-FANA/Sports/Disable)
        </Label>
        <Input
          type="text"
          id="quota"
          {...register("quota", {
            required: "This field is required!",
          })}
          disabled={isCreating}
        />
        {errors?.occupation?.message && (
          <Error>{errors.occupation.message}</Error>
        )}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Save & Next</Button>
      </FormRow>
    </Form>
  );
}

export default CreateAddmissionForm;
