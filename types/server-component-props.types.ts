/**
 * Optional prop type for server components
 *
 * @param {object} params Is the object where dynamic routes like /location-details/[id] will be accessible
 */
export type ServerComponentProps = {
  params?: DynamicRoute;
};

interface DynamicRoute {
  id: string;
}
