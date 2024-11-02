import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

type fetchProps = {
  queryKey: [string, number] | [string];
  dataProtected: string;
  keep?: boolean;
};

export const useFetchData = ({ queryKey, dataProtected}: fetchProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch,
    isRefetching,
    isStale,
  } = useQuery({
    queryKey: queryKey,
    queryFn: async () => await axios.get(`${dataProtected}`),
    placeholderData: keepPreviousData,
  });

  return {
    data,
    isLoading,
    isError,
    isStale,
    isSuccess,
    refetch,
    isRefetching,
  };
};
