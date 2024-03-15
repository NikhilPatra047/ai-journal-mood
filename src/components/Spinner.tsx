import { ImSpinner2 } from "react-icons/im"

const Spinner = ({ styles }: { styles?: string}) => {
  return (
    <ImSpinner2 size={20} className={`animate-spin ${styles}`} />
  )
}

export default Spinner