import { CityCard } from "@/src/components/CityCard";
import { Screen } from "@/src/components/Screen";
import { FlatList, ListRenderItemInfo } from "react-native";

import { Box } from "@/src/components/Box";
import { CityFilter } from "@/src/containers/CityFilter";
import { categories } from "@/src/data/categories";
import { useCities } from "@/src/data/useCities";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useAppTheme } from "@/src/theme/useAppTheme";
import { CityPreview } from "@/src/types";
import { useScrollToTop } from "@react-navigation/native";
import { useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [cityName, setCityName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const debouncedCityName = useDebounce(cityName)
  const { cityPreviewList } = useCities({name: cityName, categoryId: selectedCategoryId});

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
      <FlatList
        data={cityPreviewList}
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
