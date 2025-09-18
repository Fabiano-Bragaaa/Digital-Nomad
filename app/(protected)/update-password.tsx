import { Screen } from "@/src/ui/components/Screen";
import { Text } from "@/src/ui/components/Text";
import { Header } from "@/src/ui/containers/Header";
import { UpdatePasswordForm } from "@/src/ui/containers/UpdatePasswordForm/UpdatePasswordForm";
import { UpdatePasswordSchema } from "@/src/ui/containers/UpdatePasswordForm/UpdatePasswordSchema";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdatedPasswordScreen() {

  function handleSubmit(data: UpdatePasswordSchema) {
    console.log(data);
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