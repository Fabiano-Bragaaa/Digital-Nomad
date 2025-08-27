import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useFetchData } from "../../../data/useFetchData";
import { CityFindAllFilters } from "../ICityRepo";

export function useCityFindAll(filters: CityFindAllFilters) {
  const {city} = useRepository()
  return useFetchData(
    () => city.findAll(filters),
    [filters.name, filters.categoryId]
  );
}