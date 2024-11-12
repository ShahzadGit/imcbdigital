import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import DashboardLayoutFaculty from "./DashboardLayoutFaculty";
import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";
import { useGetFaculty } from "../faculty/useGetFaculty";

export default function FacultyDashboard() {
  const { user } = useUser();
  const { id: uuid } = user;

  const { faculty, isLoading: isLoadingFaculty } = useGetFaculty(uuid);
  const faculty_id = faculty[0]?.id;
  if (isLoadingFaculty) return <Spinner />;
  return (
    <>
      <Row>
        <Heading type="h2">Faculty Dashboard</Heading>
      </Row>
      <DashboardLayoutFaculty faculty_id={faculty_id} />
    </>
  );
}
