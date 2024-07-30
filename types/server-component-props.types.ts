/**
 * Optional prop type for server components
 * 
 * @param {searchParams} searchParam The `query` object configured within a <Link/> href
 */
export type ServerComponentProps = {
  params?: INavParams;
}

interface INavParams {
  id: string;
} 