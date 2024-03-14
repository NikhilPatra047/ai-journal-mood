'use client'

import { useState, useRef, useEffect, memo } from "react"
import type { Analysis, ENTRY } from "../../utils/type"
import { useAutosave } from "react-autosave"
import { updateEntry } from "../../utils/api"

export default memo(function Editor({ entry }: { entry: ENTRY }) {
  const [value, setValue] = useState<string>(entry.content)
  const [loading, setLoading] = useState<boolean>(false)
  const [analysisData, setAnalysisData] = useState(() => {
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
    }
  })

  useEffect(() => {
    focusRef.current?.focus()
  }, [])

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {loading && <div>...Loading</div>}
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
          </ul>
        </div>
      </div>
    </div>
  )
})