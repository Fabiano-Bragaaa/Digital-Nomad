jest.mock('@expo/vector-icons/createIconSetFromIcoMoon', () => {

  const { View } = require('react-native')

  function FakeIcon() {
    return <View testID="fake-icon"/>
  }

  return () => FakeIcon
})