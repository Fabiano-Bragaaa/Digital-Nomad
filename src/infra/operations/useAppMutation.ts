import { useMutation } from "@tanstack/react-query";

type UseAppMutationReturn<TData, TVariables> = {
  mutate: (variables: TVariables) => TData | void;
  isLoading: boolean;
  error?: unknown;
};

export type UseAppMutationOption<TData> = {
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
}

type useAppMutationParams<TData, TVariables> = {
  mutateFn: (variables: TVariables) => Promise<TData>;
} & UseAppMutationOption<TData>;



export function useAppMutation<TData, TVariables>({
  mutateFn,
  onSuccess,
  onError,
}: useAppMutationParams<TData, TVariables>): UseAppMutationReturn<TData, TVariables> {
  const {mutate, isPending, error} = useMutation<TData, unknown, TVariables>({
    mutationFn: mutateFn,
    onSuccess,
    onError,
  });

  return {
    isLoading: isPending,
    mutate,
    error,
  };
}
