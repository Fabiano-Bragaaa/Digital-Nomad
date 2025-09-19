import { useAppMutation } from "@/src/infra/operations/useAppMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";

export function useCityToggeFavorite() {
  const {city} = useRepository()

  return useAppMutation({
    mutateFn: city.toggleFavorite,
  })
}