import { ClassValues } from "@/lib/clsx";
import {
  LocationApplianceClass,
  LocationApplianceType,
} from "@/types/location.type";
import { cn } from "@nextui-org/theme";

type Props = {
  appliance: LocationApplianceType;
  classNames?: ClassValues<"container">;
};
/**
 * Renders the UI for Appliance cards.
 * @param {object} appliance Appliance linked to a Location data
 * @param {object} classNames optional ClassValues for "container", see clsx.ts and cn.ts comments
 * @returns {ReactNode}
 */
const ApplianceCard = ({ appliance, classNames }: Props) => {
  const { name, quantity, hoursPerDay, totalWHSPerDay } =
    new LocationApplianceClass(appliance);

  return (
    <div
      className={cn(
        "rounded-lg bg-epp-indigo flex flex-col px-4 pt-2 pb-6 max-h-20 shadow-md shadow-epp-aqua",
        classNames?.container,
      )}
    >
      <span className="place-self-end text-sm text-epp-white">
        <span className="font-bold">{totalWHSPerDay}</span> whs/day
      </span>
      <span className="text-lg text-epp-white">
        <span className="font-bold text-xl">
          {quantity} {name}{" "}
        </span>
        for <span className="font-bold text-xl">{hoursPerDay}</span> hours
      </span>
    </div>
  );
};

export default ApplianceCard;
