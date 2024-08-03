'use client';

import { API_CONTROLLER } from '@/constants/controller-navigation.constants';
import { localService } from '@/services/local-service';
import { StateEnergyProductionType } from '@/types/energy-production.types';
import { StateType } from '@/types/state.type';
import { useEffect } from 'react';
// import { Chart, BarController, BarElement, Legend, Tooltip } from 'chart.js';

// Chart.register(BarController, BarElement, Legend, Tooltip);

type Props = {
  locationId: number
}
const LocationBarChart = ({locationId}: Props) => {
  useEffect(() => {
    const state = localService.getState(locationId);
    if (!state) 
      return;
    
    handleGetEnergyProduction(state);
  }, [locationId]);
  
  const handleGetEnergyProduction = async (state: StateType) => {
    const energyProduction = await getEnergyProduction(state);
    console.log(energyProduction);
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