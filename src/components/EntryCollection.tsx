'use client'

import { ENTRY } from "../../utils/type"
import EntryCard from "./EntryCard"
import Link from 'next/link'
import { useState, memo } from 'react'

export default memo(function EntryCollection({ entries }: { entries: ENTRY[] }) {
  const [newEntries, setNewEntries] = useState<ENTRY[]>(() => {
    return entries
  })

  return (
    newEntries.map((entry: ENTRY) => {
      return (
        <Link key={entry.id} href={`/journal/${entry.id}`}>
          <EntryCard entry={entry} />
        </Link>
      )
    })
  )
})