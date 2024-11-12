import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditStudent } from "../../services/apiStudentEnrolled";
// import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function useEditStudent() {
  // const { reset } = useForm();
  const queryClient = useQueryClient(); //It will be use as reference to the cache
  const { isLoading: isEditing, mutate: editStudent } = useMutation({
    mutationFn: ({ newStudentData, id }) =>
      createEditStudent(newStudentData, id),
    // mutationFn: (id) => createCabin(id),
    // After creating, we need to invalidate the cache so that updated records are fetched
    onSuccess: () => {
      toast.success("Student edited Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["StudentsEnrolled"],
      });
      // reset(); onSuccess is also used in function from where it has been called
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editStudent };
}
