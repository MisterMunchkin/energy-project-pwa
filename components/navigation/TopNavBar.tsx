type Props = {
  title: string
}
const TopNavBar = ({title}: Props) => {
  return <div
    className="flex flex-row justify-between items-center w-full px-4 fixed top-0 left-0 border-b-2 bg-epp-white"
  >
    <div>
      <span className="text-2xl font-bold text-epp-indigo">{title}</span>
    </div>
    <div className="py-4">
      <span>Account</span>
    </div>
  </div>
}
export default TopNavBar;