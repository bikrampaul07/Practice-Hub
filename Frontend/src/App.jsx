
import { Navigate, Route, Routes } from 'react-router'
import Homepage from './Pages/Homepage'
import Problems from './Pages/Problems'
import { useUser } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast';


function App() {
  
const {isSignedIn} = useUser();
  return (
    <>
     <Routes>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/problems' element={isSignedIn ? <Problems/> : <Navigate to={"/"}/>}/>
    </Routes>
    <Toaster toastOptions={{duration:3000}}/>
    </>
  )
}

export default App
