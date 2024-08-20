import { StateEnergyProductionType } from "@/types/state-energy-production.types";
import { BaseModel } from "./base.model";

export class StateEnergyProductionModel extends BaseModel<StateEnergyProductionType> {

  constructor(stateEnergyProductions: StateEnergyProductionType[]) {
    super();
    this.populate(stateEnergyProductions);
  }
}


