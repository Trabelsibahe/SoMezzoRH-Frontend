import React from 'react'
import { Navigate } from 'react-router-dom'

const WelcomeRouter = ({ user, children }) => {
  if (!user.isConnected ) {
     return <Navigate to="/login" replace />
  }

  else if (user.isConnected && user.HasProfile !== null ) {
    return <Navigate to='/profile' />
  }

return children
  }
 
export default WelcomeRouter;