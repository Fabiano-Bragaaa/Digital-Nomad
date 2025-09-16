import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider";
import { useAppMutation, UseAppMutationOption } from "@/src/infra/operations/useAppMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { AuthSignUpParams } from "../IAuthRepo";

export function useAuthSignUp(options?: UseAppMutationOption<void>) {
  const {auth} = useRepository()
  const {send} = useFeedbackService()

  

  return useAppMutation<void, AuthSignUpParams>({
    mutateFn: (params) => auth.signUp(params),
    onSuccess: () => {
      send({type:"success", message: 'Conta criada com sucesso'})
      options?.onSuccess?.()
    },
    onError: (error) => {
      send({type:"error", message: 'Erro ao realizar o sign up'})
      options?.onError?.(error)
    }  
  })
}