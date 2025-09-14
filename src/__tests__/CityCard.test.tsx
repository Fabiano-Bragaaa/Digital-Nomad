import { screen } from "@testing-library/react-native"
import { renderComponent } from "../test-utils/renderComponent"
import { CityCard } from "../ui/components/CityCard"

describe("<CityCard />", () => {
  it('should display the city country', () => {
    renderComponent(<CityCard cityPreview={{
      id: '1',
      name: 'City 1',
      country: 'Country 1',
      coverImage: 'https://via.placeholder.com/150',
    }}/>)

    expect(screen.getByText('Country 1')).toBeOnTheScreen()
  })
})