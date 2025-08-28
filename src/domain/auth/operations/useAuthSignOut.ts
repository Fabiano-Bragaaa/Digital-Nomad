import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider";
import { useAppMutation } from "@/src/infra/operations/useAppMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAuth } from "../AuthContext";

export function useAuthSignOut() {
  const {removeAuthUser} = useAuth()
  const {send} = useFeedbackService()
  const {auth} = useRepository()

  return useAppMutation({
    mutateFn: () => auth.signOut(),
    onSuccess: () => {
      removeAuthUser()
    },
    onError: () => send({type: "error", message: "Erro ao realizar logout"}),
  })
}