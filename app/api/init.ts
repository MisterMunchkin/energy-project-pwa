import { ENERGY_PRODUCTION_DATA } from "@/constants/energy-production-data.constants";
import { StateEnergyProductionModel } from "@/models/state-energy-production.model";

const initServerData = () => {
  console.log('intializing server data...');
  console.time('init');
  new StateEnergyProductionModel(ENERGY_PRODUCTION_DATA);
  console.timeEnd('init');
}

export default initServerData;