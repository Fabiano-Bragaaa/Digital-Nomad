import { useAuthSignOut } from "@/src/domain/auth/operations/useAuthSignOut";
import { Box } from "@/src/ui/components/Box";
import { Icon } from "@/src/ui/components/Icon";
import { Screen } from "@/src/ui/components/Screen";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { mutate: signOut } = useAuthSignOut();
  return (
    <Screen>
      <SafeAreaView>
        <Text>Profile</Text>
        <Pressable onPress={signOut}>
          <Box flexDirection="row"  alignItems="center" gap='s4'>
            <Text>Sair</Text>
            <Icon name="Logout" />
          </Box>
        </Pressable>
      </SafeAreaView>
    </Screen>
  );
}
