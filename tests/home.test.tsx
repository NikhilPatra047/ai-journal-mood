import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Home from '../src/app/page'

vi.mock('@clerk/nextjs', () => {
  const mockedFunctions = {
    auth: () => new Promise((resolve) => resolve({ userId: "user_asdasdassdsas" })),
    ClerkProvider: ({ children }: { children: React.ReactNode }) => <div>{ children }</div>,
    useUser: () => ({
      isSignedIn: true, 
      user: {
        id: "user_asdasdassdsas",
        fullName: "Charles Leclerc"
      }
    })
  }

  return mockedFunctions
})

vi.mock('next/font/google', () => {
  return {
    Inter: () => ({ className: 'inter' })
  }
})

test(`Home`, async() => {
  render(await Home())
  expect(screen.getByText('Your best personal companion, period.')).toBeTruthy()
})