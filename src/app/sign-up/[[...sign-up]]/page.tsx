import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className='w-screen h-screen bg-black flex justify-center items-center'>
      <SignUp signInUrl='/sign-in' afterSignUpUrl={'/new-user'} redirectUrl={'/new-user'} />
    </div>
  )
}