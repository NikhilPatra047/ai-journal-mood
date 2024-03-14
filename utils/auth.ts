import { auth } from "@clerk/nextjs"
import type { AuthUser, ClerkUser } from "./type"
import { prisma } from "./db"

export const getUserByClerkId = async () => {
  const { userId }: AuthUser = await auth()

  const user: ClerkUser = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    }
  })

  return user 
}
