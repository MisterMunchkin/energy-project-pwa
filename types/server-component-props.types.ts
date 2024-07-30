/**
 * Optional prop type for server components
 * 
 * @param {searchParams} params Is the object where dynamic routes like /location-details/[id] will be accessible
 */
export type ServerComponentProps = {
  params?: DynamicRoute;
}


interface DynamicRoute {
  id: string;
} 