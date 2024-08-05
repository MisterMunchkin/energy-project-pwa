import { EnergySourcesType } from "./energy-production.types";

export class LocationEnergyBarChartClass {
  totalWattHour: number;
  energySources: EnergySourcesType;
  sourceTypes: KeyOfEnergySources[];
  
  constructor(totalWattHour: number, energySources: EnergySourcesType) {
    this.totalWattHour = totalWattHour;
    this.energySources = energySources;

    this.sourceTypes = Object.keys(energySources) as KeyOfEnergySources[];
  }

  get chartData(): LocationEnergyBarChartType[] {
    const chartData = this.sourceTypes.map(type => {
      return {
        source: type,
        wattHourPer: this.getWattHourPer(type)
      } as LocationEnergyBarChartType
    });

    return chartData;
  }

  private getWattHourPer(sourceType: KeyOfEnergySources) {
    const percentage = this.energySources[sourceType];
    const decimal = percentage / 100;
    return this.totalWattHour * decimal;
  }
}

type KeyOfEnergySources = keyof EnergySourcesType;
type LocationEnergyBarChartType = {
  source: string;
  wattHourPer: number;
}