import { useQuery } from "@tanstack/react-query";

type UseFetchDataReturn<DataT> = {
  data?: DataT;
  isLoading: boolean;
  error?: unknown;
};

type useAppQueryParams<DataT> = {
  queryKey: (string | number | undefined | null)[];
  fetchData: () => Promise<DataT>;
};

export function useAppQuery<DataT>({
  queryKey,
  fetchData,
}: useAppQueryParams<DataT>): UseFetchDataReturn<DataT> {
  const { data, error, isPending } = useQuery({
    queryKey,
    queryFn: fetchData,
  });

  return {
    isLoading: isPending,
    data,
    error,
  };
}
