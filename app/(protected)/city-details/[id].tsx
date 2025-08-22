import { BottomSheet } from "@/src/components/BottomSheet";
import { Box } from "@/src/components/Box";
import { Divider } from "@/src/components/Divider";
import { Screen } from "@/src/components/Screen";
import { Text } from "@/src/components/Text";
import { CityDetailsHeader } from "@/src/containers/CityDetailsHeader";
import { CityDetailsInfo } from "@/src/containers/CityDetailsInfo";
import { CityDetailsMap } from "@/src/containers/CityDetailsMap";
import { CityDetailsRelatedCities } from "@/src/containers/CityDetailsRelatedCities";
import { CityDetailsTouristAttraction } from "@/src/containers/CityDetailsTouristAttraction";
import { useCityDetails } from "@/src/data/useCityDetails";
import { useLocalSearchParams } from "expo-router";
import { Pressable } from "react-native";
import MapView from "react-native-maps";
import { useSharedValue } from "react-native-reanimated";

export default function CityDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { city } = useCityDetails(id);
  const bottomSheetIsOpen = useSharedValue(false);

  function toggleBottomSheet() {
    bottomSheetIsOpen.value = !bottomSheetIsOpen.value;
  }

  if (!city) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>City not found</Text>
      </Box>
    );
  }

  return (
    <>
    <Screen style={{ paddingHorizontal: 0 }} scrollable>
      <CityDetailsHeader
        id={city.id}
        coverImage={city.coverImage}
        categories={city.categories}
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

      <CityDetailsRelatedCities />
    </Screen>
    <BottomSheet onPress={toggleBottomSheet} isOpen={bottomSheetIsOpen}>
    <Box borderRadius="default" overflow="hidden" width="100%" height={500}>
        <MapView style={{ width: "100%", height: "100%" }} initialRegion={{
          latitude: city.location.latitude,
          longitude: city.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}/>
        </Box>
    </BottomSheet>
    </>
  );
}
