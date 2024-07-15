import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupWithAvatar as signupWithAvatarApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignupWithAvatar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signupWithAvatar, isLoading } = useMutation({
    mutationFn: signupWithAvatarApi,
    onSuccess: (user) => {
      toast.success("Account Created Successfully.");
      queryClient.setQueryData(["user"], user.user);
      navigate("/applyonline");
    },
    onError: (err) => toast.error(err.message),
  });
  return { signupWithAvatar, isLoading };
}
