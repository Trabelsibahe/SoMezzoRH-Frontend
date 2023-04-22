import React from 'react'
import { Navigate } from 'react-router-dom'


const PrivateRouter = ({ user, children }) => {
  
  if (user.active === false) {
    return <Navigate to="/inactive" replace />
  }
  else if (!user.isConnected || user.HasProfile === null) {
    return <Navigate to="/login" replace />
  }

  else if (user.isConnected && user.HasProfile === null) {
    return <Navigate to="/bienvenue" replace />
  }

  return children
}

export default PrivateRouter;