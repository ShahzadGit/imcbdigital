import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourses as createCoursesApi } from "../../services/apiStudent";
import toast from "react-hot-toast";

export function useCreateCourses() {
  const queryClient = useQueryClient(); //It will be use as reference to the cache
  const { isLoading: isCreating, mutate: createCourses } = useMutation({
    mutationFn: createCoursesApi,

    onSuccess: () => {
      toast.success("Application submitted Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
      // reset(); onSuccess is also used in function from where it has been called
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCourses };
}