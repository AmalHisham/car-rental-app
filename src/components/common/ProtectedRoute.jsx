import React from "react"
import AuthContext from "../../context/AuthContext"
import { Navigate, useLocation } from "react-router-dom"


export default function ProtectedRoute({children}) {

    const location  = useLocation()
    const {user} = React.useContext(AuthContext)

    if(!user) {
        return <Navigate to = '/login' 
        replace
        state={{from : location.pathname}}
        />
    }



    return children
}