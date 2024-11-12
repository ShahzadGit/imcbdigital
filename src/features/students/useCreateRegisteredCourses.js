import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRegisteredCourses as createRegisteredCoursesApi } from "../../services/apiStudentEnrolled";
import toast from "react-hot-toast";
// import { useForm } from "react-hook-form";

export function useCreateRegisteredCourses() {
  // const { reset } = useForm();
  const queryClient = useQueryClient(); //It will be use as reference to the cache
  const { isLoading: isCreating, mutate: createRegisteredCourses } =
    useMutation({
      mutationFn: createRegisteredCoursesApi,
      // After creating, we need to invalidate the cache so that updated records are fetched
      onSuccess: () => {
        toast.success("Data submitted Successfully!");
        queryClient.invalidateQueries({
          queryKey: ["StudentsEnrolled"],
        });
        // reset(); onSuccess is also used in function from where it has been called
      },
      onError: (err) => toast.error(err.message),
    });
  return { isCreating, createRegisteredCourses };
}
