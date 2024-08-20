import { ChartData } from "chart.js";
import { EnergySourcesType } from "./state-energy-production.types";
import { energySourceBackgrounds } from "@/components/location/bar-chart.config";

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
    const sourceTypes = this.sourceTypes.sort();

    return {
      labels: sourceTypes as string[],
      datasets: [
        {
          data: sourceTypes.map(type => this.getWattHourPer(type)),
          backgroundColor: energySourceBackgrounds,
          borderWidth: 2,
          borderRadius: 10,
          barThickness: "flex"
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
