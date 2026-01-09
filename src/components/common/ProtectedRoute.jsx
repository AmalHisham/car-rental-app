import React from "react"
import AuthContext from "../../context/AuthContext"
import { Navigate, useLocation } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const location = useLocation()
  const { user, logout } = React.useContext(AuthContext)

 
  if (user && user.isBlocked) {
    logout()
    return <Navigate to="/login" replace />
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  return children
}
