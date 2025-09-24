import { CityPreview } from "@/src/domain/city/City";
import { useCityFindAllFavorites } from "@/src/domain/city/operations/useCityFindAllFavorites";
import { FlatList, FlatListProps, ListRenderItemInfo } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FavoriteCityCard } from "../../components/FavoriteCityCard";
import { Text } from "../../components/Text";
import { useAppTheme } from "../../theme/useAppTheme";

export function FavoriteCityList({ListFooterComponent, ListHeaderComponent}: Pick<
  FlatListProps<CityPreview>,
 'ListFooterComponent'
 | 'ListHeaderComponent'
>) {
  const { data: favoriteList } = useCityFindAllFavorites();
  const { spacing } = useAppTheme();
  const { top } = useSafeAreaInsets();

  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return <FavoriteCityCard cityPreview={item} />;
  }

  return (
    <FlatList
      data={favoriteList}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={<Text>Nenhuma cidade favorita</Text>}
      contentContainerStyle={{
        gap: spacing.s16,
        paddingTop: top,
        paddingBottom: spacing.padding,
      }}
    />
  );
}
