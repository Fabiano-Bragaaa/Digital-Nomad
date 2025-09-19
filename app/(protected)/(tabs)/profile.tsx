import { useAuthGetUser } from "@/src/domain/auth/operations/useAuthGetUser";
import { useAuthSignOut } from "@/src/domain/auth/operations/useAuthSignOut";
import { useCityFindAllFavorites } from "@/src/domain/city/operations/useCityFindAllFavorites";
import { Box } from "@/src/ui/components/Box";
import { CityCard } from "@/src/ui/components/CityCard";
import { Icon } from "@/src/ui/components/Icon";
import { Screen } from "@/src/ui/components/Screen";
import { Text } from "@/src/ui/components/Text";
import { ProfileHeader } from "@/src/ui/containers/Profile/ProfileHeader";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { mutate: signOut } = useAuthSignOut();
  const { data: user } = useAuthGetUser();
  const { data: favorites } = useCityFindAllFavorites();


  return (
    <Screen>
      <SafeAreaView>
        {user && <ProfileHeader authUser={user} />}
        {favorites?.map((favorite) => (
         <CityCard key={favorite.id} cityPreview={favorite} />
        ))}
        <Pressable onPress={signOut}>
          <Box flexDirection="row" alignItems="center" alignSelf="center" gap="s4" mt="s24">
            <Icon name="Logout" color="fbErrorSurface" />
            <Text color="fbErrorSurface">Sair</Text>
          </Box>
        </Pressable>
      </SafeAreaView>
    </Screen>
  );
}
