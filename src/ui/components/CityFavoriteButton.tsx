import { City } from "@/src/domain/city/City";
import { useCityToggleFavorite } from "@/src/domain/city/operations/useCityToggleFavorite";
import { TouchableOpacityBox } from "./Box";
import { Icon } from "./Icon";

export function CityFavoriteButton({id, isFavorite, size}:Pick<City, "id" | "isFavorite"> & {size?: number}) {
  const {  mutate, isFavorite: favorite } = useCityToggleFavorite({ id, isFavorite });
  return (
    <TouchableOpacityBox
    onPress={() =>
      mutate({cityId: id, isFavorite: false})
    }>
    <Icon
      name={
        favorite ? "Favorite-fill" : "Favorite-outline"
      }
      color={favorite ? "primary" : "text"}
      size={size}
    />
  </TouchableOpacityBox>
  );
}