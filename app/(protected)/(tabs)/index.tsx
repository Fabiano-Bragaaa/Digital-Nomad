import { CityCard } from "@/src/ui/components/CityCard";
import { Screen } from "@/src/ui/components/Screen";
import { ListRenderItemInfo } from "react-native";

import { useCategoryFindAll } from "@/src/domain/category/operations/useCategoryFindAll";
import { CityPreview } from "@/src/domain/city/City";
import { useCityFindAll } from "@/src/domain/city/operations/useCityFindAll";
import { Box } from "@/src/ui/components/Box";
import { CityFilter } from "@/src/ui/containers/CityFilter";
import { useScrollToTop } from "@react-navigation/native";
import { useRef, useState } from "react";
import Animated, { FadingTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDebounce } from "../../../src/hooks/useDebounce";
import { useAppTheme } from "../../../src/ui/theme/useAppTheme";

export default function HomeScreen() {
  const [cityName, setCityName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const debouncedCityName = useDebounce(cityName);
  const { data: cities } = useCityFindAll({
    name: debouncedCityName,
    categoryId: selectedCategoryId,
  });
  const { data: categories } = useCategoryFindAll();

  const { spacing } = useAppTheme();
  const { top } = useSafeAreaInsets();
  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);
  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return (
      <Box paddingHorizontal="padding">
        <CityCard cityPreview={item} />
      </Box>
    );
  }

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <Animated.FlatList
        itemLayoutAnimation={FadingTransition.duration(500)}
        data={cities}
        ref={flatListRef}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListHeaderComponent={
          <CityFilter
            onChangeSelectedCategoryId={setSelectedCategoryId}
            selectedCategoryId={selectedCategoryId}
            categories={categories}
            cityName={cityName}
            onChangeCityName={setCityName}
          />
        }
        contentContainerStyle={{
          gap: spacing.padding,
          paddingTop: top,
          paddingBottom: spacing.padding,
        }}
      />
    </Screen>
  );
}
