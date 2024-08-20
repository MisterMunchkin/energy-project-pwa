
type PredicateType<T> = (value: T, index: number, array: T[]) => unknown;
export abstract class BaseModel<T> {
  populate = (dataList: T[]) => {
    this.data = dataList.map(data => this.clone(data));
  }
  
  select = (filter?: PredicateType<T>) => {
    if (!this.data)
      throw new Error(this.errMessages.notPopulated);
    
    if (filter)
      return this.data.filter(filter);

    return this.data;
  }
  
  insert = (entry: T) => {
    if (!this.data)
      throw new Error(this.errMessages.notPopulated);
    
    this.data.push(this.clone(entry));
  }
  
  clone = (data: T) => {
    return Object.assign(Object.create(Object.getPrototypeOf(data)), data)
  }
  
  private data: T[] | null = null;
  private readonly errMessages = {
    notPopulated: `Data mode of type ${typeof this.data} has not been populated`
  };
}