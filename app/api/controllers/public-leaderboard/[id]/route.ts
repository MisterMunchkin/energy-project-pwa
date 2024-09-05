import { PublicLeaderboardModel } from "@/models/public-leaderboard.model";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

type IdParams = { params: { id: string } };
export async function GET(
    req: NextApiRequest,
    { params }: IdParams
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

export async function DELETE(
  req: NextApiRequest,
  { params }: IdParams
) {
  const {
    id
  } = params;

  if (!req.url)
    return NextResponse.json({}, {status: 400, statusText: 'invalid URL'});
  if (!id)
    return NextResponse.json({}, {status: 400, statusText: 'invalid id'});

  const res = new PublicLeaderboardModel()
    .delete(id);

  if (res?.errMessage)
    return NextResponse.json({}, {status: 500, statusText: res.errMessage});
  
  return NextResponse.json({});
}