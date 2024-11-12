import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../ui/ProtectedRoute";
import AppLayout from "../ui/AppLayout";
import PageNotFound from "../pages/PageNotFound";
import Dashboard from "../pages/Dashboard";
import Applyonline from "../pages/Applyonline";
import Login from "../pages/Login";
import Users from "../pages/Users";
import StudentsApplied from "../pages/StudentsApplied";
import StudentsEnrolled from "../pages/StudentsEnrolled";
import FacultyData from "../pages/FacultyData";
import Account from "../pages/Account";
import MarkAttendance from "../pages/MarkAttendance";
import AttendanceViewPage from "../pages/AttendanceViewPage";
import AttendanceViewPageStd from "../pages/AttendanceViewPageStd";

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            // element={<Navigate replace to="dashboard/:studentId" />}
            element={<Navigate replace to="dashboard" />}
          />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="applyonline" element={<Applyonline />} />

          <Route path="studentsapplied" element={<StudentsApplied />} />

          <Route path="studentsenrolled" element={<StudentsEnrolled />} />
          <Route path="facultydata" element={<FacultyData />} />
          <Route path="account" element={<Account />} />
          <Route
            path="markattendance/:courseId/:sectionId/:session/:part"
            element={<MarkAttendance />}
          />
          <Route
            path="viewattendance/:courseId/:sectionId/:session/:part"
            element={<AttendanceViewPage />}
          />
          <Route
            path="stdattendance/:courseId/:sectionId/:session/:part/:roll_no"
            element={<AttendanceViewPageStd />}
          />
        </Route>
        <Route path="users" element={<Users />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
