
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
function Homepage() {
  return (
    <div>
      <p>Homepage</p>
      <SignedOut >
            <SignInButton mode='modal'>
                <button className='btn btn-secondary' onClick={()=>toast.success("Button was clicked")}>Login</button>
            </SignInButton>
            
          </SignedOut>
          <SignedIn>
            <SignOutButton />
          </SignedIn>
    </div>
  )
}

export default Homepage
