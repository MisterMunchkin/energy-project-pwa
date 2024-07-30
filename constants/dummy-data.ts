import { LocationType } from "@/types/location.type";


export const DUMMY_LOCATIONS: LocationType[] = [
  {
    id: 1,
    streetAddress: '125 Colchester Street',
    city: 'South Brisbane',
    state: 'Queensland',
    appliances: [
    {
      name: 'Refrigerator',
      quantity: 1,
      hoursPerDay: 24,
      totalWHSPerDay: 300
    }
   ] 
  },
  {
    id: 2,
    streetAddress: '20 George Street',
    city: 'Parkwood',
    state: 'Queensland',
    appliances: [
      {
        name: 'Refrigerator',
        quantity: 1,
        hoursPerDay: 24,
        totalWHSPerDay: 300
      },
      {
        name: 'Lights',
        quantity: 5,
        hoursPerDay: 8,
        totalWHSPerDay: 200
      },
      {
        name: 'Dishwasher',
        quantity: 1,
        hoursPerDay: 2,
        totalWHSPerDay: 150
      }
    ] 
  },
]