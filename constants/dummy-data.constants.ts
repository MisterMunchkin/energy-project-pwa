import { LocationType } from "@/types/location.type";


export const DUMMY_LOCATIONS: LocationType[] = [
  {
    id: 1,
    streetAddress: '125 Colchester Street',
    city: 'South Brisbane',
    state: 'Queensland',
    postalCode: 4101,
    appliances: [
    {
      name: 'Refrigerator',
      quantity: 1,
      hoursPerDay: 24,
      watts: 100
    }
   ] 
  },
  {
    id: 2,
    streetAddress: '20 George Street',
    city: 'Parkwood',
    state: 'Queensland',
    postalCode: 4202,
    appliances: [
      {
        name: 'Refrigerator',
        quantity: 1,
        hoursPerDay: 24,
        watts: 100
      },
      {
        name: 'Lamp',
        quantity: 5,
        hoursPerDay: 8,
        watts: 60
      },
      {
        name: 'Dishwasher',
        quantity: 1,
        hoursPerDay: 2,
        watts: 1800
      }
    ] 
  },
]