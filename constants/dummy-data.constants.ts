import { LocationType } from "@/types/location.type";

/**
 * Dummy locations of LocationType for testing purposes. Used on local storage
 */
export const DUMMY_LOCATIONS: LocationType[] = [
  {
    id: "1111-2222-3333-asdf-zxcv-1012",
    streetAddress: "125 Colchester Street",
    city: "South Brisbane",
    state: "Queensland",
    postalCode: 4101,
    appliances: [
      {
        name: "Refrigerator",
        quantity: 1,
        hoursPerDay: 24,
        watts: 100,
      },
    ],
  },
  {
    id: "1111-2222-3333-asdf-zxcv-1011",
    streetAddress: "20 George Street",
    city: "Parkwood",
    state: "Queensland",
    postalCode: 4202,
    appliances: [
      {
        name: "Refrigerator",
        quantity: 1,
        hoursPerDay: 24,
        watts: 100,
      },
      {
        name: "Lamp",
        quantity: 5,
        hoursPerDay: 8,
        watts: 60,
      },
      {
        name: "Dishwasher",
        quantity: 1,
        hoursPerDay: 2,
        watts: 1800,
      },
    ],
  },
];
