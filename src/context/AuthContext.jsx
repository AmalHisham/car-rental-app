import React from "react"
import { loginUser, registerUser } from "../services/authService"

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  async function register(name, email, password) {
    try {
      setLoading(true)
      const userData = await registerUser(name, email, password)
      setUser(userData)
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
      const userData = await loginUser(email, password)
      setUser(userData)
      setLoading(false)
      return true
    } catch (err) {
      setLoading(false)
      return false
    }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,      // ✅ MUST exist
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
