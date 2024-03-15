import { UserButton } from '@clerk/nextjs'
import type { REACT } from '../../../utils/type'
import Link from 'next/link'
import { TbCircleLetterM } from "react-icons/tb"
import { update } from '../../../utils/actions'
import { Toaster } from 'react-hot-toast'

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  { href: '/history', label: 'History' }
]

export default function DashboardLayout({ children }: REACT) {
  return (
    <div className="h-screen w-screen relative">
      <aside className="fixed w-[200px] top-0 left-0 h-full border-r border-black/10">
        <div className='text-center flex items-center text-xl p-4'>
          <TbCircleLetterM size={20} />
          <span className='ml-1'>Mood Journal</span>
        </div>
        <ul>
          {
            links.map(({ href, label }: { href: string, label: string }, index: number) => {
              return (
                <Link key={index} href={href}>
                  <li className="px-2 border-y border-black/10 hover:bg-black/10 transition duration-300 ease-in-out py-6 text-xl">
                    { label }
                  </li>
                </Link>
              )
            })
          }
        </ul>
      </aside>
      <div className="h-full">
        <header className="h-[60px] relative border-b border-black/10">
          <div className='h-full w-full px-6 flex items-center justify-end'>
            <UserButton afterSignOutUrl='/' />
          </div>
        </header>
        <div className="ml-[200px] w-[calc(100vw-200px)] overflow-auto fixed h-[calc(100vh-60px)]">
          {children}
          <Toaster />
        </div>
      </div>
    </div>
  )
}