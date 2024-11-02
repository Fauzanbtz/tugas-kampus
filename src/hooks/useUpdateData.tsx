import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

type fetchProps = {
  queryKey: string;
  dataProtected: string;
  multipart?: boolean;
  backUrl?: string;
};

export const useUpdateData = ({
  queryKey,
  dataProtected,
  multipart = false,
  backUrl,
}: fetchProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  const mutation: any = useMutation<any>({
    mutationFn: (updateData: any) => {
      return axios.put(`${dataProtected}`, updateData, {
        headers: {
          "Content-Type": multipart
            ? "multipart/form-data"
            : "application/json",
        },
      });
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        title: "Error!",
        description: `${error.response.data.message}`,
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (data, variables, context) => {
      toast({
        title: `Data Updated Successfully!`,
        description: `Your data has been updated successfully.`,
      });

      queryClient.invalidateQueries({ queryKey: [queryKey] });

      if (backUrl) {
        router.push(backUrl);
      }
    },
  });

  return mutation;
};
