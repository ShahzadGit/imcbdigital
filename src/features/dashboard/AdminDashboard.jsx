import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import DashboardLayout from "./DashboardLayout";

export default function AdminDashboard() {
  return (
    <>
      <Row>
        <Heading type="h2">Admin Dashboard</Heading>
      </Row>
      <DashboardLayout />
    </>
  );
}
