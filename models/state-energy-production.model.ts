import { StateEnergyProductionType } from "@/types/state-energy-production.types";
import { BaseModel, PredicateType } from "./base.model";

export class StateEnergyProductionModel extends BaseModel<StateEnergyProductionType> {
  constructor() {
    super(StateEnergyProductionModel.name);
  }

  /**
   * Retrieves an array of Australian states.
   */
  getStates(): string[] {
    return this.select().map(data => data.name);
  }

  /**
   * Like get except it will eiter return the Type object or null
   */
  find(filter?: PredicateType<StateEnergyProductionType>): StateEnergyProductionType | null {
    const dataList = this.select(filter);
    if (!dataList || dataList.length === 0)
      return null;

    return dataList[0];
  }
}


