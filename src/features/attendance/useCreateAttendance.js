import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAttendance as createAttendanceApi } from "../../services/apiAttendance";
import toast from "react-hot-toast";
// import { useForm } from "react-hook-form";

export function useCreateAttendance() {
  // const { reset } = useForm();
  const queryClient = useQueryClient(); //It will be use as reference to the cache
  const { isLoading: isCreating, mutate: createAttendance } = useMutation({
    mutationFn: createAttendanceApi,
    // After creating, we need to invalidate the cache so that updated records are fetched
    onSuccess: () => {
      toast.success("Attendance submitted Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["Attendance"],
      });
      // reset(); onSuccess is also used in function from where it has been called
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createAttendance };
}
