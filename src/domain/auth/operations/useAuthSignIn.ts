import { useAppMutation } from "@/src/infra/operations/useAppMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { AuthUser } from "../AuthUser";

export function useAuthSignIn() {
  const {auth} = useRepository()

  return useAppMutation<AuthUser, {email: string, password: string}>({
    mutateFn: ({email, password}) => auth.signIn(email, password),
    onSuccess: (authUser) => console.log('sucesso', authUser.id),
    onError: () => console.log('erro')  
  })
}