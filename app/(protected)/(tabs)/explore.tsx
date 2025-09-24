import { CityGroupByCategory } from "@/src/domain/city/ICityRepo";
import { useCityFindGroupByCategory } from "@/src/domain/city/operations/useCityFindGroupByCategory";
import { CitiesGroupedByCategoryItem } from "@/src/ui/components/CitiesGroupedByCategoryItem";
import { Divider } from "@/src/ui/components/Divider";
import { Screen } from "@/src/ui/components/Screen";
import { useAppTheme } from "@/src/ui/theme/useAppTheme";
import { useScrollToTop } from "@react-navigation/native";
import { useRef } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const { data: categories } = useCityFindGroupByCategory();
  const { spacing } = useAppTheme();
  const { top } = useSafeAreaInsets();

  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  function renderItem({ item }: ListRenderItemInfo<CityGroupByCategory>) {
    return <CitiesGroupedByCategoryItem {...item} />;
  }

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        ref={flatListRef}
        keyExtractor={item => item.category.id}
        contentContainerStyle={{
          paddingTop: top,
          paddingBottom: spacing.padding,
        }}
        ItemSeparatorComponent={() => <Divider paddingHorizontal="padding" />}
      />  
    </Screen>
  );
}
