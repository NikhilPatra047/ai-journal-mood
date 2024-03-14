'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { askQuestion } from '../../utils/api'
import { MdOutlineCancel } from "react-icons/md"

export default function Question() {
  const [value, setValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<any | null>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const answers = await askQuestion(value)
    setResponse(answers)
    setValue('')
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input disabled={loading} className="px-4 py-2 border border-black/20 text-lg rounded-lg" onChange={onChange} value={value} type="text" placeholder="Ask a question..." />
        <button type="submit" className="bg-blue-400 ml-2 px-4 py-2 rounded-lg text-lg">Ask</button>
      </form>
      { loading && <div>Loading...</div> }
      { response
        && (
          <div className="flex justify-between items-center bg-zinc-300/40 p-4 border-black/10 border mt-2 rounded-lg text-sm font-medium">
            <p className='w-[95%]'>
              <span className='font-bold mr-1'>Analysis: </span>
              { response }
            </p>
              <MdOutlineCancel size={20} style={{ cursor: 'pointer' }} onClick={() => setResponse(null)} />
          </div>
        )
      }
    </div>
  )
}