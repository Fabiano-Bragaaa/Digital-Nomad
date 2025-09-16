import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useQuery } from "@tanstack/react-query";
import { CityFindAllFilters } from "../ICityRepo";

export function useCityFindAll(filters: CityFindAllFilters) {
  const { city } = useRepository();

  const { data, error, isPending } = useQuery({
    queryKey: ["cities", filters],
    queryFn: () => city.findAll(filters),
  });

  return { data, error, isPending };
}
