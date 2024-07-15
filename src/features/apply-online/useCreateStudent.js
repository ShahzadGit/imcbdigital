import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent as createStudentApi } from "../../services/apiStudent";
import toast from "react-hot-toast";
// import { useForm } from "react-hook-form";

export function useCreateStudent() {
  // const { reset } = useForm();
  const queryClient = useQueryClient(); //It will be use as reference to the cache
  const { isLoading: isCreating, mutate: createStudent } = useMutation({
    mutationFn: createStudentApi,
    // mutationFn: (id) => createCabin(id),
    // After creating, we need to invalidate the cache so that updated records are fetched
    onSuccess: () => {
      toast.success("Admission Form submitted Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["student"],
      });
      // reset(); onSuccess is also used in function from where it has been called
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createStudent };
}
