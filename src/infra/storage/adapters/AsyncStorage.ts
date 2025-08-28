import AsyncStorage from "@react-native-async-storage/async-storage";
import { IStorage } from "../IStorage";

async function getItem<TData>(key: string): Promise<TData | null> {
  const item = await AsyncStorage.getItem(key)
  if(!item) return null
  return JSON.parse(item)
}

async function setItem(key: string, value: any): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value))
}

async function removeItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key)
}

export const asyncStorage:IStorage = {
  getItem,
  setItem,
  removeItem
}