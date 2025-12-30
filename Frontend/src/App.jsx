
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/clerk-react'
import './App.css'


function App() {
  

  return (
    <>
    <h1>Welcome to Practice-Hub</h1>
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <SignOutButton />
    </SignedIn>
    </>
  )
}

export default App
