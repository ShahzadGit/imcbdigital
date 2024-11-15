import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      // console.log("user.user_metadata:", user.data.user.user_metadata.role);
      queryClient.setQueryData(["user"], user.user);
      //If user exists but no record exists in studentsapplied table then user is redirected to the page to create profile first
      if (
        user.studentId === "0" &&
        user.data.user.user_metadata.role === "student"
      )
        navigate("/applyonline");
      else navigate(`/dashboard`);
    },
    onError: (err) => {
      console.log("Error-->", err);
      toast.error("Incorrect email or password!");
    },
  });
  return { login, isLoading };
}
