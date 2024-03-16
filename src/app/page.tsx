import Link from 'next/link'
import { auth } from '@clerk/nextjs'
import type { AuthUser } from '../../utils/type'
import { TbCircleLetterM } from 'react-icons/tb'

export default async function Home() {
  const { userId }: AuthUser = await auth()
  let href = userId? '/journal': '/new-user'
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black text-white sm:text-left text-center">
      <div className="w-[90%] max-w-[600px]">
        <div className='flex max-sm:flex-col max-sm:justify-center items-center'>
          <TbCircleLetterM size={40} />
          <span className='max-sm:mt-2 sm:ml-2 text-4xl max-sm:text-2xl'>Mood Journal</span>
        </div>
        <h1 className="mb-4 mt-6 text-6xl max-sm:text-4xl">Your best personal companion, period.</h1>
        <p className="mb-4 text-2xl text-white/60 max-sm:text-xl">This is the best journaling app you can have in your life. Start tracking for free, for life.</p>
        <div>
          <Link href={href}>
            <button className="text-xl px-4 py-2 max-sm:text-lg bg-blue-500 cursor-pointer rounded-lg">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
