export interface IStorage {
  setItem(key: string, value: any): Promise<void>;
  getItem<TData>(key: string): Promise<TData | null>;
  removeItem(key: string): Promise<void>;
}