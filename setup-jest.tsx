jest.mock('@expo/vector-icons/createIconSetFromIcoMoon', () => {

  const { View } = require('react-native')

  function FakeIcon(props:any) {
    return <View testID={props.name}/>
  }

  return () => FakeIcon
})