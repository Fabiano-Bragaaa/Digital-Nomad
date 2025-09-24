import { CityGroupByCategory } from "@/src/domain/city/ICityRepo";
import { ScrollView } from "react-native";
import { useAppTheme } from "../theme/useAppTheme";
import { Box } from "./Box";
import { categoryIconMap } from "./CategoryPill";
import { CityCard } from "./CityCard";
import { Icon } from "./Icon";
import { Text } from "./Text";

export function CitiesGroupedByCategoryItem({
  category,
  cities,
}: CityGroupByCategory) {
  const { spacing } = useAppTheme();
  return (
    <Box>
      <Box flexDirection="row" alignItems="center" ml="s16">
        <Icon name={categoryIconMap[category.code]} color="primary" />
        <Box ml="s12" mb="s16">
          <Text variant="title22">{category.name}</Text>
          <Text variant="text14">{category.description}</Text>
        </Box>
      </Box>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: spacing.padding, paddingLeft: spacing.padding}}>
        {cities.map(city => (
          <CityCard key={city.id} cityPreview={city} type="small" disabledFavorite />
        ))}
      </ScrollView>
    </Box>
  );
}
