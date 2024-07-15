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
      // console.log("StudentID:", user.studentId);
      queryClient.setQueryData(["user"], user.user);
      navigate(`/dashboard/${user.studentId}`);
    },
    onError: (err) => {
      console.log("Error-->", err);
      toast.error("Incorrect email or password!");
    },
  });
  return { login, isLoading };
}
