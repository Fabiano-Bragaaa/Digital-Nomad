
import { CityCard } from '@/src/components/CityCard';
import { Icon } from '@/src/components/Icon';
import { Screen } from '@/src/components/Screen';
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
      <Icon name='Logout' />
      <RNText style={{color: '#fff', fontSize: 28}}>barcelona</RNText>
    <FlatList data={cityPreviewList} keyExtractor={item => item.id} renderItem={renderItem}/>
      </Screen>
  );
}



