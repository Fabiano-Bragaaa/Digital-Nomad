import { useAppQuery } from "@/src/infra/operations/useAppQuery";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";

export function useCityById(id:string) {
  const {city} = useRepository()
  return useAppQuery({
    queryKey: ["city", id],
    fetchData: () => city.findById(id),
  });
}