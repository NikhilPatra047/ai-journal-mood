import { ImSpinner2 } from "react-icons/im"

export default function Loading() {
  return (
    <div className="flex items-center justify-center border-black border-2 h-screen">
      <ImSpinner2 size={50} className="animate-spin" />
    </div>
  )
}