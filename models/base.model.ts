import { StateEnergyProductionModel } from "./state-energy-production.model";

export type PredicateType<T> = (value: T, index: number, array: T[]) => unknown;
type ModelType = typeof StateEnergyProductionModel;
export class BaseModel<T> {
  data: T[] | null = null;

  populate = (dataList: T[]) => {
    this.data = dataList.map(data => this.clone(data));
  }
  
  select = (filter?: PredicateType<T>) => {
    if (!this.data)
      throw new Error('this.errMessages.notPopulated');
    
    if (filter)
      return this.data.filter(filter);

    return this.data;
  }
  
  // static insert = <U>(entry: U) => {
  //   if (!this.data)
  //     throw new Error(this.errMessages.notPopulated);
    
  //   this.data.push(this.clone(entry));
  // }
  
  clone = (data: T) => {
    return Object.assign(Object.create(Object.getPrototypeOf(data)), data)
  }

  // static readonly errMessages = {
  //   notPopulated: `Data model has not been populated`
  // };
}
