import { energySourceBackgrounds } from "@/components/location/bar-chart.config";
import { ChartData } from "chart.js";

/**
 * Used for the National Statistic feature. The feature displays a bar chart
 * of the total national WHS per each energy source per day.
 *
 * @property {number} wind
 * @property {number} solar
 * @property {number} gas
 * @property {number} coal
 */
export type NationalStatisticsType = {
  totalWHSPerDayPer: {
    wind: number;
    solar: number;
    gas: number;
    coal: number;
  };
};

/**
 * Utility class for national statistics data.
 * @property {{wind: number, solar: number, gas: number, coal: number}} totalWHSPerDayPer An object that has the total WHS per day per
 * each type of energy source
 */
export class NationalStatisticsClass implements NationalStatisticsType {
  totalWHSPerDayPer: {
    wind: number;
    solar: number;
    gas: number;
    coal: number;
  };

  /**
   *constructor to instantiate the total national WHS per day for each energy source
   * @param param0 coal wind solar and gas energy sources to populate in this instantiation
   */
  constructor({
    totalWHSPerDayPer: { coal, wind, solar, gas },
  }: NationalStatisticsType) {
    this.totalWHSPerDayPer = {
      coal,
      wind,
      solar,
      gas,
    };
  }

  /**
   * Total WHS of the Nation
   * @returns summation of wind solar gas and coal
   */
  get totalWHSOfTheNation(): number {
    const { wind, solar, gas, coal } = this.totalWHSPerDayPer;
    return wind + solar + gas + coal;
  }

  /**
   * Chart data for a react-charts-2
   *
   * @returns object data consumed by react-charts-2 to create chart UI. Shows
   * a bar chart of the national statistics
   */
  get chartData(): ChartData<"bar"> {
    return {
      labels: Object.keys(this.totalWHSPerDayPer) as string[],
      datasets: [
        {
          data: Object.values(this.totalWHSPerDayPer),
          backgroundColor: energySourceBackgrounds,
          borderWidth: 2,
          borderRadius: 10,
          barThickness: "flex",
        },
      ],
    };
  }
}
