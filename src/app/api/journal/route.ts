import { getUserByClerkId } from "../../../../utils/auth"
import type { Analysis, ClerkUser, ENTRY } from "../../../../utils/type"
import { prisma } from "../../../../utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { analyse } from "../../../../utils/ai"

export const POST = async () => {
  const user: ClerkUser = await getUserByClerkId()
  const entry: ENTRY = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day!!!'
    }
  })

  const analysis = await analyse(entry.content)
  await prisma.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      emoji: analysis?.emoji as string,
      mood: analysis?.mood as string, 
      summary: analysis?.summary as string, 
      subject: analysis?.subject as string, 
      negative: analysis?.negative as boolean, 
      color: analysis?.color as string,
      textColor: analysis?.textColor as string,
      sentimentScore: analysis?.sentimentScore as number
    }
  })

  revalidatePath('/journal')
  // Didn't solve the entire problem

  return NextResponse.json({ data: entry })
}