import { ChartData } from "chart.js";
import { EnergySourcesType } from "./energy-production.types";
import { backgroundColors } from "@/components/location/bar-chart.config";

export class LocationEnergyBarChartClass {
  totalWattHour: number;
  energySources: EnergySourcesType;
  sourceTypes: KeyOfEnergySources[];
  
  constructor(totalWattHour: number, energySources: EnergySourcesType) {
    this.totalWattHour = totalWattHour;
    this.energySources = energySources;

    this.sourceTypes = Object.keys(energySources) as KeyOfEnergySources[];
  }

  get chartData(): ChartData<'bar'> {
    return {
      labels: this.sourceTypes as string[],
      datasets: [
        {
          data: this.sourceTypes.map(type => this.getWattHourPer(type)),
          backgroundColor: backgroundColors,
          borderWidth: 1
        }
      ],
    }
  }

  private getWattHourPer(sourceType: KeyOfEnergySources) {
    const percentage = this.energySources[sourceType];
    const decimal = percentage / 100;
    return this.totalWattHour * decimal;
  }
}

type KeyOfEnergySources = keyof EnergySourcesType;
