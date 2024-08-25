import { StateEnergyProductionModel } from "@/models/state-energy-production.model";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export function GET(
  req: NextApiRequest
) {
  if (!req.url) 
    return NextResponse.json({}, {status: 400, statusText: 'invalid URL'});

  const requestUrl = new URL(`${req.url}`);
  const {searchParams} = requestUrl;
  if (!searchParams.has('state'))
    return NextResponse.json({}, {status: 500, statusText: 'State does not exist'});

  // const energyData = ENERGY_PRODUCTION_DATA.find(e => e.name === searchParams.get('state'));
  const energyData = StateEnergyProductionModel.get(e => e.name === searchParams.get('state'));
  console.log(energyData);
  return NextResponse.json(energyData);
}
