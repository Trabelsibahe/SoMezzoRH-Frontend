import React from 'react'
import { Navigate } from 'react-router-dom'

const ActiveRouter = ({ user, children }) => {
    if (user.active === false) {

        return <Navigate to="/inactive" replace />
    }

    return children
}

export default ActiveRouter;