import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function ExploreScreen() {
  const router = useRouter()
  return (
       <View>
         <Text onPress={() => router.navigate({
          pathname: '/city-details/[id]',
          params:{
            id: '1',
            name: 'fabiano'
          }
         })}>navegar para detalhes</Text>
        </View>
  );
}


