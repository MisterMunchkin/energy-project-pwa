import NationalStatisticsBarChart from "@/components/national-statistics/NationalStatisticsBarChart";
import BottomTabBar from "@/components/navigation/BottomTabBar";
import TopNavBar from "@/components/navigation/TopNavBar";
import { PUBLIC_LEADERBOARD } from "@/constants/controller-navigation.constants";
import { PublicLeaderboardService } from "@/services/services";
import { NationalStatisticsClass } from "@/types/national-statistics.type";
import Link from "next/link";
import { Suspense } from "react";
import { VscArrowLeft } from "react-icons/vsc";

export default async function page () {
  const stats = await PublicLeaderboardService.getNationalStatistics();
  const nationalStats = new NationalStatisticsClass(stats);
  const chartData = nationalStats.chartData;
  console.log(stats);

  return <section
    className="py-[50px]"
  >
    <TopNavBar 
      title="National Statistics"
      showAccount
    />
    <Suspense fallback={<span>...Loading</span>}>
      <div className="p-2 flex flex-col">
        <Link
            className="cursor-pointer"
            href={`${PUBLIC_LEADERBOARD}`}
          >
            <VscArrowLeft
              className="text-epp-indigo w-10 h-10"
            />
        </Link>
        <NationalStatisticsBarChart 
          chartData={chartData}
        />
      </div>
      <div
        className="flex flex-col p-4"
      >
        <span className="font-bold text-3xl">{nationalStats.totalWHSOfTheNation}</span>
        <span className="font-normal text-sm">WHS/day</span>
      </div>
    </Suspense>
    <BottomTabBar />
  </section>
}