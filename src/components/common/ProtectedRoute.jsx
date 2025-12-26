import React from "react"
import AuthContext from "../../context/AuthContext"
import { Navigate } from "react-router-dom"


export default function ProtectedRoute({children}) {

    const {user} = React.useContext(AuthContext)

    if(!user) {
        return <Navigate to = '/login' replace/>
    }

    return children
}