import React from "react"

const AuthContext = React.createContext()

export function AuthProvider({children}) {

    const [user, setUser] = React.useState(null)

    function register(email,password) {
        const newUser = {email,password}
        localStorage.setItem("user",JSON.stringify(newUser))
        setUser(newUser)
    }

    function login(email,password) {
        const storedUser = JSON.parse(localStorage.getItem("user"))

        if (
            storedUser &&
            storedUser.email === email &&
            storedUser.password === password
        ) {
            setUser(storedUser)
            return true
        }

        return false
    }

    function logout() {
        localStorage.removeItem("user")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext