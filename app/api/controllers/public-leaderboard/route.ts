import { API_PUBLIC_LEADERBOARD, LOCATION_DETAILS, RevalidatePath } from "@/constants/controller-navigation.constants";
import { PublicLeaderboardModel } from "@/models/public-leaderboard.model";
import { StateEnergyProductionModel } from "@/models/state-energy-production.model";
import { LocationType } from "@/types/location.type";
import { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * The required argument for the public leaderboard POST request
 * 
 * @property {string} name The name of the public leaderboard post
 * @property {LocationType} location the location of the post
 */
export type PublicLeaderboardPostArgs = {
  name: string;
  location: LocationType
}
export async function POST(
  req: NextRequest
) {
  if (!req.url)
    return NextResponse.json({}, {status: 400, statusText: 'invalid URL'});
  
  const {
    location,
    name
  } = await req.json() as PublicLeaderboardPostArgs;

  if (!location || !name) {
    return NextResponse.json({
      requestedLocation: location,
      requestName: name
    }, {status: 500, statusText: 'location and name are required'});
  }

  const stateProduction = new StateEnergyProductionModel()
    .find(item => item.name === location.state)
  
  if (!stateProduction)
    return NextResponse.json({}, {status: 500, statusText: 'Could not find valid state for the location requested. state: ' + location.state});

  const newPost = new PublicLeaderboardModel()
  .post(
    location,
    stateProduction,
    name
  );
  
  //TODO: revalidatePath not working on Nextjs 14
  // const path = req.nextUrl.searchParams.get('path-to-revalidate');
  // const revalidateResponse = {
  //   revalidated: true,
  //   now: Date.now(),
  //   message: ""
  // };

  // if (path) {
  //   revalidatePath(path, "page");
  // } else {
  //   revalidateResponse.revalidated = false;
  //   revalidateResponse.message = "Missing path to revalidate";
  // }

  // return NextResponse.json(revalidateResponse);
  return NextResponse.json(newPost);
}

export async function GET(
  req: NextApiRequest
) {
  if (!req.url)
    return NextResponse.json({}, {status: 400, statusText: 'invalid URL'});

  const leaderBoard = new PublicLeaderboardModel()
  .getSortedLeaderboard();

  return NextResponse.json(leaderBoard, {status: 200});
}