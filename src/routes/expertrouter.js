import React from 'react'
import { Navigate } from 'react-router-dom'

const ExpertRouter = ({ user, children }) => {

  if (!user.isConnected) {
    return <Navigate to="/login" replace />
  } else {
    if (user.role !== "EXPERT") {
      return <Navigate to="/erreur" replace />
    }
  }
  return children
}

export default ExpertRouter;