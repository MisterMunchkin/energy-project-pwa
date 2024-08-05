'use client';

import { API_CONTROLLER } from '@/constants/controller-navigation.constants';
import { localService } from '@/services/local-service';
import { StateEnergyProductionType } from '@/types/energy-production.types';
import { LocationEnergyBarChartClass } from '@/types/location-energy-bar-chart.type';
import { LocationStatsType } from '@/types/location.type';
import { StateType } from '@/types/state.type';
import { useEffect } from 'react';
// import { Chart, BarController, BarElement, Legend, Tooltip } from 'chart.js';

// Chart.register(BarController, BarElement, Legend, Tooltip);

type Props = {
  locationId: number
}
const LocationBarChart = ({locationId}: Props) => {
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

  const getChartData = async ({totalWHSPerDay}: LocationStatsType, state: StateType) => {
    const {energySources} = await getEnergyProduction(state);
    const chartClass = new LocationEnergyBarChartClass(totalWHSPerDay, energySources);
    console.log(energySources);
    console.log(chartClass.chartData);
  }
  
  return (
    <p>This is a location bar chart.</p>
  );
}

export default LocationBarChart;

const getEnergyProduction = async (state: StateType) => {
  const searchParams = new URLSearchParams({
    state
  });

  const reqUrl = `${API_CONTROLLER}energy-sources?${searchParams}`;
  const res = await fetch(reqUrl, {
    method: 'GET',
  });

  if (!res.ok) 
    console.error('energy-sources API threw an error', res.status);

  const energyProduction = await res.json() as StateEnergyProductionType;
  return energyProduction;
}