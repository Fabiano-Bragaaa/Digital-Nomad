import { renderComponent } from "@/src/test-utils/renderComponent"
import { fireEvent, screen } from "@testing-library/react-native"
import { Button } from "../Button"

describe("<Button />", () => {
  it('should call the onPress function when the button is pressed', () => {

    const onPress = jest.fn()

    renderComponent(<Button title="button-title" onPress={onPress}/>)

    fireEvent.press(screen.getByText('button-title'))
    expect(onPress).toHaveBeenCalled()
  })
  it('should not call the onPress function when the button is disabled', () => {
    const onPress = jest.fn()

    renderComponent(<Button title="button-title" onPress={onPress} disabled/>)

    fireEvent.press(screen.getByText('button-title'))
    expect(onPress).not.toHaveBeenCalled()
  })
})