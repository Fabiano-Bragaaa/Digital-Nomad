import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider"
import { useAppMutation, UseAppMutationOption } from "@/src/infra/operations/useAppMutation"
import { useRepository } from "@/src/infra/repositories/RepositoryProvider"
import { useQueryClient } from "@tanstack/react-query"
import { AuthUpdateProfileParams } from "../IAuthRepo"

export function useAuthUpdateProfile(options?: UseAppMutationOption<void>) {
  const {auth} = useRepository()
  const {send} = useFeedbackService()
  const queryClient = useQueryClient()
  return useAppMutation<void, AuthUpdateProfileParams>({
    mutateFn: (params) => auth.updateProfile(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      send({type:"success", message: 'Perfil atualizado com sucesso'})
      options?.onSuccess?.()
    },
    onError: (error) => {
      send({type:"error", message: 'Erro ao atualizar o perfil'})
      options?.onError?.(error)
    }  
  })
}