import { useAuthUpdatePassword } from "@/src/domain/auth/operations/useAuthUpdatePassword";
import { Screen } from "@/src/ui/components/Screen";
import { Text } from "@/src/ui/components/Text";
import { Header } from "@/src/ui/containers/Header";
import { UpdatePasswordForm } from "@/src/ui/containers/UpdatePasswordForm/UpdatePasswordForm";
import { UpdatePasswordSchema } from "@/src/ui/containers/UpdatePasswordForm/UpdatePasswordSchema";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdatedPasswordScreen() {
  const { mutate: updatePassword } = useAuthUpdatePassword({
    onSuccess: () => {
      router.back();
    }
  });

  function handleSubmit(data: UpdatePasswordSchema) {
    updatePassword({
      password: data.oldPassword,
      newPassword: data.password,
    });
  }

  return (
    <Screen scrollable>
    <SafeAreaView>
      <Header title="Atualizar Senha" />
      <Text mb="s16">Mantenha suas informações atualizadas para uma melhor experiência</Text>
      <UpdatePasswordForm onSubmit={handleSubmit}  />
    </SafeAreaView>
  </Screen>
  );
}