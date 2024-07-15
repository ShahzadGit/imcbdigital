import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export default function useUpdateUser() {
  // const { reset } = useForm();
  const queryClient = useQueryClient(); //It will be use as reference to the cache
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    // After creating, we need to invalidate the cache so that updated records are fetched
    onSuccess: () => {
      toast.success("User Account Updated Successfully!");
      //   queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // reset(); onSuccess is also used in function from where it has been called
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateUser };
}
