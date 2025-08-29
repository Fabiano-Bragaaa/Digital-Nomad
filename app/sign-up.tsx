import { Button } from "@/src/ui/components/Button";
import { Screen } from "@/src/ui/components/Screen";
import { Header } from "@/src/ui/containers/Header";
import { Logo } from "@/src/ui/containers/Logo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  function handleSubmit() {}

  return (
    <Screen>
      <SafeAreaView>
        <Header title="criar conta" />
        <Button onPress={handleSubmit} title="Criar conta" />
        <Logo />
      </SafeAreaView>
    </Screen>
  );
}
