"use client";

import { localService } from "@/services/local-service";

import { LocationEnergyBarChartClass } from "@/types/location-energy-bar-chart.type";
import { LocationStatsType } from "@/types/location.type";
import { StateType } from "@/types/state.type";
import { useEffect, useState } from "react";
import {
  Chart,
  BarElement,
  Tooltip,
  ChartData,
  Title,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { barChartOptions } from "./bar-chart.config";
import Services from "@/services/services";

Chart.register(BarElement, Tooltip, Title, LinearScale, CategoryScale);

type Props = {
  locationId: string;
};
/**
 * Renderrs the barchart UI for a location within the local storage
 * @param locationId location id to retrieve location from the local storage service
 * @returns
 */
const LocationBarChart = ({ locationId }: Props) => {
  const [chartData, setChartData] = useState<ChartData<"bar">>();

  useEffect(() => {
    const stats = localService.getLocationStats(locationId);
    const state = localService.getState(locationId);
    if (!state) {
      console.error(`State for location id ${locationId} does not exist`);
      return;
    }
    if (!stats) {
      console.error(`Stats for location id ${locationId} does not exist`);
      return;
    }

    getChartData(stats, state);
  }, [locationId]);

  const getChartData = async (
    { totalWHSPerDay }: LocationStatsType,
    state: StateType,
  ) => {
    const { energySources } = await Services.getEnergyProduction(state);
    const chartClass = new LocationEnergyBarChartClass(
      totalWHSPerDay,
      energySources,
    );

    setChartData(chartClass.chartData);
  };

  return (
    <div className="h-96 w-full m-auto px-4">
      {chartData && <Bar options={barChartOptions} data={chartData}></Bar>}
    </div>
  );
};

export default LocationBarChart;
