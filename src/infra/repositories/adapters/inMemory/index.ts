import { Repositories } from "@/src/domain/Repositories";
import { InMemoryAuthRepo } from "./inMemoryAuthRepo";
import { inMemoryCategoryRepo } from "./inMemoryCategoryRepo";
import { inMemoryCityRepo } from "./inMemoryCityRepo";

export const inMemoryRepository:Repositories = {
  city:new inMemoryCityRepo(),
  category:new inMemoryCategoryRepo(),
  auth:new InMemoryAuthRepo()
}