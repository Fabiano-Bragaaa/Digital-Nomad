import { useAppQuery } from "@/src/infra/operations/useAppQuery";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";

export function useCityFindAllFavorites() {
  const { city } = useRepository();

  return useAppQuery({
    queryKey: ["cities", "favorites"],
    fetchData:city.findAllFavorites,
  });
}
