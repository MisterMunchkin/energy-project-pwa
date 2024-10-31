import { StateEnergyProductionType } from "@/types/state-energy-production.types";
import { BaseModel, PredicateType } from "./base.model";

/**
 *Class instance of StateEnergyProduction data cached in node-cache. 
 extends BaseModel
 */
export class StateEnergyProductionModel extends BaseModel<StateEnergyProductionType> {
  /**
   * Instantiates model, name used as key for node-cache object values.
   */
  constructor() {
    super(StateEnergyProductionModel.name);
  }

  /**
   * Retrieves an array of Australian states.
   *
   * @returns retrieves an array of state names
   */
  getStates(): string[] {
    return this.select().map((data) => data.name);
  }

  /**
   * Like get except it will eiter return the Type object or null
   *
   * @returns retrieves a single StateEnergyProductionType object, if does not exist? returns null
   */
  find(
    filter?: PredicateType<StateEnergyProductionType>,
  ): StateEnergyProductionType | null {
    const dataList = this.select(filter);
    if (!dataList || dataList.length === 0) return null;

    return dataList[0];
  }
}
