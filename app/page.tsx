import LocationCard from "@/components/LocationCard";
import { DUMMY_LOCATIONS } from "@/constants/dummy-data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-4 p-4">
      {DUMMY_LOCATIONS.map((location, index) => (
        <LocationCard 
          key={index}
          location={location}
        />
      ))}
    </main>
  );
}
