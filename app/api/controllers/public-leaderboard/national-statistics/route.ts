import { PublicLeaderboardModel } from "@/models/public-leaderboard.model";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest
) {
  if (!req.url)
    return NextResponse.json({}, {status: 400, statusText: 'invalid URL'});

  const stats = new PublicLeaderboardModel()
  .nationalStatistics();

  return NextResponse.json(stats);
}