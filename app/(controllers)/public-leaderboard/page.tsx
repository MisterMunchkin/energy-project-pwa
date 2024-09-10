import BottomTabBar from "@/components/navigation/BottomTabBar";
import TopNavBar from "@/components/navigation/TopNavBar";
import PublicLeaderboard from "@/components/public-leaderboard/PublicLeaderboard";
import { PublicLeaderboardService } from "@/services/services";

export default async function Page() {
  const leaderboard = await PublicLeaderboardService.getPublicLeaderboard();
  console.log(leaderboard);
  return (
    <section className="py-[50px]">
      <TopNavBar 
        title="Public Leaderboard"
        showAccount
      />
      <PublicLeaderboard 
        publicLeaderboard={leaderboard}
      />
      <BottomTabBar />
    </section>
  )
}