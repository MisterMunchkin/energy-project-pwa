import { ENERGY_PRODUCTION_DATA } from "@/constants/energy-production-data.constants";
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

  const energyData = ENERGY_PRODUCTION_DATA.find(e => e.name === searchParams.get('state'));
  return NextResponse.json(energyData);
}
