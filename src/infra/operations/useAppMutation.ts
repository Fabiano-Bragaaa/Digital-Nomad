import { useState } from "react";

type UseAppMutationReturn<TData, TVariables> = {
  mutate: (variables: TVariables) => Promise<TData | void>;
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  async function mutate(variables: TVariables) {
    try {
      setError(null);
      const data = await mutateFn(variables);
        onSuccess?.(data);
    } catch (error) {
        onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    mutate,
    error,
  };
}
