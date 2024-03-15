'use client'

import toast from "react-hot-toast"
import { createNewEntry } from "../../utils/api"
import { useRouter } from "next/navigation"
import Spinner from "./Spinner"
import { useState } from "react"

export default function NewEntryCard() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const handleOnClick = async () => {
    setLoading(true)
    const data: any = await createNewEntry()
    setLoading(false)
    toast.success("Entry creation successful!")
    router.push(`/journal/${data.id}`)
    router.refresh()
  }

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6 flex items-center justify-between">
        <span className="text-3xl">New Entry</span>
        {
          loading && <Spinner />
        }
      </div>
    </div>
  )
}