import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../AuthContext";
import { AuthUser } from "../AuthUser";

export function useAuthSignIn() {
  const { auth } = useRepository();
  const { send } = useFeedbackService();
  const { saveAuth } = useAuth();

  const { mutate, isPending, error } = useMutation<
    AuthUser,
    unknown,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => auth.signIn(email, password),
    onSuccess: authUser => {
      saveAuth(authUser);
      send({
        type: "success",
        message: "Login realizado com sucesso",
      });
    },
    onError: () =>
      send({
        type: "error",
        message: "Erro ao realizar login",
      }),
  });

  return { mutate, isPending, error };

  // return useAppMutation<AuthUser, { email: string; password: string }>({
  //   mutateFn: ({ email, password }) => auth.signIn(email, password),
  //   onSuccess: (authUser) => {
  //     saveAuth(authUser)
  //     send({
  //       type: 'success',
  //       message: 'Login realizado com sucesso'
  //     })
  //   },
  //   onError: () =>
  //     send({
  //       type: "error",
  //       message: "Erro ao realizar login",
  //     }),
  // });
}
