import React from 'react'
import { Navigate } from 'react-router-dom'

const ForceRedirect = ({ user, children }) => {
  if (user.isConnected && user.HasProfile === null ) {

    return <Navigate to="/bienvenue" replace />

    
  }

  else if (user.isConnected && user.HasProfile !== null ) {
    return <Navigate to="/acceuil" replace />
  }

return children
  }
 
export default ForceRedirect;