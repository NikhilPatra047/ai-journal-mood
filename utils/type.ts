interface AuthUser {
  userId: string | null
}

interface REACT {
  children: React.ReactNode
}

interface Analysis {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  entryId: string;
  mood: string;
  emoji: string;
  summary: string;
  color: string;
  negative: boolean;
  subject: string;
  textColor: string;
  sentimentScore: number;
}

interface ENTRY {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  userId: string;
  analysis?: Analysis;
}

interface ClerkUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  email: string;
}

interface ENTRY_CARD {
  entry: ENTRY
}

export type { AuthUser, REACT, ENTRY, ENTRY_CARD, ClerkUser, Analysis }