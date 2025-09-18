import { Screen } from "@/src/ui/components/Screen";
import { Text } from "@/src/ui/components/Text";
import { Header } from "@/src/ui/containers/Header";
import { UpdateProfileForm } from "@/src/ui/containers/UpdateProfileForm/UpdateProfileForm";
import { UpdateProfileSchema } from "@/src/ui/containers/UpdateProfileForm/UpdateProfileSchema";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdateProfileScreen() {
  const { fullname, email } = useLocalSearchParams<{ fullname: string, email: string }>();

  function handleSubmit(data: UpdateProfileSchema) {
    console.log(data);
  }

  return (
    <Screen scrollable>
    <SafeAreaView>
      <Header title="Atualizar Perfil" />
      <Text mb="s16">Mantenha suas informações atualizadas para uma melhor experiência</Text>
      <UpdateProfileForm onSubmit={handleSubmit} defaultValues={{ fullname, email }} />
    </SafeAreaView>
  </Screen>
  );
}