'use client'

import LocationCard from "./LocationCard";
import Link from "next/link";
import { LOCATION_DETAILS } from "@/constants/controller-navigation.constants";
import { localService } from "@/services/local-service";
import { useEffect, useState } from "react";
import { LocationType } from "@/types/location.type";
import { SelectableList, useSelectableList } from "@/components/test/selectable-list";
import SelectableListItem, { SelectableListItemOption } from "@/components/test/selectable-list-item";
import { Chip } from "@nextui-org/chip";

type ValueType = "QLD" | "VIC" | "TAS" | "NSW";
const sampleListItems: {label: string, value?: ValueType}[] = [
  {
    label: "Queensland",
    value: "QLD"
  },
  {
    label: "New South Wales",
    value: "NSW"
  },
  {
    label: "Victoria",
    value: "VIC"
  },
  {
    label: "Tasmania",
    value: "TAS"
  }
];

const numberList: {label: string, value: number}[] = [
  {
    label: "1st",
    value: 1
  },
  {
    label: "2nd",
    value: 2
  }
];

type Props = {

}
/**
 * Client Component to handle localStorage retrieval.
 *
 */
const Locations = () => {
  const [locations, setLocations] = useState<LocationType[]>([]);

  //Without useEffect, localStorage access would get a runtime error.
  //Due to Nextjs prerendering on the server side.
  useEffect(() => {
    //TODO: For test purposes only
    // console.time('populating dummies');
    // localService.populateDummies();
    // console.timeEnd('populating dummies');
    
    const locations = localService.getLocations();
    setLocations(locations);
  }, []);

  return <main className="flex min-h-screen flex-col items-center space-y-4 p-4">
    <SelectableList<ValueType>
      classNames={{
        container: "flex flex-col space-y-2",
      }}
      defaultValue={"NSW"}
      //I guess could be useful if want to see changes from parent component
      onSelectionChange={(value) => console.log(value)} 
      items={sampleListItems}
      render={({value, label}, key) => (
        <SelectableListItem
          key={key}
          value={value}
          className="cursor-pointer"
          onSelectedClassName="bg-red-500 text-white"
        > 
          <Chip>{label}</Chip>
        </SelectableListItem>
      )}
    >
      {/* {sampleListItems.map(({value, label}, key) => (
        <SelectableListItem
          key={key}
          value={value}
          className="cursor-pointer"
          onSelectedClassName="bg-red-500 text-white"

        >
          <Chip>{label}</Chip>
        </SelectableListItem>
      ))} */}
    </SelectableList>

    {locations.map((location, index) => (
      <Link
        className="w-full"
        key={index}
        href={{
          pathname: `${LOCATION_DETAILS}/${location.id}`
        }}
      >
        <LocationCard 
          location={location}
          isLink
        />
      </Link>
    ))}
</main>
}

export default Locations;