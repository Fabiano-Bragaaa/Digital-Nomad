import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider";
import { useAppMutation, UseAppMutationOption } from "@/src/infra/operations/useAppMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";

export function useAuthSendResetPasswordEmail(options?: UseAppMutationOption<void>) {
  const {auth} = useRepository()
  const {send} = useFeedbackService()

  return useAppMutation<void, {email: string}>({
    mutateFn: ({email}) => auth.sendResetPasswordEmail(email),
    onSuccess: () => {
      send({type:"success", message: 'Link enviado para o email'});
      options?.onSuccess?.();
    },
    onError: (error) => {
      send({type:"error", message: 'Erro ao realizar login'});
      options?.onError?.(error);
    }
  })
}