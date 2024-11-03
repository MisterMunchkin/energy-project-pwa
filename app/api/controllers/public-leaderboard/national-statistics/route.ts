import { PublicLeaderboardModel } from "@/models/public-leaderboard.model";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

/**
 * GET request for retrieving national statistics
 * @param req NextApiRequest
 * @returns NextResponse
 */
export async function GET(req: NextApiRequest) {
  if (!req.url)
    return NextResponse.json({}, { status: 400, statusText: "invalid URL" });

  const stats = new PublicLeaderboardModel().nationalStatistics();

  return NextResponse.json(stats);
}
