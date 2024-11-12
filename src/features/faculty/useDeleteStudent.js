import toast from "react-hot-toast";
import { deleteStudent as deleteStudentApi } from "../../services/apiStudentEnrolled";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteStudent() {
  const queryClient = useQueryClient(); //It will be use as reference to the cache
  const { isLoading: isDeleting, mutate: deleteStudent } = useMutation({
    mutationFn: deleteStudentApi,
    // mutationFn: (id) => deleteCabin(id),
    // After deleting, we need to invalidate the cache so that updated records are fetched
    onSuccess: () => {
      toast.success("Student successfully deleted!");
      queryClient.invalidateQueries({
        queryKey: ["StudentsEnrolled"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteStudent };
}
