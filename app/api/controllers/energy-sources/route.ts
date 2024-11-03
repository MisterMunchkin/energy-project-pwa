import { StateEnergyProductionModel } from "@/models/state-energy-production.model";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

/**
 * Get energy sources for a specific state
 *
 * @param req NextApiRequest
 * @returns NextResponse
 */
export function GET(req: NextApiRequest) {
  if (!req.url)
    return NextResponse.json({}, { status: 400, statusText: "invalid URL" });

  const requestUrl = new URL(`${req.url}`);
  const { searchParams } = requestUrl;
  if (!searchParams.has("state"))
    return NextResponse.json(
      {},
      { status: 400, statusText: "State does not exist" },
    );

  const energyData = new StateEnergyProductionModel().find(
    (e) => e.name === searchParams.get("state"),
  );

  return NextResponse.json(energyData);
}
