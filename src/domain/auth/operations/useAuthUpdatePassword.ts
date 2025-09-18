import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider"
import { useAppMutation, UseAppMutationOption } from "@/src/infra/operations/useAppMutation"
import { useRepository } from "@/src/infra/repositories/RepositoryProvider"
import { AuthUpdatePasswordParams } from "../IAuthRepo"

export function useAuthUpdatePassword(options?: UseAppMutationOption<void>) {
  const {auth} = useRepository()
  const {send} = useFeedbackService()
  return useAppMutation<void, AuthUpdatePasswordParams>({
    mutateFn: (params) => auth.updatePassword(params),
    onSuccess: () => {
      send({type:"success", message: 'Senha atualizada com sucesso'})
      options?.onSuccess?.()
    },
    onError: (error) => {
      send({type:"error", message: 'Erro ao atualizar a senha'})
      options?.onError?.(error)
    }  
  })
}