import MapView from "react-native-maps";
import { Box } from "../components/Box";
import { Text } from "../components/Text";
import { City } from "../types";

type CityDetailsMapProps = Pick<City, "location">;

export function CityDetailsMap({location}: CityDetailsMapProps) {
  return (
    <Box padding="padding">
        <Text variant="title22" mb="s16">Mapa</Text>
        <Box borderRadius="default" overflow="hidden" width="100%" height={200}>
        <MapView style={{ width: "100%", height: "100%" }} initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}/>
        </Box>
    </Box>
  );
}


