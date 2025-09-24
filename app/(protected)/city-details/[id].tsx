import { useCityById } from "@/src/domain/city/operations/useCityFindById";
import { Box } from "@/src/ui/components/Box";
import { Divider } from "@/src/ui/components/Divider";
import { Screen } from "@/src/ui/components/Screen";
import { Text } from "@/src/ui/components/Text";
import { BottomSheetMap } from "@/src/ui/containers/BottomSheetMap";
import { CityDetailsHeader } from "@/src/ui/containers/CityDetailsHeader";
import { CityDetailsInfo } from "@/src/ui/containers/CityDetailsInfo";
import { CityDetailsMap } from "@/src/ui/containers/CityDetailsMap";
import { CityDetailsRelatedCities } from "@/src/ui/containers/CityDetailsRelatedCities";
import { CityDetailsTouristAttraction } from "@/src/ui/containers/CityDetailsTouristAttraction";
import { useLocalSearchParams } from "expo-router";
import { Pressable } from "react-native";
import Animated, { FadeIn, useSharedValue } from "react-native-reanimated";

const PAGE_ANIMATION_TIME = 1000

export default function CityDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: city, isLoading, error} = useCityById(id);
  const bottomSheetIsOpen = useSharedValue(false);

  function toggleBottomSheet() {
    bottomSheetIsOpen.value = !bottomSheetIsOpen.value;
  }

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (error || !city) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>City not found</Text>
      </Box>
    );
  }

  return (
    <>
      <Screen style={{ paddingHorizontal: 0 }} scrollable>
        <Animated.View entering={FadeIn.duration(PAGE_ANIMATION_TIME)}>
        <CityDetailsHeader
          id={city.id}
          coverImage={city.coverImage}
          categories={city.categories}
          isFavorite={city.isFavorite}
        />
        <CityDetailsInfo
          name={city.name}
          country={city.country}
          description={city.description}
        />
        <Divider paddingHorizontal="padding" />

        <CityDetailsTouristAttraction
          touristAttractions={city.touristAttractions}
        />
        <Divider paddingHorizontal="padding" />

        <Pressable onPress={toggleBottomSheet}>
          <CityDetailsMap location={city.location} />
        </Pressable>
        <Divider paddingHorizontal="padding" />

        <CityDetailsRelatedCities id={city.id} />
        </Animated.View>
      </Screen>
      <Animated.View entering={FadeIn.duration(0).delay(PAGE_ANIMATION_TIME)}>
      <BottomSheetMap
        location={city.location}
        onPress={toggleBottomSheet}
        isOpen={bottomSheetIsOpen}
      />
      </Animated.View>
    </>
  );
}
