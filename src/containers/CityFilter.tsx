import { ScrollView } from "react-native";
import { Box } from "../components/Box";
import { CategoryPill } from "../components/CategoryPill";
import { SearchInput } from "../components/SearchInput";
import { Category } from "../types";

type CityFilterProps = {
  categories?: Category[];
  cityName: string;
  onChangeCityName: (cityName: string) => void;
  selectedCategoryId: string | null;
  onChangeSelectedCategoryId: (selectedCategoryId: string | null) => void;
};

export function CityFilter({
  categories,
  cityName,
  onChangeCityName,
  onChangeSelectedCategoryId,
  selectedCategoryId,
}: CityFilterProps) {
  return (
    <Box>
      <Box paddingHorizontal="padding">
        <SearchInput
          value={cityName}
          onChangeText={onChangeCityName}
          placeholder="Qual o seu proximo destino?"
        />
      </Box>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Box mt="s16" gap="s8" flexDirection="row" paddingHorizontal="padding">
          {categories?.map(category => (
            <CategoryPill
              key={category.id}
              active={category.id === selectedCategoryId}
              category={category}
              onPress={() =>
                onChangeSelectedCategoryId(
                  category.id === selectedCategoryId ? null : category.id
                )
              }
            />
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
}
