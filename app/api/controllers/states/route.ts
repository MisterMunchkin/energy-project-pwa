import { StateEnergyProductionModel } from "@/models/state-energy-production.model";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

/**
 * GET request for states
 * @param {NextApiRequest} req
 * @returns {NextResponse}
 */
export function GET(req: NextApiRequest) {
  if (!req.url)
    return NextResponse.json({}, { status: 400, statusText: "invalid URL" });

  const states = new StateEnergyProductionModel().getStates();
  return NextResponse.json(states);
}
