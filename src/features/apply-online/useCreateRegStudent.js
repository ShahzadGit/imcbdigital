import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRegisteredStudent as createRegisteredStudentApi } from "../../services/apiStudentOnline";
import toast from "react-hot-toast";
// import { useForm } from "react-hook-form";

export function useCreateRegStudent() {
  // const { reset } = useForm();
  const queryClient = useQueryClient(); //It will be use as reference to the cache
  const { isLoading: isCreating, mutate: createRegStudent } = useMutation({
    mutationFn: createRegisteredStudentApi,
    // mutationFn: (id) => createCabin(id),
    // After creating, we need to invalidate the cache so that updated records are fetched
    onSuccess: () => {
      toast.success("Admission Confirmed! Data transfered to student list.");
      queryClient.invalidateQueries({
        queryKey: ["student"],
      });
      // reset(); onSuccess is also used in function from where it has been called
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createRegStudent };
}
