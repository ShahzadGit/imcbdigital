import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAssignCourses as createAssignCoursesApi } from "../../services/apiFaculty";
import toast from "react-hot-toast";
// import { useForm } from "react-hook-form";

export function useCreateAssignCourses() {
  // const { reset } = useForm();
  const queryClient = useQueryClient(); //It will be use as reference to the cache
  const { isLoading: isCreating, mutate: createAssignCourses } = useMutation({
    mutationFn: createAssignCoursesApi,
    // After creating, we need to invalidate the cache so that updated records are fetched
    onSuccess: () => {
      toast.success("Data submitted Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["AssignedCourses"],
      });
      // reset(); onSuccess is also used in function from where it has been called
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createAssignCourses };
}
