import { ENERGY_PRODUCTION_DATA } from "@/constants/energy-production-data.constants";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export function GET(
  req: NextApiRequest
) {
  if (!req.url)
    return NextResponse.json({}, {status: 400, statusText: 'invalid URL'});

  const states = ENERGY_PRODUCTION_DATA.map(e => e.name);
  return NextResponse.json(states);
}