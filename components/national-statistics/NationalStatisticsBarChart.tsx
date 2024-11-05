"use client";

import {
  BarElement,
  CategoryScale,
  Chart,
  ChartData,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { barChartOptions } from "../location/bar-chart.config";

type Props = {
  chartData: ChartData<"bar">;
};

Chart.register(BarElement, Tooltip, Title, LinearScale, CategoryScale);
/**
 *BarChart for the NationalStatistics UI
 * @param {object} chartData chartData to be consumed by the Bar comp in react-chartjs-2
 * @returns {ReactNode}
 */
const NationalStatisticsBarChart = ({ chartData }: Props) => {
  return (
    <div className="h-96 w-full m-auto px-4">
      {chartData && <Bar options={barChartOptions} data={chartData}></Bar>}
    </div>
  );
};

export default NationalStatisticsBarChart;
