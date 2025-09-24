import { useAppMutation } from "@/src/infra/operations/useAppMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { City } from "../City";

export function useCityToggleFavorite(params: Pick<City, "id" | "isFavorite">) {
  const { city } = useRepository();
  const [isFavorite, setIsFavorite] = useState(params.isFavorite);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsFavorite(params.isFavorite);
  }, [params.isFavorite]);

  function toggleFavorite() {
    setIsFavorite(!isFavorite);
    return city.toggleFavorite({
      cityId: params.id,
      isFavorite: params.isFavorite,
    });
  }

  const mutate = useAppMutation({
    mutateFn: toggleFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
    onError: () => {
      setIsFavorite(!isFavorite);
    }
  });

  return {
    ...mutate,
    isFavorite,
  };
}
