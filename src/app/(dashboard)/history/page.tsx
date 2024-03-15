import HistoryChart from "@/components/HistoryChart"
import { getUserByClerkId } from "../../../../utils/auth"
import { prisma } from "../../../../utils/db"

const getData = async () => {
  const user = await getUserByClerkId()
  
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
  const average = Math.round(sum / analyses.length)
  return { analyses, average }
}

export default async function History() {
  const { analyses, average } = await getData()
  return (
    <div className="w-full h-full">
      <div>
        {`Avg. Sentiment ${average}`}
      </div>
      <div className="w-full h-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}