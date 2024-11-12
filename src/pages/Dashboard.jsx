import { useUser } from "../features/authentication/useUser";
import StudentDashboard from "../features/dashboard/StudentDashboard";
import AdminDashboard from "../features/dashboard/AdminDashboard";
import Spinner from "../ui/Spinner";
import FacultyDashboard from "../features/dashboard/FacultyDashboard";

function Dashboard() {
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;
  const { role } = user.user_metadata;
  return (
    <>
      {!role && <StudentDashboard />}
      {role === "student" && <StudentDashboard />}
      {role === "admin" && <AdminDashboard />}
      {role === "faculty" && <FacultyDashboard />}
    </>
  );
}

export default Dashboard;
