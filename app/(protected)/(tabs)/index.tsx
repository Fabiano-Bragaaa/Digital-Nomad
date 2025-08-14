import { CityCard } from "@/src/components/CityCard";
import { Icon } from "@/src/components/Icon";
import { Screen } from "@/src/components/Screen";
import { cityPreviewList } from "@/src/data/cities";
import { FlatList, ListRenderItemInfo, Text as RNText } from "react-native";

import { useAppTheme } from "@/src/theme/useAppTheme";
import { CityPreview } from "@/src/types";
import { useScrollToTop } from "@react-navigation/native";
import { useRef } from "react";

export default function HomeScreen() {
  const {spacing} = useAppTheme()
  const flatListRef = useRef(null)
  useScrollToTop(flatListRef)
  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return <CityCard cityPreview={item} />;
  }


  return (
    <Screen>
      <Icon name="Logout" />
      <RNText style={{ color: "#fff", fontSize: 28 }}>barcelona</RNText>
      <FlatList
        data={cityPreviewList}
        ref={flatListRef}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{gap: spacing.padding}}
      />
    </Screen>
  );
}
