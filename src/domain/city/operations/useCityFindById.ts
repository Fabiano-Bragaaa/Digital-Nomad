import { useFetchData } from "@/src/data/useFetchData";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";

export function useCityById(id:string) {
  const {city} = useRepository()
  return useFetchData(() => city.findById(id), [id])
}