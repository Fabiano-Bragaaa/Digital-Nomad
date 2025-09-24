import { useAuthGetUser } from "@/src/domain/auth/operations/useAuthGetUser";
import { useAuthSignOut } from "@/src/domain/auth/operations/useAuthSignOut";
import { Box } from "@/src/ui/components/Box";
import { Icon } from "@/src/ui/components/Icon";
import { Screen } from "@/src/ui/components/Screen";
import { Text } from "@/src/ui/components/Text";
import { FavoriteCityList } from "@/src/ui/containers/Profile/FavoriteCityList";
import { ProfileHeader } from "@/src/ui/containers/Profile/ProfileHeader";
import { Pressable } from "react-native";

export default function ProfileScreen() {
  const { mutate: signOut } = useAuthSignOut();
  const { data: user } = useAuthGetUser();

  return (
    <Screen>
        <Box mt="s16" rowGap="s16">
          <FavoriteCityList
            ListHeaderComponent={user && <ProfileHeader authUser={user} />}
            ListFooterComponent={
              <Pressable onPress={signOut}>
                <Box
                  flexDirection="row"
                  alignItems="center"
                  alignSelf="center"
                  gap="s4"
                  mt="s24">
                  <Icon name="Logout" color="fbErrorSurface" />
                  <Text color="fbErrorSurface">Sair</Text>
                </Box>
              </Pressable>
            }
          />
        </Box>
    </Screen>
  );
}
