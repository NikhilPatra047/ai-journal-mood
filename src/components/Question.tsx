'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { askQuestion } from '../../utils/api'
import { MdOutlineCancel } from "react-icons/md"
import Spinner from './Spinner'

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
      <form onSubmit={handleSubmit} className='flex md:flex-row flex-col items-center'>
        <input disabled={loading} className="px-4 py-2 border border-black/20 text-lg rounded-lg max-md:w-full" onChange={onChange} value={value} type="text" placeholder="Ask a question..." />
        <button disabled={loading} type="submit" className="bg-blue-400 md:ml-2 max-md:mt-2 px-4 py-2 max-md:w-full rounded-lg text-lg">Ask</button>
        { loading && <Spinner styles="m-2" /> }
      </form>
      { response
        && (
          <div className="flex max-md:flex-col justify-between items-center bg-zinc-300/40 p-4 border-black/10 border mt-2 rounded-lg text-sm font-medium">
            <p className='w-full max-md:text-center md:w-[95%]'>
              <span className='font-bold md:mr-1'>Analysis: </span>
              { response }
            </p>
            <MdOutlineCancel size={20} style={{ marginTop: '5px', cursor: 'pointer' }} onClick={() => setResponse(null)} />
          </div>
        )
      }
    </div>
  )
}