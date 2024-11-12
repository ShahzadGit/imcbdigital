/* eslint-disable react/prop-types */
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useGetAssignedCourses } from "../faculty/useGetAssignedCourses";
import MyCourses from "./MyCourses";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  /* grid-template-rows: auto 34rem auto; */
  /* grid-template-rows: auto auto auto auto; */
  gap: 2rem;
`;

export default function DashboardLayoutFaculty({ faculty_id }) {
  const { isLoading, data: coursesAndSections } =
    useGetAssignedCourses(faculty_id);

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <MyCourses coursesAndSections={coursesAndSections} />
    </StyledDashboardLayout>
  );
}
