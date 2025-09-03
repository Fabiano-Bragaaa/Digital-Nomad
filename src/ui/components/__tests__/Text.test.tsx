import { renderComponent } from "@/src/test-utils/renderComponent"
import { screen } from "@testing-library/react-native"
import { Text } from "../Text"

describe("<Text />", () => {
  it('should render the text', () => {
    renderComponent(<Text>Hello</Text>)
    expect(screen.getByText('Hello')).toBeOnTheScreen()
  })
})