export type PredicateType<T> = (value: T, index: number, array: T[]) => unknown;
export class BaseModel<T> {
  private TName: string;

  constructor(modelName: string) {
    this.TName = modelName;
    
    //Initializes cache with TName as key and an empty array as the value.
    if (!global.serverCache.has(this.TName)) 
      global.serverCache.set(this.TName, new Array<T>());
  }

  populate = (dataList: T[]) => {
    if (!global.serverCache.has(this.TName))
      throw new Error(`cache for ${this.TName} not initialized!!!`);
    
    global.serverCache.set(this.TName, dataList);
  }
  
  select = (filter?: PredicateType<T>) => {
    const cachedData = this.getCache();
    
    if (filter)
      return cachedData.filter(filter);

    return cachedData;
  }

  insert = (item: T) => {
    const cachedData = this.getCache();
    cachedData.push(item);
    this.setCache(cachedData);
  }
  
  private getCache = () => {
    if (!global.serverCache.has(this.TName))
      throw new Error(`cache for ${this.TName} not initialized!!!`);

    return global.serverCache.get(this.TName) as T[];
  }

  private setCache = (cachedData: T[]) => {
    if (!global.serverCache.has(this.TName))
      throw new Error(`cache for ${this.TName} not initialized!!!`);

    global.serverCache.set(this.TName, cachedData);
  }
}
