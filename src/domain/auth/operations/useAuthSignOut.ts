import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider";
import { useAppMutation } from "@/src/infra/operations/useAppMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../AuthContext";

export function useAuthSignOut() {
  const {removeAuthUser} = useAuth()
  const {send} = useFeedbackService()
  const {auth} = useRepository()

  const queryClient = useQueryClient()

  return useAppMutation({
    mutateFn: () => auth.signOut(),
    onSuccess: () => {
      queryClient.clear()
      removeAuthUser()
    },
    onError: () => send({type: "error", message: "Erro ao realizar logout"}),
  })
}