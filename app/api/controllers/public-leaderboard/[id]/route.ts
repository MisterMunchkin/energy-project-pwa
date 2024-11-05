import { PublicLeaderboardModel } from "@/models/public-leaderboard.model";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

type IdParams = { params: { id: string } };
/**
 * GET request for retrieving a specific leaderboard post
 *
 * @param {NextApiRequest} req
 * @param {object} params id params to retrieve specific leaderboard post
 * @returns {NextResponse}
 */
export async function GET(req: NextApiRequest, { params }: IdParams) {
  const { id } = params;

  if (!req.url)
    return NextResponse.json({}, { status: 400, statusText: "invalid URL" });
  if (!id)
    return NextResponse.json({}, { status: 400, statusText: "invalid id" });

  console.log(id);
  const post = new PublicLeaderboardModel().findBy(id);
  return NextResponse.json({ post });
}

/**
 * DELETE request for deleting a specific leaderboard post
 *
 * @param {NextApiRequest} req
 * @param {object} params id params to delete specific leaderboard post
 * @returns {NextResponse}
 */
export async function DELETE(req: NextApiRequest, { params }: IdParams) {
  const { id } = params;

  if (!req.url)
    return NextResponse.json({}, { status: 400, statusText: "invalid URL" });
  if (!id)
    return NextResponse.json({}, { status: 400, statusText: "invalid id" });

  const res = new PublicLeaderboardModel().delete(id);

  if (res?.errMessage)
    return NextResponse.json({}, { status: 500, statusText: res.errMessage });

  return NextResponse.json({});
}
