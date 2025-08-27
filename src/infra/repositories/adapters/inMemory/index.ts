import { Repositories } from "@/src/domain/Repositories";
import { inMemoryCityRepo } from "./inMemoryCityRepo";

export const inMemoryRepository:Repositories = {
  city:new inMemoryCityRepo()
}