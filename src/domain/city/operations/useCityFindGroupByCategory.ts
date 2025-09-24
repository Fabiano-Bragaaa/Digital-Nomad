import { useAppQuery } from "@/src/infra/operations/useAppQuery";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";

export function useCityFindGroupByCategory() {
  const { city } = useRepository();

  return useAppQuery({
    queryKey: ["cities", "category-group"],
    fetchData: () => city.findGroupByCategory(),
  });
}
