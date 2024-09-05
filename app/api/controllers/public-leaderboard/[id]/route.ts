import { PublicLeaderboardModel } from "@/models/public-leaderboard.model";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(
    req: NextApiRequest,
    { params }: { params: { id: string } } 
) {
  const {
    id
  } = params;

  if (!req.url)
    return NextResponse.json({}, {status: 400, statusText: 'invalid URL'});
  if (!id)
    return NextResponse.json({}, {status: 400, statusText: 'invalid id'});

  const post = new PublicLeaderboardModel()
    .findBy(id);
  return NextResponse.json({post});
}