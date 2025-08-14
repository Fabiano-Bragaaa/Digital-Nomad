
import { CityCard } from '@/src/components/CityCard';
import { Screen } from '@/src/components/Screen';
import { Text } from '@/src/components/Text';
import { cityPreviewList } from '@/src/data/cities';
import { FlatList, ListRenderItemInfo, Text as RNText } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { CityPreview } from '@/src/types';

export default function HomeScreen() {

  function renderItem({item}:ListRenderItemInfo<CityPreview>){
    return <CityCard cityPreview={item}/>
  }

  return (
    <Screen>
      <Text variant='title28'>barcelona</Text>
      <RNText style={{color: '#fff', fontSize: 28}}>barcelona</RNText>
    <FlatList data={cityPreviewList} keyExtractor={item => item.id} renderItem={renderItem}/>
      </Screen>
  );
}

