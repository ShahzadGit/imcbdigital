import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useGetStudentsAndCourses } from "../apply-online/useGetStudentsAndCourses";
import { useGetStudentsEnrolled } from "../students/useGetStudentsEnrolled";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* grid-template-rows: auto 34rem auto; */
  grid-template-rows: auto auto auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { isLoading1, count: studentsapplied } = useGetStudentsAndCourses();
  const { isLoading2, count: studentsenrolled } = useGetStudentsEnrolled();
  if (isLoading1 || isLoading2) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        studentsapplied={studentsapplied}
        studentsenrolled={studentsenrolled}
        // numDays={numDays}
        // cabinCount={cabins.length}
      />
    </StyledDashboardLayout>
  );
}
