import { Accordion } from "../components/Accordion";
import { Box } from "../components/Box";
import { Text } from "../components/Text";
import { City } from "../domain/city/City";

type CityDetailsTouristAttractionProps = Pick<City, "touristAttractions">;

export function CityDetailsTouristAttraction({
  touristAttractions,
}: CityDetailsTouristAttractionProps) {
  return (
    <Box padding="padding">
      <Text variant="title22" mb="s8">Pontos turísticos</Text>
      <Box gap="s8">
      {touristAttractions.map((attaction) => (
        <Accordion title={attaction.name} description={attaction.description} key={attaction.id}/>
      ))}
      </Box>
    </Box>
  );
}
