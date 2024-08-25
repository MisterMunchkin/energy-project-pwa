import { StateEnergyProductionType } from "@/types/state-energy-production.types";
import { BaseModel, PredicateType } from "./base.model";

export class StateEnergyProductionModel {
  // maybe best to use an object instead...
  private static store: BaseModel<StateEnergyProductionType>;

  constructor(stateEnergyProductions: StateEnergyProductionType[]) {
    StateEnergyProductionModel.store = new BaseModel();
    StateEnergyProductionModel.store.populate(stateEnergyProductions);
  }

  static getStates(): string[] {
    return this.store.select().map(data => data.name);
  }

  static get(filter?: PredicateType<StateEnergyProductionType>) {
    return this.store.select(filter);
  }
}


