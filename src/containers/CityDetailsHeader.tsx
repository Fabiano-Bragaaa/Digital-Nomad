import { router } from "expo-router";
import { ImageBackground, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlackOpacity } from "../components/BlackOpacity";
import { Box } from "../components/Box";
import { CategoryPill } from "../components/CategoryPill";
import { Icon } from "../components/Icon";
import { IconButton } from "../components/IconButton";
import { City } from "../types";

type CityDetailsHeaderProps = Pick<City, "id" | "categories" | "coverImage">;

export function CityDetailsHeader({
  coverImage,
  categories,
  id,
}: CityDetailsHeaderProps) {
  const { top } = useSafeAreaInsets();
  return (
    <Box>
      <ImageBackground
        source={typeof coverImage === "string" ? { uri: coverImage } : coverImage}
        style={{ width: "100%", height: 250 }}
        imageStyle={{ borderBottomRightRadius: 40 }}>
          <BlackOpacity/>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal="padding"
          style={{ paddingTop: top }}>
          <IconButton iconName="Chevron-left" onPress={router.back} />
          <Icon name="Favorite-outline" size={30} color="pureWhite" />
        </Box>
      </ImageBackground>
      <ScrollView horizontal bounces={false} style={{marginTop: -15}}>
        <Box flexDirection="row" gap="s8" paddingHorizontal="padding">
          {categories.map(category => (
            <CategoryPill key={category.id} category={category} active={true} />
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
}
