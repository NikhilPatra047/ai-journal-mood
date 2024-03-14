import type { ENTRY_CARD } from "../../utils/type"

export default function EntryCard({ entry }: ENTRY_CARD) {
  const date = new Date(entry.createdAt).toDateString()
  const newSubstring = entry.analysis?.summary.substring(0,35)
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5">{date}</div>
      <div className="px-4 py-5">{newSubstring}...</div>
      <div className="px-4 py-4">{entry.analysis?.mood}</div>
    </div>
  )
}