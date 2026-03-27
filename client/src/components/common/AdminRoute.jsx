import { Navigate } from "react-router-dom"

export default function AdminRoute({children}){

  const user = JSON.parse(localStorage.getItem("authUser"))

  if(!user || user.role !== "admin"){
    return <Navigate to="/admin/login"/>
  }

  return children
}