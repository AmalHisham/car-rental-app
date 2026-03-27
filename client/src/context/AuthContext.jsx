import React from "react"
import { loginUser, registerUser } from "../services/authService"

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(() => {
    return JSON.parse(localStorage.getItem("authUser"))
  })

  const [loading, setLoading] = React.useState(false)

  async function register(name, email, password) {
    try {
      setLoading(true)
  
      await registerUser(name, email, password)
  
      setLoading(false)
      return true
  
    } catch (err) {
      setLoading(false)
      return false
    }
  }

  async function login(email, password) {
    try {
  
      setLoading(true)
  
      const data = await loginUser(email, password)
  
      const authUser = data.user
      const token = data.token
  
      localStorage.setItem("authUser", JSON.stringify(authUser))
      localStorage.setItem("token", token)
  
      setUser(authUser)
  
      setLoading(false)
  
      return true
  
    } catch {
  
      setLoading(false)
      return false
  
    }
  }
  

  function logout() {
    localStorage.removeItem("authUser")
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
