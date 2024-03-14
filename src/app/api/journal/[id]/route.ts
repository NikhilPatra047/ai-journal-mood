import { NextResponse } from "next/server"
import { getUserByClerkId } from "../../../../../utils/auth"
import { prisma } from "../../../../../utils/db"
import type { ClerkUser, ENTRY } from "../../../../../utils/type"
import { analyse } from "../../../../../utils/ai"
import { revalidatePath } from "next/cache"

export const PATCH = async (request: Request, { params: { id } }: { params: { id: string }}) => {
  const { content } = await request.json()
  const user: ClerkUser = await getUserByClerkId()
  const updatedEntry: ENTRY = await prisma.journalEntry.update({
    where: {
      userId_id: {
        id,
        userId: user.id
      }
    },
    data: {
      content,
    }
  })

  const analysis = await analyse(updatedEntry.content)
  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id
    },
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      mood: analysis?.mood as string, 
      color: analysis?.color as string, 
      subject: analysis?.subject as string, 
      summary: analysis?.summary as string, 
      negative: analysis?.negative as boolean, 
      emoji: analysis?.emoji as string,
      textColor: analysis?.textColor as string,
      sentimentScore: analysis?.sentimentScore as number
    },
    update: {
      userId: user.id,
      mood: analysis?.mood as string, 
      color: analysis?.color as string, 
      subject: analysis?.subject as string, 
      summary: analysis?.summary as string, 
      negative: analysis?.negative as boolean, 
      emoji: analysis?.emoji as string,
      textColor: analysis?.textColor as string,
      sentimentScore: analysis?.sentimentScore as number
    }
  })

  revalidatePath(`/journal/${updatedEntry.id}`)

  return NextResponse.json({ data: { ...updatedEntry, analysis: updated } })
} 