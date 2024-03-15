import Editor from "@/components/Editor"
import type { ENTRY } from "../../../../../utils/type"
import { getUserByClerkId } from "../../../../../utils/auth"
import { prisma } from "../../../../../utils/db"

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id, 
        id,
      },
    },
    include: {
      analysis: true
    }
  }) as ENTRY

  return entry
}

export default async function EntryPage({ params: { id } }: { params: { id: string }}) {
  const entry: ENTRY = await getEntry(id)
  return (
    <div className="h-full w-full">
      <Editor entry={ entry } id={id} />
    </div>
  )
}