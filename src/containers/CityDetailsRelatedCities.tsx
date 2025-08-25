import { ScrollView, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "../components/Box";
import { CityCard } from "../components/CityCard";
import { Text } from "../components/Text";
import { useRelatedCities } from "../data/useRelatedCities";
import { useAppTheme } from "../theme/useAppTheme";

type CityDetailsRelatedCitiesProps = {
  id: string;
};

export function CityDetailsRelatedCities({
  id,
}: CityDetailsRelatedCitiesProps) {
const {data: cities} = useRelatedCities(id);
  const { spacing } = useAppTheme();
  const {bottom} = useSafeAreaInsets()
  const {width, height} = useWindowDimensions()
  return (
    <Box style={{paddingBottom: bottom}}>
      <Text variant="title22" mb="s16" paddingHorizontal="padding">
        Veja Também
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: spacing.padding,
          paddingHorizontal: spacing.padding,
        }}>
        {cities?.map(city => (
          <CityCard
            key={city.id}
            cityPreview={city}
            style={{ width: width * 0.6, height: height * 0.3 }}
          />
        ))}
      </ScrollView>
    </Box>
  );
}
