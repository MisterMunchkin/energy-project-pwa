import { ENERGY_PRODUCTION_DATA } from "@/constants/energy-production-data.constants";
import { StateEnergyProductionModel } from "@/models/state-energy-production.model";
import NodeCache, { Options } from "node-cache";


const initServerData = () => {
  console.log('intializing server data...');
  console.time('init');
  
  initNodeCache();
  populateModels();

  console.timeEnd('init');
}

const initNodeCache = () => {
  console.log('initializing node cache...');
  const config: Options = {
    useClones: true, //clone data instead of reference
    stdTTL: 0, //keep for unlimited.
  }
  global.serverCache = new NodeCache(config);
}

const populateModels = () => {
  console.log('populating models...');
  new StateEnergyProductionModel()
  .populate(ENERGY_PRODUCTION_DATA);
}
export default initServerData;