import Locations from "@/components/location/Locations";
import BottomTabBar from "@/components/navigation/BottomTabBar";
import TopNavBar from "@/components/navigation/TopNavBar";

/**
 *
 * Acts as an index for the route controllers.
 * Respecting the MVC paradigm while also keeping whithin the boundaries of the
 * NextJs route file structure.
 *
 * @returns ReactNode
 */
export default function Home() {
  return (
    <section className="py-[50px]">
      <TopNavBar title="Energy Project" showAccount />
      <Locations />
      <BottomTabBar />
    </section>
  );
}
