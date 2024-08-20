import { StateEnergyProductionType } from "@/types/state-energy-production.types";


export const ENERGY_PRODUCTION_DATA: StateEnergyProductionType[] = [
  { 
    "name": "New South Wales", 
    "energySources": { 
      "wind": 12, 
      "solar": 15, 
      "gas": 25, 
      "coal": 48 
    } 
  }, 
  { 
    "name": "Victoria", 
    "energySources": { 
      "wind": 20, 
      "solar": 22, 
      "gas": 30, 
      "coal": 28 
    } 
  }, 
  { 
    "name": "Queensland", 
    "energySources": { 
      "wind": 10, 
      "solar": 20, 
      "gas": 25, 
      "coal": 45 
    } 
  }, 
  { 
    "name": "Western Australia", 
    "energySources": { 
        "wind": 15, 
        "solar": 20, 
        "gas": 35, 
        "coal": 30 
    } 
  }, 
  { 
    "name": "South Australia", 
    "energySources": { 
        "wind": 40, 
        "solar": 30, 
        "gas": 20, 
        "coal": 10 
    } 
  }, 
  { 
    "name": "Tasmania", 
    "energySources": { 
        "wind": 60, 
        "solar": 20, 
        "gas": 10, 
        "coal": 10 
    } 
  }, 
  { 
    "name": "Australian Capital Territory", 
    "energySources": { 
        "wind": 30, 
        "solar": 40, 
        "gas": 20, 
        "coal": 10 
    } 
  }, 
  { 
    "name": "Northern Territory", 
    "energySources": { 
        "wind": 20, 
        "solar": 30, 
        "gas": 40, 
        "coal": 10 
    } 
  } 
]