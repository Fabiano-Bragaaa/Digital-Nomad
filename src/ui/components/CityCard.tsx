import { CityPreview } from "@/src/domain/city/City";
import { useCityToggeFavorite } from "@/src/domain/city/operations/useCityToggeFavorite";
import { Link } from "expo-router";
import { ImageBackground, ImageBackgroundProps, Pressable } from "react-native";
import { useAppTheme } from "../theme/useAppTheme";
import { BlackOpacity } from "./BlackOpacity";
import { Box, TouchableOpacityBox } from "./Box";
import { Icon } from "./Icon";
import { Text } from "./Text";

type CityCardProps = {
  cityPreview: CityPreview;
  style?: ImageBackgroundProps["style"];
};

export function CityCard({ cityPreview, style }: CityCardProps) {
  const { borderRadii } = useAppTheme();
  const { mutate: toggleFavorite } = useCityToggeFavorite();
  return (
    <Link push href={`/city-details/${cityPreview.id}`} asChild>
      <Pressable>
        <ImageBackground
          style={[{ width: "100%", height: 280 }, style]}
          source={
            typeof cityPreview.coverImage === "string"
              ? { uri: cityPreview.coverImage }
              : cityPreview.coverImage
          }
          imageStyle={{ borderRadius: borderRadii.default }}>
          <BlackOpacity />
          <Box flex={1} padding="s24" justifyContent="space-between">
            <TouchableOpacityBox alignSelf="flex-end" onPress={() => toggleFavorite({ cityId: cityPreview.id, isFavorite: false })}>
              <Icon name="Favorite-outline" />
            </TouchableOpacityBox>
            <Box>
              <Text variant="title22">{cityPreview.name}</Text>
              <Text variant="text16">{cityPreview.country}</Text>
            </Box>
          </Box>
        </ImageBackground>
      </Pressable>
    </Link>
  );
}
