import {Routes , Route} from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import ListingPage1 from './Pages/ListingPage1'
import ListingPage2 from './Pages/ListingPage2'
import ListingPage3 from './Pages/ListingPage3'
import {Toaster} from 'react-hot-toast'
import { userDataContext } from './Context/UserContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import MyListing from './Pages/MyListing'
import ViewCard from './Pages/ViewCard'
import MyBooking from './Pages/MyBooking'
import HostDashboard from './Pages/HostDashboard'
import WaitingPage from './Pages/WaitingPage'
import BookingConfirm from './Pages/BookingConfirm'

const App = () => {

  const {userData} = useContext(userDataContext);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/listingpage1' element={ userData != null ? <ListingPage1/> : <Navigate to={'/'}/>}/>
        <Route path='/listingpage2' element={ userData != null ? <ListingPage2/> : <Navigate to={'/'}/>}/>
        <Route path='/listingpage3' element={ userData != null ? <ListingPage3/> : <Navigate to={'/'}/>}/>
        <Route path='/mylisting' element={ userData != null ? <MyListing/> : <Navigate to={'/'}/>}/>
        <Route path='/viewcard' element={userData != null ? <ViewCard/> : <Navigate to={'/'}/>}/>
        <Route path='/mybooking' element={userData != null ? <MyBooking/> : <Navigate to={'/'}/>}/>

        <Route path='/hostdashboard' element={userData != null ? <HostDashboard/> : <Navigate to={'/'}/>}/>
        <Route path='/waiting' element={userData != null ? <WaitingPage/> : <Navigate to={'/'}/>} />

        // Dynamic Routing 
        <Route path='/confirm/:id' element={userData != null ? <BookingConfirm/> : <Navigate to={'/'}/>} />
      </Routes>

      <Toaster/>
    </>
  )

}

export default App
