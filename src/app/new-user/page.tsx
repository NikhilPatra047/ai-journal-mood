import { currentUser } from '@clerk/nextjs'
import { prisma } from '../../../utils/db'
import { redirect } from "next/navigation"
import { Suspense } from 'react'
import Loading from './loading'

const createNewUser = async () => {
  const user = await currentUser()
  if (user) {
    const match = await prisma.user.findUnique({
      where: {
        clerkId: user.id
      }
    })

    if (!match) {
      await prisma.user.create({
        data: {
          clerkId: user.id, 
          email: user.emailAddresses[0].emailAddress
        }
      })
    }
    redirect('/journal')
  }
}

export default async function NewUser() {
  await createNewUser()
  return (
    <Suspense fallback={<Loading />}>
      <div>Nothing to show here at the moment...</div>
    </Suspense>
  )
}