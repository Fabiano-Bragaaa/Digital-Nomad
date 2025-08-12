import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function CityDetails() {
  const router = useRouter()
  const {id, name} = useLocalSearchParams()
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text onPress={router.back}>cityDetails {id} {name}</Text>
    </View>
  )
}