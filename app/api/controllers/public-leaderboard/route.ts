import { LocationType } from "@/types/location.type";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  if (!req.url)
    return NextResponse.json({}, {status: 400, statusText: 'invalid URL'});
  
  const data = await req.json() as LocationType;
  console.log(data);

  return NextResponse.json({}, {status: 200});
}