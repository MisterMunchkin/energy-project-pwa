import { ApplianceModel } from "@/models/appliance.model";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export function GET(
  req: NextApiRequest,
) {
  if (!req.url) 
    return NextResponse.json({}, {status: 400, statusText: 'invalid URL'});

  const appliances = new ApplianceModel()
    .select();
  return Response.json(appliances);
}