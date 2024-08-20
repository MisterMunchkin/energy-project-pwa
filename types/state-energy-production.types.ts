/**
 * Percentages of wind, solar, gas, coal for a given state.
 */
export type EnergySourcesType = {
  wind: number;
  solar: number;
  gas: number;
  coal: number;
}

export type StateEnergyProductionType = {
  name: string;
  energySources: EnergySourcesType;
}