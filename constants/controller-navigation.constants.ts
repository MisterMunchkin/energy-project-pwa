export const API_CONTROLLER = process.env.NEXT_PUBLIC_BASE_URL + '/api/controllers/';
export const API_PUBLIC_LEADERBOARD = API_CONTROLLER + 'public-leaderboard';
export const LOCATION_DETAILS = '/location-details';

export namespace RevalidatePath {
  export const LOCATION_DETAILS_PAGE = `(controllers)${LOCATION_DETAILS}/[id]`; 
}