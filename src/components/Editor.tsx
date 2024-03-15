'use client'

import { useState, useRef, useEffect, memo } from "react"
import type { Analysis, ENTRY } from "../../utils/type"
import { useAutosave } from "react-autosave"
import { deleteEntry, updateEntry } from "../../utils/api"
import { useRouter } from "next/navigation"
import Spinner from "./Spinner"
import toast from "react-hot-toast"

export default memo(function Editor({ entry, id }: { entry: ENTRY, id: string }) {
  const router = useRouter() 

  const [value, setValue] = useState<string>(() => {
    return entry.content
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)
  const [analysisData, setAnalysisData] = useState<Analysis>(() => {
    return entry.analysis as Analysis
  })

  const focusRef = useRef<HTMLTextAreaElement>(null)

  const { mood, color, summary, subject, emoji, textColor, negative } = analysisData
  const analysis_data = [
    {
      name: 'Summary', 
      value: summary
    }, 
    {
      name: 'Subject',
      value: subject
    },
    {
      name: 'Negative',
      value: negative? 'True': 'False'
    },
  ]

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setLoading(true)
      const updated = await updateEntry(entry.id, _value)
      setAnalysisData(updated.analysis)
      setLoading(false)
    },
    saveOnUnmount: false,
    interval: 1000
  })

  useEffect(() => {
    focusRef.current?.focus()
  }, [])

  const handleDelete = async () => {
    setDeleting(true)
    await deleteEntry(entry.id)
    setDeleting(false)
    toast.success('Entry deletion successful!')
    router.push('/journal')
    router.refresh()
  }

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {loading && <Spinner styles="m-2" />}
        <textarea ref={focusRef} className="w-full h-full p-8 text-xl outline-none" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10" style={{ backgroundColor: color, color: textColor }}>
          <h2 className="text-2xl text-center font-bold">{mood.toUpperCase()} {emoji}</h2>
        </div>
        <div>
          <ul>
            {
              analysis_data.map((item, index) => {
                return (
                  <li className="flex flex-col px-2 py-4 border-b border-black/10 items-center justify-between" key={index}>
                    <span className="text-lg font-semibold">{item.name}</span>
                    <span className="text-center">{item.value}</span>
                  </li>
                )
              })
            }
            <button disabled={loading} onClick={() => handleDelete()} className={`w-full px-2 py-4 flex items-center justify-center  ${loading? 'cursor-not-allowed bg-red-400/40 text-black/40': 'cursor-pointer text-black bg-red-400/80 hover:bg-red-400 '}`}>
              {
                deleting === false 
                ? <span className="text-center w-full font-bold">
                    Delete Entry
                  </span>
                : <Spinner />
              }
            </button>
          </ul>
        </div>
      </div>
    </div>
  )
})