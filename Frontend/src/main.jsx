import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './Context/AuthContext.jsx'
import UserContext from './Context/UserContext.jsx'
import ListingContext from './Context/ListingContext.jsx'
import BookingContext from './Context/BookingContext.jsx'
import NaturalSearchContext from './Context/NaturalSearchContext.jsx'
import HostContext from './Context/HostContext.jsx'
import ReviewContext from './Context/ReviewContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      
      <AuthContext>
        <ListingContext>
        <UserContext>
          <BookingContext>
            <NaturalSearchContext>
              <HostContext>
                <ReviewContext>
                  <App />
                </ReviewContext>
              </HostContext>
            </NaturalSearchContext>      
          </BookingContext>
        </UserContext>
        </ListingContext>
      </AuthContext>

    </BrowserRouter>
  </StrictMode>,
)
