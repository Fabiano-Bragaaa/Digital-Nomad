import { Button } from "@/src/ui/components/Button";
import { Screen } from "@/src/ui/components/Screen";
import { Header } from "@/src/ui/containers/Header";
import { Logo } from "@/src/ui/containers/Logo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPasswordScreen() {
  function handleSubmit() {}

  return (
    <Screen>
      <SafeAreaView>
        <Header title="Recuperar Senha" />
        <Button onPress={handleSubmit} title="enviar link" />
        <Logo />
      </SafeAreaView>
    </Screen>
  );
}
