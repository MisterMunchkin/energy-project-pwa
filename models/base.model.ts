/** Allows predicate funbctions so classes implementing this base type can
 * flexibly create their own filter conditions
 */
export type PredicateType<T> = (value: T, index: number, array: T[]) => unknown;

/**
 * The generic base model that interacts with the cache service.
 *
 * @param {string} TName name of the model implementing this base class. Required to create key/value records on the node-cache for each model
 */
export class BaseModel<T> {
  private TName: string;

  /**
   *Instantiates BaseModel
   * @param {string} modelName model name to be used as the key for its own node-cache object
   */
  constructor(modelName: string) {
    this.TName = modelName;

    //Initializes cache with TName as key and an empty array as the value.
    if (!global.serverCache.has(this.TName))
      global.serverCache.set(this.TName, new Array<T>());
  }

  /**
   * Populates the cache with the list of data based of the TName key.
   * @param {T[]} dataList list of generic data to populate to the cache
   */
  populate = (dataList: T[]) => {
    if (!global.serverCache.has(this.TName))
      throw new Error(`cache for ${this.TName} not initialized!!!`);

    global.serverCache.set(this.TName, dataList);
  };

  /**
   * Used to retrieve data from the node-cache within a model class.
   * @param {PredicateType<T>} filter predicate function used to filter the cachedData list
   * @returns {T[]} Returns generic T[] of filtered data
   */
  select = (filter?: PredicateType<T>) => {
    const cachedData = this.getCache();

    if (filter) return cachedData.filter(filter);

    return cachedData;
  };

  /**
   * Inserts generic item into the node cache for the specific model class.
   * @param {T} item generic item to insert into node-cache
   */
  insert = (item: T) => {
    const cachedData = this.getCache();
    cachedData.push(item);
    this.setCache(cachedData);
  };

  /**
   *
   * @ignore
   * @todo Should've made T where implements {id: string} to allow for editing or deleting
   * data within this base model
   */
  Obsoletedelete = (item: T) => {
    // const cachedData = this.getCache();
    // cachedData.findIndex(item)
    throw new Error("Not implemented");
  };

  private getCache = () => {
    if (!global.serverCache.has(this.TName))
      throw new Error(`cache for ${this.TName} not initialized!!!`);

    return global.serverCache.get(this.TName) as T[];
  };

  private setCache = (cachedData: T[]) => {
    if (!global.serverCache.has(this.TName))
      throw new Error(`cache for ${this.TName} not initialized!!!`);

    global.serverCache.set(this.TName, cachedData);
  };
}
