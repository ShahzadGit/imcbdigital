import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourses as createCoursesApi } from "../../services/apiStudentOnline";
import toast from "react-hot-toast";

export function useCreateCourses() {
  const queryClient = useQueryClient(); //It will be use as reference to the cache
  const { isLoading: isCreating, mutate: createCourses } = useMutation({
    mutationFn: createCoursesApi,

    onSuccess: () => {
      toast.success("Data is being submitted. Please wait...!");
      queryClient.invalidateQueries({
        queryKey: ["courses_applied"],
      });
      // reset(); onSuccess is also used in function from where it has been called
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCourses };
}
