import { ChartData } from "chart.js";
import { EnergySourcesType } from "./state-energy-production.types";
import { energySourceBackgrounds } from "@/components/location/bar-chart.config";

type KeyOfEnergySources = keyof EnergySourcesType;

/**
    Utility class for the chart.js barchart. abstracts chart logic and data
    need to retrieve the LocationEnergy bar chart.

 *  @property {number} totalWattHour 
    @property {EnergySourcesType} energySources
    @property {KeyOfEnergySources[]} sourceTypes
 */
export class LocationEnergyBarChartClass {
  totalWattHour: number;
  energySources: EnergySourcesType;
  sourceTypes: KeyOfEnergySources[];

  /**
   * instantiates a PublicLeaderboardClass, if post is empty, instantiates an
   * empty class.
   * @param post Optional args to instantiate a PublicLeaderboardType
   * @returns void
   */
  constructor(totalWattHour: number, energySources: EnergySourcesType) {
    this.totalWattHour = totalWattHour;
    if (typeof energySources !== "object")
      throw new Error(`energySources is of type: ${typeof energySources}`);

    this.energySources = energySources;
    this.sourceTypes = Object.keys(energySources) as KeyOfEnergySources[];
  }

  /**
   * Chart data for a react-charts-2
   *
   * @returns object data consumed by react-charts-2 to create chart UI. Shows
   * a bar chart of the location statistics
   */
  get chartData(): ChartData<"bar"> {
    const sourceTypes = this.sourceTypes.sort();

    return {
      labels: sourceTypes as string[],
      datasets: [
        {
          data: sourceTypes.map((type) => this.getWattHourPer(type)),
          backgroundColor: energySourceBackgrounds,
          borderWidth: 2,
          borderRadius: 10,
          barThickness: "flex",
        },
      ],
    };
  }

  /**
   *
   * @param sourceType source type to get the watt hour from.
   * @returns Gets the total watt hour for the specific energy-source type
   */
  private getWattHourPer(sourceType: KeyOfEnergySources) {
    const percentage = this.energySources[sourceType];
    const decimal = percentage / 100;
    return this.totalWattHour * decimal;
  }
}
