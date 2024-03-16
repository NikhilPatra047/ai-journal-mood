import NewEntryCard from "@/components/NewEntryCard"
import { getUserByClerkId } from "../../../../utils/auth"
import { prisma } from "../../../../utils/db"
import { ENTRY } from "../../../../utils/type"
import Question from "@/components/Question"
import EntryCollection from "@/components/EntryCollection"

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id, 
    }, 
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      analysis: true
    }
  }) as ENTRY[]

  return entries
}

export default async function JournalPage() {
  const entries = await getEntries()
  return (
    <div className="p-10 bg-zinc-400/10">
      <h2 className="text-3xl mb-8">Journal Dashboard</h2>
      <div>
        <Question />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-4 mt-10">
        <NewEntryCard />
        <EntryCollection entries={entries} />
      </div>
    </div>
  )
}