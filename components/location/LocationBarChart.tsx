'use client';

import { API_CONTROLLER } from '@/constants/controller-navigation.constants';
import { localService } from '@/services/local-service';
import { StateEnergyProductionType } from '@/types/energy-production.types';
import { LocationEnergyBarChartClass } from '@/types/location-energy-bar-chart.type';
import { LocationStatsType } from '@/types/location.type';
import { StateType } from '@/types/state.type';
import { useEffect, useState } from 'react';
import { Chart, BarElement, Tooltip, ChartData, Title, LinearScale, CategoryScale, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(
  BarElement,
  Tooltip,
  Title,
  LinearScale,
  CategoryScale,
)

type Props = {
  locationId: number
}
const LocationBarChart = ({locationId}: Props) => {
  const [ chartData, setChartData ] = useState<ChartData<'bar'>>();

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
    
    setChartData(chartClass.chartData);
  }
  
  return (
    <div className='h-96 w-full m-auto px-4'>
      {chartData && (
        <Bar options={options} data={chartData}></Bar>
      )}
    </div>
  );
}

const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Total usage per energy source'
    }
  }
};

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