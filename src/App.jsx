// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Users from "./pages/Users";
// import Login from "./pages/Login";
// import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
// import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
// import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
// import Applyonline from "./pages/Applyonline";
// import { UserProvider } from "./context/UserContext";
import MyRoutes from "./routes/MyRoutes";
// import { useUser } from "./features/authentication/useUser";
// import Courses from "./pages/Courses";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //   staleTime: 60 * 1000,
      staleTime: 10 * 1000,
    },
  },
});

export default function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        {/* <UserProvider> */}
        {/* <BrowserRouter>
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
                {/* <Route path="applyonline/:studentId" element={<Courses />} /> */}
        {/* <Route path="account" element={<Account />} /> 
              </Route>
              <Route path="users" element={<Users />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter> */}
        <MyRoutes />
        {/* </UserProvider> */}

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 5000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}
