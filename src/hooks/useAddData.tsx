import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

type fetchProps = {
  queryKey: string;
  dataProtected: string;
  backUrl?: string;
  multipart?: boolean;
};

export const useAddData = ({
  queryKey,
  dataProtected,
  backUrl,
  multipart = false,
}: fetchProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  const mutation: any = useMutation<any>({
    mutationFn: (addData: any) => {
      return axios.post(`${dataProtected}`, addData, {
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
    onSuccess: () => {
      toast({
        title: `Data Added Successfully!`,
        description: `Your data has been added successfully.`,
      });

      queryClient.invalidateQueries({ queryKey: [queryKey] });

      if (backUrl) {
        router.push(backUrl);
      }
    },
  });

  return mutation;
};
