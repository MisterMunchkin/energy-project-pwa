type Props = {
  title: string;
  showAccount?: boolean;
}
const TopNavBar = ({title, showAccount}: Props) => {
  return <div
    className="flex flex-row justify-between items-center w-full px-4 py-2 fixed top-0 left-0 border-b-2 bg-epp-white"
  >
    <div>
      <span className="text-2xl font-bold text-epp-indigo">{title}</span>
    </div>
    {showAccount &&
      <div >
        <span>Account</span>
      </div>
    }
  </div>
}
export default TopNavBar;