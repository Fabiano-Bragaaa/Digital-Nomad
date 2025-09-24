import { useAuth } from "@/src/domain/auth/AuthContext";
import { useAppTheme } from "@/src/ui/theme/useAppTheme";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  const { isReady, authUser } = useAuth();
  const { colors } = useAppTheme();

  if (!isReady) {
    return null;
  }

  if (!authUser) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
        contentStyle: { backgroundColor: colors.background },
      }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
