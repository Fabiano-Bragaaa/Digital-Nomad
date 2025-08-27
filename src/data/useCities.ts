import { CityFilters, supabaseCityRepo } from "../supabase/supabaseService";
import { useFetchData } from "./useFetchData";

export function useCities(filters: CityFilters) {
  return useFetchData(
    () => supabaseCityRepo.findAll(filters),
    [filters.name, filters.categoryId]
  );
}
