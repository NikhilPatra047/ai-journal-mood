import { NextResponse } from "next/server"
import { update } from "../../../../utils/actions"
import { getUserByClerkId } from "../../../../utils/auth"
import { prisma } from "../../../../utils/db"

export const DELETE = async (request: Request) => {
  const { id } = await request.json()
  const user = await getUserByClerkId()
  await prisma.journalEntry.delete({
    where: {
      userId_id: {
        id,
        userId: user.id,
      },
    },
  })

  update(['/journal'])

  return NextResponse.json({ data: { id } })
}