import { ChartOptions } from "chart.js";

// The following colors will be used sequentially for the chart bars
export const energySourceBackgrounds = [
  "#fe7a83", //coal
  "#0af693", //gas
  "#fea800", //solar
  "#6200FF", //wind
];

/**
 * Default options for bar charts
 */
export const barChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Total usage per energy source",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
  },
};
